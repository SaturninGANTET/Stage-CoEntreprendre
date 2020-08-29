module.exports = app => {

    var router = require("express").Router();
    var secured = require('../lib/middleware/secured');

    // Create a new Tutorial

    router.get("/profil", secured(), function (req, res, next) {
        res.sendfile("private/Profil.html");
    });

    router.get("/profil/*", secured(), function (req, res, next) {
        res.sendfile("private/Profil.html");
    });

    router.get("/createOffer", secured(), function (req, res, next) {
        res.sendfile("private/formAnnonce.html");
    });

    router.get('/home', secured(), function (req, res, next) {
        res.sendfile("private/home.html");
    });

    router.get("/", secured(), function (req, res, next) {
        res.redirect("/home");
    });

    router.get("/commu", secured(), function (req, res, next) {
        res.sendfile("private/Commu.html");
    });

    router.get("/creationAnnonce", secured(), function (req, res, next) {
        res.sendfile("private/formAnnonce.html");
    });

    router.get("/modificationProfil", secured(), function (req, res, next) {
        res.sendfile("private/form.html");
    });

    router.get("/MarketPlace", secured(), function (req, res, next) {
        res.sendfile("private/MarketPlace.html");
    });

    router.get("/historique", secured(), function (req, res, next) {
        res.sendfile("private/historique.html");
    });

    router.get("/modificationAnnonce/*", secured(), function (req, res, next) {
        res.sendfile("private/modificationAnnonce.html");
    });

    router.get("/modificationAnnonce", secured(), function (req, res, next) {
        res.sendfile("private/modificationAnnonce.html");
    });

    router.get("/matching", secured(), function (req, res, next) {
        res.sendfile("private/Match.html");
    });

    router.get("/annonce/*", secured(), function (req, res, next) {
        res.sendfile("private/Annonce.html");
    });

    router.get("/Devis", secured(), function (req, res, next) {
        res.sendfile("private/Devis.html");
    });

    router.get("/Devis/*", secured(), function (req, res, next) {
        res.sendfile("private/Devis.html");
    });

    app.use('/', router);
};