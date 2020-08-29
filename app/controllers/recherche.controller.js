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

const poid = require('../config/poidRecherche.config.js');

exports.find = async (req, res) => {
    const motclef = req.params.string.split(" ");
    const allUsers = await sequelize.query('SELECT * FROM users');
    var tabId = [];
    allUsers[0].forEach(user => {
        user.poid = 0;
        delete user.auth0_id;
        if (!tabId[user.id]) {
            motclef.forEach(mot => {
                mot = mot.toUpperCase();
                if (user.nom && user.nom.toUpperCase() === mot) {
                    user.poid += poid.user.nom;
                }
                if (user.prenom && user.prenom.toUpperCase() === mot) {
                    user.poid += poid.user.prenom;
                }
                if (user.metier && user.metier.toUpperCase().indexOf(mot) >= 0) {
                    user.poid += poid.user.metier;
                }
                if (user.adresseMail && user.adresseMail.toUpperCase() === mot) {
                    user.poid += poid.user.mail;
                }
                if (user.description && user.description.toUpperCase.indexOf(mot) >= 0){
                    user.poid += poid.user.description
                }
                if (user.tag && user.tag.toUpperCase === mot){
                    user.poid += poid.user.tag
                }
            });
        }
    });

    tabIdo = [];
    const allOffers = await sequelize.query('SELECT * FROM offers');
    allOffers[0].forEach(offer => {
        offer.poid = 0;
        if (!tabIdo[offer.id]) {
            motclef.forEach(mot => {
                mot = mot.toUpperCase();
                if (offer.title && offer.title.toUpperCase() === mot) {
                    offer.poid += poid.offer.title;
                }
                if (offer.description && offer.description.toUpperCase().indexOf(mot) >= 0) {
                    offer.poid += poid.offer.description;
                }
            });
        }
    });
    let sorted = {
        "user": allUsers[0].sort((a, b) => {
            return a.poid > b.poid ? -1
                : a.poid < b.poid ? 1
                    : 0;
        }).slice(0, 50),
        "offer": allOffers[0].sort((a, b) => {
            return a.poid > b.poid ? -1
                : a.poid < b.poid ? 1
                    : 0;
        }).slice(0, 50)
    };

    res.send(sorted);
}

exports.matching = async (req, res) => {
    /*
    if(!req.user){
        res.send("must be logged in");
        return;
    }*/

    var userid;
    var offers;
    var motclef = [];

    User.findOne({
        where: {/*auth0_id: req.user.user_id*/ id: 1 },
        include: 'offers'
    }).then( async (data) => {
        if (!data) {
            res.send("User not Found");
            return;
        }
        userid = data.dataValues.id;
        offers = data.offers;

        if (!offers) {
            res.send("Pas offre");
        }
        offers.forEach((offer) => {
            if (offer.besoin)
                offer.title.split(" ").forEach(mot => {
                    motclef.push(mot);
                });
        });
        let nbOffer = 0;
        const allOffers = await sequelize.query('SELECT * FROM offers');
        allOffers[0].forEach(offer => {
            offer.poid = 0;
            if (!offer.userId === userid) {
                motclef.forEach(mot => {
                    mot = mot.toUpperCase();
                    if (offer.title && offer.title.toUpperCase() === mot) {
                        offer.poid += poid.offer.title;
                    }
                    if (offer.description && offer.description.toUpperCase().indexOf(mot) >= 0) {
                        offer.poid += poid.offer.description;
                    }
                });
            }
            if(offer.poid != 0){
                nbOffer++;
            }
        });

        offerSorted = allOffers[0].sort((a, b) => {
            return a.poid > b.poid ? -1
                : a.poid < b.poid ? 1
                    : 0;
        }).slice(0, nbOffer)

        delete data.dataValues['auth0_id'];
        res.send(offerSorted);
    });
}