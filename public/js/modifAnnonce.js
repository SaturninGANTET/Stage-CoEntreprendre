console.log(window.location.pathname.substring(21));

var request = new XMLHttpRequest();
request.open('GET', '/api/offer/' + window.location.pathname.substring(21));
request.responseType = "json";
request.onload = () => {
    if (request.status === 200) {
        console.log(request.response);
        document.getElementById("Intitule").value = request.response.title;
            document.getElementById("communauté").checked = request.response.communauté;
            document.getElementById("entreprise").checked = request.response.entreprise;
            document.getElementById("offre").checked = request.response.offre;
            document.getElementById("offre_Prestation").checked = request.response.offre_Prestation;
            document.getElementById("offre_Formation").checked = request.response.offre_Formation;
            document.getElementById("besoin").checked = request.response.besoin;
            document.getElementById("besoin_Prestation").checked = request.response.besoin_Prestation;
            document.getElementById("besoin_Formation").checked = request.response.besoin_Formation;
            document.getElementById("echange").checked = request.response.echange;
            document.getElementById("besoin_Equipe").checked = request.response.besoin_Equipe;
            document.getElementById("conception_Projet").checked = request.response.conception_Projet;
            document.getElementById("création_Activité").checked = request.response.création_Activité;
            document.getElementById("démarrage_Activité").checked = request.response.démarrage_Activité;
            document.getElementById("développement").checked = request.response.développement;
            document.getElementById("description").value = request.response.description;
            document.getElementById("valeur").value = request.response.valeur;
    } else {
        console.error(request.statusText);
    }
}
request.send();

////////////////////////////


document.getElementById("form").addEventListener("submit", () => {
    if (!document.getElementById("form").checkValidity()) {
        console.log('pavalidé');
        return;
    }
    console.log("validé");
    var request2 = new XMLHttpRequest();
    request2.open("POST", "/api/offer/update/" + window.location.pathname.substring(21));
    request2.setRequestHeader("Content-Type", "application/json");
    request2.onload = function () {
        if (request2.status === 200) {
            console.log(request2.response);
            document.location.href = "/Profil";
        } else {
            console.error(request2.statusText);
        }
    };
    $("#checkAll").click(function () {
        $('input:checkbox)').not(this).prop('checked', this.checked);
    });
    var offer = JSON.stringify({
        "offer": {
            "title": document.getElementById("Intitule").value,
            "communauté": document.getElementById("communauté").checked,
            "entreprise": document.getElementById("entreprise").checked,
            "offre": document.getElementById("offre").checked,
            "offre_Prestation": document.getElementById("offre_Prestation").checked,
            "offre_Formation": document.getElementById("offre_Formation").checked,
            "besoin": document.getElementById("besoin").checked,
            "besoin_Prestation": document.getElementById("besoin_Prestation").checked,
            "besoin_Formation": document.getElementById("besoin_Formation").checked,
            "echange": document.getElementById("echange").checked,
            "besoin_Equipe": document.getElementById("besoin_Equipe").checked,
            "conception_Projet": document.getElementById("conception_Projet").checked,
            "création_Activité": document.getElementById("création_Activité").checked,
            "démarrage_Activité": document.getElementById("démarrage_Activité").checked,
            "développement": document.getElementById("développement").checked,
            "description": document.getElementById("description").value,
        }
    });
    console.log(offer);
    request2.send(offer);
});
