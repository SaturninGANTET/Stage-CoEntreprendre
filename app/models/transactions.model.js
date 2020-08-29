module.exports = (sequelize, Sequelize) => {
    const Transactions = sequelize.define("transactions", {
        montant : {
            type : Sequelize.INTEGER.UNSIGNED
        },
        texte : {
            type : Sequelize.STRING(500)
        },
        idSource : {
            type : Sequelize.INTEGER.UNSIGNED
        },
        idDestinataire : {
            type : Sequelize.INTEGER.UNSIGNED
        },
        state : {
            type : Sequelize.STRING
        }
    });

    return {
        transactions: Transactions
    };
};