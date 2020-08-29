const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const morgan = require('morgan');
const { Sequelize, json } = require('sequelize');
const session = require('express-session');
const cookieParser = require('cookie-parser');
var flash = require('connect-flash');

app.use(express.static('public'));

// config express-session
var sess = {
    secret: 'testo',
    //cookie: {},
    resave: false,
    saveUninitialized: true
};
/*
if (app.get('env') === 'production'){
    // Use secure cookies in production (requires SSL/TLS)
    sess.cookie.secure = true;
}*/

app.use(session(sess));

// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

// Load Passport
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL:
            process.env.AUTH0_CALLBACK_URL
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
    }
);

passport.use(strategy);



passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());


app.use(flash());

// Handle auth failure error messages
app.use(function (req, res, next) {
    if (req && req.query && req.query.error) {
        req.flash('error', req.query.error);
    }
    if (req && req.query && req.query.error_description) {
        req.flash('error_description', req.query.error_description);
    }
    next();
});

//Pour pouvoir recevoir dans Json dans les requêtes
app.use(bodyParser.json());

// Affiche les requêtes dans la console
app.use(morgan('short'));



const db = require("./app/models")

db.sequelize.sync(); // <- Cette ligne ça concerve les tables meme sur un reboot du serv
/*db.sequelize.sync({ force: true }).then(() => { // <- Cette ligne ça reset les tables à chaque reboot
    console.log("Drop and re-sync db.");
});*/

//On affecte la gestion des requete
require("./app/routes/tutorial.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/pages.routes.js")(app);
require("./app/routes/offer.routes.js")(app);
require("./app/routes/recherche.routes.js")(app);
require("./app/routes/transactions.routes.js")(app);
require("./app/routes/avis.routes.js")(app);
require("./app/routes/admin.routes.js")(app);

app.use(require("./app/routes/auth.route.js"));

// Erreur 404
app.use(function (req, res, next) {
    console.log("Not Found");
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        // A la place de Not found on pourra envoyer un truc custom
        res.send('Not found');
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

//On écoute le port 3000
app.listen(3000, () => {
    console.log("Server is up and listening on 3000...")
});