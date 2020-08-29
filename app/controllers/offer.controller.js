const db = require("../models");
const Avatar = db.avatar;
const User = db.users;
const Offer = db.offer;
const TagsCibles = db.tagsCibles;
const TagsSecteur = db.tagsSecteur;
const TagsExpertises = db.tagsExpertises;
const Tags = [TagsSecteur, TagsCibles, TagsExpertises];
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    if(!req.user){
        res.status(400).send({
            message:"must be loged in"
        });
        return;
    }

    const id = req.user.user_id;
    var condition = id ? {auth0_id: {[Op.like] : `%${id}%`} } : null;

    let user = await User.findOne({
        where: condition,
        includes: Offer
    });
    if(user === null){
        res.send("Compte pas a jour");
    }
    offer = await Offer.create(req.body.offer).catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating the offer"
        })
    });
    console.log(offer);
    user.addOffer(offer).catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating the offer"
        })
    }).then(() => {
        res.send("offre créée");
    });
}

exports.update = async (req, res) => {
    if(!req.user){
        res.status(400).send({
            message:"must be loged in"
        });
        return;
    }

    const id = req.user.user_id;
    var condition = id ? {auth0_id: {[Op.like] : `%${id}%`} } : null;

    user = await User.findOne({
        where: condition,
    });
    if(!user){
        res.status(500).send({
            message:"user not found"
        });
        return;
    }
    Offer.update(
        req.body.offer,
        {
            where : {
                id : req.params.offerId,
                userId : user.id
            }
        }
    ).then(function(rowsUpdated){
        res.json(rowsUpdated)
    });
}

exports.findOne = async (req,res) => {
    if(!req.user){
        res.status(400).send({
            message:"must be loged in"
        });
        return; 
    }

    Offer.findOne({
        where : {
            id : req.params.offerId
        },
        includes : User
    }).then(data => {
        console.log(data);
        res.send(data);
    });
}

exports.ownOffer = async (req, res) => {
    if(!req.user){
        res.status(400).send({
            message:"must be loged in"
        });
        return;
    }
    const id = req.user.user_id;
    var condition = id ? {auth0_id: {[Op.like] : `%${id}%`} } : null;
    let user = await User.findOne({
        where: condition,
        includes: Offer
    });
    
    Offer.findAll({
        where: {userId: user.id}
    }).then((data) => {
        console.log(data);
        res.send(data);
    });
}

exports.findByUser = async (req, res) => {
    if(!req.user){
        res.status(400).send({
            message:"must be loged in"
        });
        return;
    }
    Offer.findAll({
        where: {userId: req.params.userId}
    }).then((data) => {
        console.log(data);
        res.send(data);
    });
}

exports.delete = async (req, res) => {
    if(!req.user){
        res.status(400).send({
            message:"must be loged in"
        });
        return;
    }

    const id = req.user.user_id;
    var condition = id ? {auth0_id: {[Op.like] : `%${id}%`} } : null;

    user = await User.findOne({
        where: condition,
    });
    if(!user){
        res.status(500).send({
            message:"user not found"
        });
        return;
    }


    Offer.destroy(
        {
            where : {
                id : req.params.offerId,
                userId : user.id
            }
        }
    ).then( () => {
        res.sendStatus(200);
    });
}