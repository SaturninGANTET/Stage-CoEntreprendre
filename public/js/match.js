function getServerData(url, success){
    $.ajax({
    	type: 'GET',
        dataType: "json",
        url: url
    }).done(success);
}

getServerData("/api/matching",affiche)


function affiche(result){
    var templateAnnonce = _.template($('#templateAnnonces').html());
    console.log(result);
    result.sort((a,b) => {
        return a.poid > b.poid ? -1
            : a.poid < b.poid ? 1
            : 0; 
    }).forEach(offer => {
        console.log(offer);
        $("#resultAnnonces").append(templateAnnonce(offer));
    });
}