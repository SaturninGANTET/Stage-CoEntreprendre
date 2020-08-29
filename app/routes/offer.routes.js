module.exports = app => {
    const offers = require("../controllers/offer.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", offers.create);

    router.get('/', offers.ownOffer);

    router.get('/:offerId', offers.findOne);

    router.post('/update/:offerId', offers.update);

    router.get('/byUser/:userId', offers.findByUser);

    router.delete('/delete/:offerId', offers.delete);

    app.use('/api/offer/', router);
};