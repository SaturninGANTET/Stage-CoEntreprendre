module.exports = app => {
    const users = require("../controllers/users.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", users.update);

    router.get("/all", users.findAll);

    router.get("/", users.ownProfile);

    router.get("/:id", users.findOne);

    router.post("/addView/:userId", users.addView);

    app.use('/api/user/', router);
};