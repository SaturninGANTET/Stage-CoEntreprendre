function getServerData(url, success) {
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: url
    }).done(success);
}
idDestinataire = "";
getServerData("/api/user/" + window.location.pathname.substring(7), afficheDestinataire);

function afficheDestinataire(result) {
    document.getElementById("Destinataire").value = result.nom + " " + result.prenom;
    idDestinataire = result.id;
}


document.getElementById("form").addEventListener("submit", () => {
    if (!document.getElementById("form").checkValidity()) {
        console.log('pavalidé');
        return;
    }
    console.log("validé");
    var request2 = new XMLHttpRequest();
    request2.open("POST", "/api/transactions");
    request2.setRequestHeader("Content-Type", "application/json");
    request2.onload = function () {
        if (request2.status === 200) {
            window.alert("Devis envoyé");
            history.go(-1);
        } else {
            window.alert("Il y a eu un problème lors de l'envoie du devis");
            console.error(request2.statusText);
        }
    };
    var devis = JSON.stringify({
        "montant" : document.getElementById("valeur").value,
        "texte" : document.getElementById("description").value,
        // Done with auth0 id "idSource" 
        "idDestinataire" : idDestinataire,
        "state" : "Devis",
    });
    request2.send(devis);
});
