<?php 
	$username = $_REQUEST["username"];
	$password = md5($_REQUEST["password"]);
	$query = "SELECT * FROM users where username='$username' AND password='$password';";
	
	$conn = mysql_connect('localhost', "root", "fall12");
	if(!$conn){
		die('Could not connect');
	}
	$results = mysql_query("USE users;");
	if(!$results){
		die('Internal database error');
	}
	$results = mysql_query($query);
	if(!$results){
		die('Internal database error');
	}
	if (mysql_num_rows($results) < 1){
		echo "Invalid username or password";
		return;
	}
	$token = md5($username . time() . $password . "salt_string2012");
	$expiration = time() + 3600;
	$query = "INSERT INTO tokens(token, username, expiration) values ('$token','$username',$expiration)";
	$results = mysql_query($query);
	if(!$results){
		die('Could not generate token');
	}
	echo "username=$username token=$token";
?>