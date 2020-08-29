const db = require("../models");
const { authorize } = require("passport");
const Avatar = db.avatar;
const User = db.users;
const Offer = db.offer;
const TagsCibles = db.tagsCibles;
const TagsSecteur = db.tagsSecteur;
const TagsExpertises = db.tagsExpertises;
const Tags = [TagsSecteur, TagsCibles, TagsExpertises];
const Transactions = db.transactions
const Op = db.Sequelize.Op;
var nodemailer = require('nodemailer');

exports.create = async (req, res) => {
    if (!req.user) {
        res.status(401).send({
            message: "must be loged in"
        });
        return;
    }

    const id = req.user.user_id;
    var condition = id ? { auth0_id: { [Op.like]: `%${id}%` } } : null;

    let user = await User.findOne({
        where: condition,
    });
    if (user === null) {
        res.statue(400).send("Compte pas a jour");
    }

    let userDest = await User.findOne({
        where: {id : req.body.idDestinataire}
    });
    if(!userDest){
        res.status(400);
    }

    transac = req.body;
    transac.idSource = user.id;
    if (transac.idSource === transac.idDestinataire) {
        res.status(400);
    }
    transaction = await Transactions.create(transac).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the offer"
        })
    });
    console.log(transaction);
    var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'expertICI@outlook.fr',
            pass: "motdepasse1&"
        }
    });
    var mailOptions = {
        from: "expertICI@outlook.fr",
        to: userDest.adresseMail,
        subject: "Devis reçu !",
        text: "Vous avez reçu un nouveau devis ! Aller vite le consulter à l'adresse http://81.249.211.28:3000 dans votre liste de transactions"
    };

    console.log("mail");
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
    });
    res.status(200).send();
};

exports.findOwn = async (req, res) => {
    if (!req.user) {
        res.status(401).send({
            message: "must be loged in"
        });
        return;
    }

    const id = req.user.user_id;
    var condition = id ? { auth0_id: { [Op.like]: `%${id}%` } } : null;

    let user = await User.findOne({
        where: condition,
    });
    if (user === null) {
        res.send("Compte pas a jour");
    }
    Transactions.findAll({
        distinct: true,
        where: {
            [Op.or]: [{ idDestinataire: user.id }, { idSource: user.id }]
        }
    }).then(data => {
        console.log(data);
        res.send(data);
    });
}

exports.validate = async (req, res) => {
    if (!req.user) {
        res.status(401).send({
            message: "must be loged in"
        });
        return;
    }

    const id = req.user.user_id;
    var condition = id ? { auth0_id: { [Op.like]: `%${id}%` } } : null;

    let user = await User.findOne({
        where: condition,
    });

    await Transactions.findOne({
        where: {
            idDestinataire: user.id,
            id: req.params.transId,
        }
    }).then(data => {
        if (!data || user.solde - data.montant < 0) {
            res.status(400).send("Pas assez d'argent");
        } else {
            Transactions.update(
                { state: "fini" }, {
                where: { id: req.params.transId }
            }).then( async () => {
                console.log(data);
                await User.update({
                    solde: (user.solde - data.montant),
                },
                    {
                        where: { id: user.id }
                    }).catch(() => { res.status(500).send(); });
                res.status(200).send()
            });
        }
    })

}