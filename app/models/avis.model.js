module.exports = (sequelize, Sequelize) => {
    const Avis = sequelize.define("avis", {
        note : {
            type : Sequelize.INTEGER.UNSIGNED
        },
        texte : {
            type : Sequelize.STRING(500)
        },
        idAuteur : {
            type : Sequelize.INTEGER.UNSIGNED
        },
        idDestinataire : {
            type : Sequelize.INTEGER.UNSIGNED
        }
    });

    //Picture
    const Picture = sequelize.define("pictureAvis", {
        type: {
            type:Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        data: {
            type: Sequelize.BLOB('long')
        }        
    });

    Avis.hasOne(Picture);
    Picture.belongsTo(Avis);

    return {
        avis: Avis
    };
};