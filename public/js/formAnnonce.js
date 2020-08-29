document.getElementById("form").addEventListener("submit", () => {
    if (!document.getElementById("form").checkValidity()) {
        console.log('pavalidé');
        return;
    }
    console.log("validé");
    var request2 = new XMLHttpRequest();
    request2.open("POST", "/api/offer");
    request2.setRequestHeader("Content-Type", "application/json");
    request2.onload = function () {
        if (request2.status === 200) {
            alert("Annonce ajoutée");
            document.location.href="/Profil";
        } else {
            console.error(request2.statusText);
        }
    };
    $("#checkAll").click(function () {
        $('input:checkbox)').not(this).prop('checked', this.checked);
    });
    var offer = JSON.stringify({
        "offer": {
            "title":document.getElementById("Intitule").value,
            "communauté":document.getElementById("communauté").checked,
            "entreprise":document.getElementById("entreprise").checked,
            "offre":document.getElementById("offre").checked,
            "offre_Prestation":document.getElementById("offre_Prestation").checked,
            "offre_Formation":document.getElementById("offre_Formation").checked,
            "besoin":document.getElementById("besoin").checked,
            "besoin_Prestation":document.getElementById("besoin_Prestation").checked,
            "besoin_Formation":document.getElementById("besoin_Formation").checked,
            "echange":document.getElementById("echange").checked,
            "besoin_Equipe":document.getElementById("besoin_Equipe").checked,
            "conception_Projet":document.getElementById("conception_Projet").checked,
            "création_Activité":document.getElementById("création_Activité").checked,
            "démarrage_Activité":document.getElementById("démarrage_Activité").checked,
            "développement":document.getElementById("développement").checked,
            "description":document.getElementById("description").value,
            "valeur":document.getElementById("valeur").value,
        }
    });
    console.log(offer);
    request2.send(offer);
});
