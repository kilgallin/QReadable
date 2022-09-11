<?php 
	$username = $_REQUEST["username"];
	$password = md5($_REQUEST["password"]);
	$query = "INSERT INTO users(username, password) values ('$username','$password');";
	
	$conn = mysql_connect('localhost', "root", "fall12");
	if(!$conn){
		die('Could not connect to database');
	}
	$results = mysql_query("USE users;");
	if(!$results){
		die('Internal database error');
	}
	$results = mysql_query($query);
	if(!$results){
		die('Unable to create account for $username. Try another username.');
	}
	echo "Account created successfully";
?>