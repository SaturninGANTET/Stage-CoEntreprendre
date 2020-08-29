module.exports = app => {
    const admin = require("../controllers/admin.controller.js");

    var router = require("express").Router();

    router.get("/user/:userId/setSolde/:newSolde", admin.setSolde);

    app.use('/admin/', router);
};