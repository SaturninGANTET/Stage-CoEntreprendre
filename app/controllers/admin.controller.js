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
const admin = require("../config/admin.config");

exports.setSolde = async (req, res) => {
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
        includes: Offer
    });

    console.log(req.params);

    console.log(admin);
    if(!admin.includes(user.id)){
        res.status(401);
    }

    User.update({solde : req.params.newSolde}, {where : {id : req.params.userId}}).then(() => {console.log("youpi"); res.status(200).send("solde mis à jour");});
}