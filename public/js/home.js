function getServerData(url, success){
    $.ajax({
    	type: 'GET',
        dataType: "json",
        url: url
    }).done(success);
}


function putServerData(url,user,success){
    $.ajax({
    	type: 'PUT',
    	dataType: "text",
		contentType: "application/json",
		data: JSON.stringify(user),
        url: url
    }).done(success);
}


function postServerData(url,user,success){
    $.ajax({
    	type: 'POST',
		dataType: "text",
		contentType: "application/json",
		data: JSON.stringify(user),
        url: url
    }).done(success);
}

	
$("#sign_up").click(function (){
	mail = document.getElementById("email").value;
	pass = document.getElementById("password").value;
	cpsw = document.getElementById("cpassword").value;
	if(pass!=cpsw){
		alert("Pass invalid");
	}
	else{
		user = {"mail":mail,"pass":pass};
		putServerData(`/ws/Utilisateur`,user,connect);
	}
});


$("#sign_in").click(function (){
	mail = document.getElementById("connect_usermail").value;
	pass = document.getElementById("connect_passwd").value;
	user = {"mail":mail,"pass":pass};
	postServerData(`/ws/Utilisateur`,user,connect);
});


function connect(result){
	// Check the type of response 
	if(result != 'ok'){
		alert(result);
	}
	else{
		location.replace("Presentation.html");
	}
}


$("#buttonFilm").click(function (){
	getServerData(`/ws/Film`,affiche);
});

function affiche(result){
	$("#resultFilm").html("");
	_.each(result,function(f){
		var templateFilm = _.template($('#templateFilm').html());
		var html = templateFilm(f);
		$("#resultFilm").append(html);
		
		/*_.each(f['projete'],function(g){
			var templateListSalle = _.template("<li> <%=nom%> </li>");
			var h = templateListSalle(g);
			$("#salle").append(h);
		}*/
	});
}




