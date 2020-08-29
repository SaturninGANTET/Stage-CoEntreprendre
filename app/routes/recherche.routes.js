module.exports = app => {
    const recherche = require("../controllers/recherche.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial

    router.get("/recherche/:string", recherche.find);

    router.get("/matching", recherche.matching);

    app.use('/api', router);
};