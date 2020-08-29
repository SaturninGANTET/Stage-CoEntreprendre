const db = require("../models");
const { sequelize } = require("../models");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const Avatar = db.avatar;
const User = db.users;
const Offer = db.offer;
const TagsCibles = db.tagsCibles;
const TagsSecteur = db.tagsSecteur;
const TagsExpertises = db.tagsExpertises;
const Tags = [TagsSecteur, TagsCibles, TagsExpertises];
const Op = db.Sequelize.Op;
const Avis = db.avis;

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

    console.log(req.body);
    let userDest = await User.findOne({
        where: {id : req.body.idDestinataire}
    });
    if(!userDest){
        res.status(400);
    }
    let newAvis = req.body;
    newAvis.idAuteur = user.id;
    console.log(newAvis);
    Avis.create(newAvis).then(data => {
        console.log(data);
        res.send(data);
    });
}

exports.findByUserId = async (req, res) => {
    if (!req.user) {
        res.status(401).send({
            message: "must be loged in"
        });
        return;
    }

    Avis.findAll({
        where : {idDestinataire : req.params.userId}
    }).then(data => {
        console.log(data);
        res.send(data);
    })
}

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

    Avis.findAll({
        where : {idDestinataire : user.id}
    }).then(data => {
        console.log(data);
        res.send(data);
    })
}