module.exports = (sequelize, Sequelize) => {
    /*
    * Definition de la table Users :
    * userid    UNSIGNED INT, Incremental (Primary Key)
    * prenom    Varchar(250)
    * nom       Varchar(250)
    * adresseMail
    * metier    Varchar(250)
    * anneExperience    INT
    * resume    Varchar(500)
    * localisation  Varchar(250)
    * ...
    */
    const Users = sequelize.define("users", {
        auth0_id: {
            type: Sequelize.STRING
        },
        prenom: {
            type: Sequelize.STRING
        },
        nom: {
            type: Sequelize.STRING
        },
        telephone: {
            type: Sequelize.STRING
        },
        adresseMail:{
            type: Sequelize.STRING
        },
        metier: {
            type: Sequelize.STRING
        },
        solde: {
            type: Sequelize.INTEGER
        },
        anneeExperience: {
            type: Sequelize.INTEGER.UNSIGNED
        },
        resume: {
            type: Sequelize.STRING(500),
        },
        localisationPays: {
            type: Sequelize.STRING
        },
        localisationRegion: {
            type: Sequelize.STRING
        },
        travailDistance: {
            type: Sequelize.BOOLEAN
        },
        travailChezClient: {
            type: Sequelize.BOOLEAN
        },
        adresse: {
            type: Sequelize.STRING
        },
        tag : {
            type: Sequelize.STRING
        },
        viewCount: {
            type: Sequelize.INTEGER
        },
        nomEntreprise: {
            type: Sequelize.STRING
        }
    });


    //Profile Picture
    const Avatar = sequelize.define("avatar", {
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

    Users.hasOne(Avatar);
    Avatar.belongsTo(Users);

    
    // TAG EXPERTISE
    const TagsExpertises = sequelize.define("tagsExpertises", {
        Name: {
            type: Sequelize.STRING(50),
            primaryKey: true
        }
    });

    Users.belongsToMany(TagsExpertises, { through: "UsersTagsExpertises" });
    TagsExpertises.belongsToMany(Users, { through: "UsersTagsExpertises" });

    // TAG SECTEUR
    const TagsSecteur = sequelize.define("tagsSecteur", {
        Name: {
            type: Sequelize.STRING(50),
            primaryKey: true
        }
    });

    Users.belongsToMany(TagsSecteur, { through: "UsersTagsSecteur" });
    TagsSecteur.belongsToMany(Users, { through: "UsersTagsSecteur" });

    // TAG CIBLES
    const TagsCibles = sequelize.define("tagsCibles", {
        Name: {
            type: Sequelize.STRING(50),
            primaryKey: true
        }
    });

    Users.belongsToMany(TagsCibles, { through: "UsersTagsCibles" });
    TagsCibles.belongsToMany(Users, { through: "UsersTagsCibles" });



    // OFFRE / DEMANDE
    const Offer = sequelize.define("offer", {
        title : {
            type : Sequelize.STRING
        },
        communauté : {
            type : Sequelize.BOOLEAN
        },
        entreprise : {
            type : Sequelize.BOOLEAN
        },
        offre : {
            type : Sequelize.BOOLEAN
        },
        offre_Prestation : {
            type : Sequelize.BOOLEAN
        },
        offre_Formation : {
            type : Sequelize.BOOLEAN
        },
        besoin : {
            type : Sequelize.BOOLEAN
        },
        besoin_Prestation : {
            type : Sequelize.BOOLEAN
        },
        besoin_Formation : {
            type : Sequelize.BOOLEAN
        },
        echange : {
            type : Sequelize.BOOLEAN
        },
        besoin_Equipe : {
            type : Sequelize.BOOLEAN
        },
        conception_Projet : {
            type : Sequelize.BOOLEAN
        },
        création_Activité : {
            type : Sequelize.BOOLEAN
        },
        démarrage_Activité : {
            type : Sequelize.BOOLEAN
        },
        développement : {
            type : Sequelize.BOOLEAN
        },
        description : {
            type : Sequelize.STRING(500)
        },
        valeur : {
            type : Sequelize.INTEGER
        }
    });

    Users.hasMany(Offer);
    Offer.belongsTo(Users, {thought : "userOffers"});

    //Picture
    const Picture = sequelize.define("pictureOffer", {
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

    Offer.hasOne(Picture);
    Picture.belongsTo(Offer);





    return {
        avatar: Avatar,
        users: Users,
        offer: Offer,
        tagsExpertises: TagsExpertises,
        tagsSecteur: TagsSecteur,
        tagsCibles: TagsCibles
    };
};