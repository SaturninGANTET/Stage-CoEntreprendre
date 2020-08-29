//On récupere la configuration de Sequelize
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//On initialise ou récupère les tables
db.testo = require("./tutorial.model.js")(sequelize, Sequelize);
Object.assign(db, require("./users.model.js")(sequelize, Sequelize));
Object.assign(db, require("./transactions.model.js")(sequelize, Sequelize));
Object.assign(db, require("./avis.model.js")(sequelize, Sequelize));


module.exports = db