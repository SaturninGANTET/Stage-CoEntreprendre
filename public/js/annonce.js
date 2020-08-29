var userId = "";

function deleteServerData(url, success) {
    $.ajax({
        type: 'DELETE',
        dataType: "json",
        url: url
    }).always(success);
}

function deleteOffer(offerId) {
    deleteServerData("/api/offer/delete/" + offerId,deleteAlert)
};

function deleteAlert(result) {
    console.log("yikes");
    console.log(result);
    if (result.status === 200) {
        window.alert("L'annonce a bien été supprimée");
        history.go(-1);
    } else {
        window.alert("Un problème a été rencontré lors de la suppression de l'annonce")
    }
}

function getServerData(url, success) {
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: url
    }).done(success);
}

getServerData("/api/offer/" + window.location.pathname.substring(9), afficheTout);


function afficheProfil(result) {
    var templateProfil = _.template($('#templateProfil').html());
    $("#resultProfil").html(templateProfil(result));
    templateProfil = _.template('<%= nom%>\ de l\'entrepreneur')
    $("#resultNom").html(templateProfil(result));
}

function afficheTout(result) {
    userId = result.userId;
    getServerData("/api/user/" + result.userId, afficheUser);
    console.log(result);
    var templateAnnonce = _.template($('#templateAnnonce').html())
    $("#resultAnnonce").html(templateAnnonce(result));
    document.getElementById("btnModifier").setAttribute("href", "/modificationAnnonce/" + result.id);
    document.getElementById("btnSupprimer").setAttribute("onclick", "deleteOffer(" + result.id + ")");
}

function afficheUser(result) {
    console.log(result);
    var templatePro = _.template($('#templatePro').html());
    $("#resultPro").html(templatePro(result));
    if (userId != result.id) {
        document.getElementById("btnModifier").style.display = "none";
        document.getElementById("btnSupprimer").style.display = "none";
    }
}