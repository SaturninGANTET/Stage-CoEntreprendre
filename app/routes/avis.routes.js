module.exports = app => {
    const avis = require("../controllers/avis.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.get("/", avis.findOwn);

    router.get("/byUserId/:userId", avis.findByUserId);

    router.post("/", avis.create);

    app.use('/api/avis/', router);
};