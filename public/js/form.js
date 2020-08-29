var request = new XMLHttpRequest();
request.open('GET','/api/user');
request.responseType = "json";
request.onload = ()=> {
    if(request.status === 200){
        console.log(request.response);
        document.getElementById("firstName").value = request.response.prenom || "";
        document.getElementById("lastName").value = request.response.nom || "";
        document.getElementById("email").value = request.response.adresseMail || "";
        document.getElementById("métier").value = request.response.metier || "";
        document.getElementById("description").value = request.response.resume || "";
        document.getElementById("address2").value = request.response.adresse || "";
        document.getElementById("nomEntreprise").value = request.response.nomEntreprise;
        Array.from(document.getElementById("country").options).forEach(element => {
            if(element.text === request.response.localisationPays){
                document.getElementById("country").selectedIndex = element.index;
            }
        });
        document.getElementById("region").value = request.response.localisationRegion || "";
        Array.from(document.getElementById("compétence").options).forEach(element => {
            if(element.text === request.response.tag){
                document.getElementById("compétence").selectedIndex = element.index;
            }
        });
    } else {
        console.error(request.statusText);
    }
}
request.send();


document.getElementById("form").addEventListener("submit",()=>{
    if(!document.getElementById("form").checkValidity()){
        console.log('pavalidé');
        return;
    }
    var request2 =  new XMLHttpRequest();
    request2.open("POST", "/api/user/");
    request2.setRequestHeader("Content-Type", "application/json");
    request2.onload = function () {
        if(request2.status === 200){
            console.log(request2.response);
            document.location.href="/Profil";
        } else {
            console.error(request2.statusText);
        }
    };
    var user = JSON.stringify({"user" :{
        "prenom":document.getElementById("firstName").value,
        "nom":document.getElementById("lastName").value,
        "metier":document.getElementById("métier").value,
        "adresseMail":document.getElementById("email").value,
        "resume":document.getElementById("description").value,
        "adresse":document.getElementById("address2").value,   
        "pays":document.getElementById("country").options[document.getElementById("country").selectedIndex].text,
        "region":document.getElementById("region").value,
        "tag":document.getElementById("compétence").options[document.getElementById("compétence").selectedIndex].text,
        "nomEntreprise":document.getElementById("nomEntreprise").value
    }});
    console.log(user);
    request2.send(user);
    
});


var requestTEST = new XMLHttpRequest();
requestTEST.open('GET','/api/offer');
requestTEST.responseType = "json";
requestTEST.onload = ()=> {
    console.log(requestTEST.response);
}
requestTEST.send();
