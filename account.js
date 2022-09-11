var updateIfLoggedIn = function(){
	var username = sessionStorage.getItem("username");
	if(username != undefined){
		$(".loggedOut").hide();
		document.getElementById("usernameLabel").innerHTML = "Logged in as <a href='user.html'>" + username + "</a>";
		$(".loggedIn").show();
	}
}

var login = function(){
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			var response = xmlhttp.responseText;
			var usernamePos = response.indexOf("username=");
			var tokenPos = response.indexOf("token=");
			if(usernamePos >= 0 && tokenPos >= 0){
				var username=response.substring(usernamePos+9,tokenPos-1);
				var token=response.substring(tokenPos+6);
				sessionStorage.setItem("username",username);
				sessionStorage.setItem("token",token);
				$(".loggedOut").hide();
				document.getElementById("usernameLabel").innerHTML = "Logged in as <a href='user.html'>" + username + "</a>";
				$(".loggedIn").show();
			}
			else{
				$("#error").text(xmlhttp.responseText);
			}
		}
	}
	xmlhttp.open("POST","login.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("username="+username+"&password="+password);
}

var logout = function(){
	sessionStorage.removeItem("username");
	sessionStorage.removeItem("token");
	$(".loggedIn").hide();
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";
	$("#password").text("");
	$(".loggedOut").show();
}

var createAccount = function(){
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var passwordCheck = prompt("Please type your password again to confirm." +
	"Note that while your password is hidden on the main page, it will be " +
	"visible when typed in this box.");
	if(password != passwordCheck){
		$("#error").text("Passwords do not match");
		return;
	}
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
		$("#error").text(xmlhttp.responseText);
		}
	}
	xmlhttp.open("POST","createAccount.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("username="+username+"&password="+password);
}