let userId = -1;

function getServerData(url, success) {
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: url
    }).done(success).fail(success);
}

function getServerData2(url) {
    return $.ajax({
        type: 'GET',
        dataType: "json",
        url: url
    })
}

function postServerData(url, success) {
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: url
    }).done(success).fail(success);
}

const load = async () => {
    await getServerData("/api/user", afficheSolde);
    getServerData("/api/transactions", afficheTransactions);
}
load();

function afficheSolde(result) {
    //var templateSolde = _.template($('#templateSolde').html());
    //$("#resultSolde").html(templateSolde(result));
    userId = result.id;
}

function afficheTransactions(result) {
    var templateTransaction = _.template($('#templateTransaction').html());
    result.forEach(element => {
        if (element.state === "Devis") {
            element.click ="";
            getServerData2("/api/user/" + element.idSource).then(response => {
                element.nameSource = response.nom + " " + response.prenom;
                getServerData2("/api/user/" + element.idDestinataire).then(response => {
                    element.nameDestinataire = response.nom + " " + response.prenom;
                    $("#resultTransaction").append(templateTransaction(element));
                    if (element.idDestinataire === userId) {
                        $("#resultTransaction").append('<div class="col-lg-offset-8 col-lg-3" id="validerDevis"> <a class="btn btn-sec" onclick="validerDevis(' + element.id + ')" role="button"> Valider </a> </div>')
                    }
                });
            });
        } else {
            console.log(element);
            element.click = "afficheAvis("+ element.idDestinataire +","+ element.idSource+")";
            getServerData2("/api/user/" + element.idSource).then(response => {
                element.nameSource = response.nom + " " + response.prenom;
                getServerData2("/api/user/" + element.idDestinataire).then(response => {
                    element.nameDestinataire = response.nom + " " + response.prenom;
                    $("#resultTransactionOK").append(templateTransaction(element));
                });
            });
        }
    });
}

function validerDevis(devisId) {
    postServerData("/api/transactions/update/" + devisId, retourValide);
}
function retourValide(response){
    console.log(response);
    if (response.status === 200) {
        location.reload();
    } else {
        alert("La validation de ce devis a rencontré un problème");
    }
}

//var btnPopup = document.getElementById('bntPopup');
var btnClose = document.getElementById('btnClose');
var overlay = document.getElementById('overlay');
//btnPopup.addEventListener('click', openMoadl);
//function openMoadl() {
//    overlay.style.display = 'block';
//}





function afficheAvis(id, id2) {
    console.log(id, id2);
    if(id === userId){
        id=id2;
    }
    var btnClose = document.getElementById('btnClose');
    btnClose.addEventListener('click', closeModal);
    overlay.style.display = 'block';
    document.getElementById("enregistrer").setAttribute("onclick", "envoyerReco(" + id + ")")
        ;
}

function closeModal() {
    overlay.style.display = 'none';
    document.getElementById("enregistrer").setAttribute("onclick", "");
}

function envoyerReco(id) {
    $.ajax({
        type: 'POST',
        dataType: "json",
        body: JSON.stringify({
            note: document.getElementById("note").value,
            texte: document.getElementById("commentaire").value,
            idDestinataire: id
        }),
        url: "/api/avis"
    })

    var request2 = new XMLHttpRequest();
    request2.open("POST", "/api/avis/");
    request2.setRequestHeader("Content-Type", "application/json");
    request2.onload = function () {
        if (request2.status === 200) {
            console.log(request2.response);
            alert("Commentaire envoyé !")
            closeModal();
        } else {
            console.error(request2.statusText);
        }
    };
    var body = JSON.stringify({
        note: document.getElementById("note").value,
        texte: document.getElementById("commentaire").value,
        idDestinataire: id
    });
    request2.send(body);
}