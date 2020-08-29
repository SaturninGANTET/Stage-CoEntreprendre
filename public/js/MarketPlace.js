function getServerData(url, success){
    $.ajax({
    	type: 'GET',
        dataType: "json",
        url: url
    }).done(success);
}

getServerData("/api/recherche/default",affiche)

document.getElementById("searchBar").addEventListener('change', (event) => {
    event.preventDefault();
    getServerData("/api/recherche/" + document.getElementById("searchBar").value,affiche);
});

function affiche(result){
    var templateUser = _.template($('#templatePro').html());
    var templateAnnonce = _.template($('#templateAnnonces').html());
    console.log(result);
    $("#resultProCo").html("");
    result.user.sort((a,b) => {
        return a.poid > b.poid ? -1
            : a.poid < b.poid ? 1
            : 0; 
    }).forEach(user => {
        console.log(user);
        $("#resultProCo").append(templateUser(user));
    });
    $("#resultAnnonces").html("");6
    result.offer.sort((a,b) => {
        return a.poid > b.poid ? -1
            : a.poid < b.poid ? 1
            : 0; 
    }).forEach(offer => {
        console.log(offer);
        $("#resultAnnonces").append(templateAnnonce(offer));
    });
}