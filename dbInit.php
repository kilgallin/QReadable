<html>
<head>
</head>

<body>
<?php 
	$conn = mysql_connect('localhost', "root", "fall12");
	if(!$conn){
		die('Could not connect');
	}
	$queries = array("CREATE DATABASE users","USE users",
	"CREATE TABLE users(username varchar(20) primary key, password varchar(33))",
	"CREATE TABLE history(id int primary key auto_increment, username varchar(20), 
	url varchar(110), FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE)",
	"CREATE TABLE tokens(token varchar(33), username varchar(20), expiration int)");

	foreach($queries as $query){
		$results = mysql_query($query);
		if(!$results){
			die('Could not execute query ' . $query .':'. mysql_error());
		}
	}
	echo "Database created successfully";
?>
</body>
</html>