module.exports = app => {
    const transactions = require("../controllers/transactions.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.get("/", transactions.findOwn);

    router.post("/update/:transId", transactions.validate);

    router.post("/", transactions.create);

    app.use('/api/transactions/', router);
};