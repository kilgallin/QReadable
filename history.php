<?php 
$username = $_REQUEST["username"];
$token = $_REQUEST["token"];
if(strlen($username) > 0 && strlen($token) > 0){
	$conn = mysql_connect('localhost', "root", "fall12");
	if(!$conn){
		die('Could not connect to database');
	}
	$results = mysql_query("USE users;");
	if(!$results){
		die('Internal database error');
	}
	$query = "SELECT * FROM tokens where username='$username' AND token='$token'";
	$results = mysql_query($query);
	if(!$results || mysql_num_rows($results) < 1){
		die('Invalid account credentials. Please try logging in again');
	}
	$expiration = (int)(mysql_result($results,0,"expiration"));
	if(time() > $expiration){
		die('Login expired. Please log in again');
	}
	$query = "SELECT * FROM history WHERE username='$username';";
	$results = mysql_query($query);
	if(!$results){
		die('Internal database error');
	}
	$links = "";
	while ($row = mysql_fetch_array($results)) {
		$links = "<p><a onclick=\"displayLink('" . $row["url"] . "');\">".$row["url"]."</a></p>" . $links;
	}
	echo $links;
	mysql_close();
}
?>