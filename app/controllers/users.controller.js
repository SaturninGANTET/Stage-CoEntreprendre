const db = require("../models");
const { offer, user } = require("../config/poidRecherche.config");
const Avatar = db.avatar;
const User = db.users;
const Offer = db.offer;
const TagsCibles = db.tagsCibles;
const TagsSecteur = db.tagsSecteur;
const TagsExpertises = db.tagsExpertises;
const Tags = [TagsSecteur, TagsCibles, TagsExpertises];
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a User
    const user = {
        Prenom: req.body.Prenom,
        Nom: req.body.Nom,
        Metier: req.body.Metier,
        Resume: req.body.Resume,
        AnneeExperience: req.body.AnneeExperience,
        Localisation: req.body.Localisation,
        TagsExpertises: req.body.TagsExpertises,
        TagsCibles: req.body.TagsCibles,
        TagsSecteur: req.body.TagsSecteur
    };

    // Save User in the database
    const newUser = await User.create(user)
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
    console.log(user.TagsExpertises);
    user.TagsExpertises.forEach(async (string) => {
        console.log("La je met : " + string + " avec " + newUser.userId);
        tag = await TagsExpertises.findOne({ where: { Name: string } }).catch(err => {
            console.error(err);
        });
        if (!tag) {
            tag = await TagsExpertises.create({ Name: string }).catch(err => {
                console.error(err);
            });
        }
        await newUser.addTagsExpertises(tag).catch(err => {
            console.error(err);
        });
    });
    res.send("User added");
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { Name: { [Op.like]: `%${title}%` } } : null;

    User.findAll({
        where: condition,
        include: Tags
    })
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};

// Find a single User with an id
exports.ownProfile = async (req, res) => {
    const id = req.user.user_id;
    var condition = id ? {auth0_id: {[Op.like] : `%${id}%`} } : null;

    User.findOne({
        where: condition,
        includes: Offer
    })
        .then(async data => {
            if(!data){
                const user = {
                    auth0_id: req.user.user_id,
                    adresseMail: req.user.emails[0].value,
                    solde: 200,
                    viewCount: 0
                };
                data = await User.create(user)        
                                 .catch(err => {
                                    res.status(500).send({
                                        message:
                                            err.message || "Some error occurred while creating the User"
                                    });
                                });
            }
            delete data.dataValues['auth0_id'];
            res.send(data.dataValues);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "some error occured while retrieving Users."
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
    console.log(req);
    if(!req.user){
        res.status(400).send({
            message: "Not loged in"
        });
        return;
    }

    const id = req.user.user_id;
    var condition = id ? {auth0_id: {[Op.like] : `%${id}%`} } : null;

    User.update({
        prenom: req.body.user.prenom,
        nom: req.body.user.nom,
        telephone: req.body.user.telephone,
        adresseMail: req.body.user.adresseMail,
        metier: req.body.user.metier,
        resume: req.body.user.resume,
        localisationPays: req.body.user.pays,
        localisationRegion: req.body.user.region,
        travailDistance: req.body.user.travailDistance,
        travailChezClient : req.body.user.travailChezClient,
        adresse : req.body.user.adresse,
        tag : req.body.user.tag,
        nomEntreprise: req.body.user.nomEntreprise
    },
    {where : condition})
    .then(function(rowsUpdated){
        res.json(rowsUpdated)
    })
};

// Delete a Tutorial with the specified id in the request
exports.findOne = (req, res) => {
    User.findOne({
        where : {id: Number(req.params.id)},
        includes : Offer
    }).then((data) => {
        if(!data){
            res.send("Not Found");
            return;
        }
        delete data.dataValues['auth0_id'];
        res.send(data.dataValues);
    });
};

// Delete all Tutorials from the database.
exports.addView = async (req, res) => {
    console.log(req);
    if(!req.user){
        res.status(401).send({
            message: "Not loged in"
        });
        return;
    }
    const id = req.user.user_id;
    var condition = id ? {auth0_id: {[Op.like] : `%${id}%`} } : null;

    let user = await User.findOne({
        where : condition,
    });
    if(user.id === req.params.userId){
        res.status(400);
    }

    user = await User.findOne({
        where : {id : req.params.userId},
    });
    if(!user){
        res.status(400);
    }

    await User.update({
        viewCount: user.viewCount + 1,
    }, {
        where : {id : req.params.userId}
    }).then( () => {
        res.status(200);
    })

};
