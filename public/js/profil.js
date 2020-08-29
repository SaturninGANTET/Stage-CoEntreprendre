
function getServerData(url, success){
    $.ajax({
    	type: 'GET',
        dataType: "json",
        url: url
    }).done(success);
}

function postServerData(url, success){
    $.ajax({
    	type: 'POST',
        dataType: "json",
        url: url
    }).done(success);
}

if(window.location.pathname.substring(8)){
    getServerData("/api/user/" + window.location.pathname.substring(8) ,afficheProfil);
    getServerData("/api/offer/byUser/" + window.location.pathname.substring(8) ,afficheOfferVisitor);
    getServerData("/api/avis/byUserId/" + window.location.pathname.substring(8), afficheReco);
    changeToVisitor();
} else {
    getServerData(`/api/user`,afficheOwnProfil);
    getServerData("/api/offer",afficheOffer);
    getServerData("/api/avis", afficheReco);
}


function afficheProfil(result){	
    var templateProfil = _.template($('#templateProfil').html());
    $("#resultProfil").html(templateProfil(result));
    document.getElementById("envoi").setAttribute("href", "/Devis/"+result.id);
	templateProfil = _.template('<%= nom%>\ de l\'entrepreneur')
	$("#resultNom").html(templateProfil(result));
}

function afficheOwnProfil(result){
    afficheProfil(result);
    var templateSolde = _.template($('#templateSolde').html());
    $("#resultSolde").html(templateSolde(result));
}

function afficheOffer(result){
    var templateOffres = _.template($('#templateOffres').html());
    console.log(result);
    result.forEach(offer => {
        console.log(offer);
        if(offer.besoin){
            $("#resultBesoins").append(templateOffres(offer));
        } else {
            $("#resultOffres").append(templateOffres(offer));
        }
    });
}

function afficheOfferVisitor(result){
    var templateOffres = _.template($('#templateBesoins').html());
    console.log(result);
    result.forEach(offer => {
        console.log(offer);
        if(offer.besoin){
            $("#resultBesoins").append(templateOffres(offer));
        } else {
            $("#resultOffres").append(templateOffres(offer));
        }
    });
}

function afficheReco(result){
    console.log(result);
    var templateRecommandation = _.template($('#templateRecommandation').html());
    result.forEach(async avis => {
        let user = await $.ajax({
            type: 'GET',
            dataType: "json",
            url: "/api/user/"+avis.idAuteur
        }).done(() => "hihi");
        avis.nomAuteur = user.nom + " " +  user.prenom;
        $("#resultReco").append(templateRecommandation(avis));
    });
    var moyenne = {};
    moyenne.note = result.reduce( (a,b) => a + b.note,0)/result.length;
    if(moyenne.note){
        var templateNote = _.template($('#templateNote').html());
        $("#resultNote").append(templateNote(moyenne));
    }
}

function changeToVisitor(){
    postServerData("/api/user/addView/"+window.location.pathname.substring(8));
    document.getElementById("modif").style.display = "none";
    document.getElementById("envoi").style.display = "block";
    document.getElementById("historique").style.display = "none";
    document.getElementById("ajouterOffre").style.display = "none";
    document.getElementById("ajouterBesoin").style.display = "none";
}
/*
function callDone(result){
	var templateExample = _.template($('#templateExample').html());
	var html = templateExample({
		"attribute":JSON.stringify(result)
	});
	$("#resultProfil").append(html);
}

$(function(){
	$("#button").click(function(){
		getServerData("ws/example/aircraft",callDone);
	});
});*/


/*
var request = new XMLHttpRequest();
request.open('GET','/api/user');
request.responseType = "json";
request.onload = ()=> {
    if(request.status === 200){
        console.log(request.response);
        document.getElementById("nomprenom").value = (request.response.prenom + "" + request.response.nom) || "";
        document.getElementById("mail").value = request.response.adresseMail || "";
        document.getElementById("métier").value = request.response.metier || "";
        document.getElementById("resume").value = request.response.resume || "";
    } else {
        console.error(request.statusText);
    }
}
request.send();

*/
