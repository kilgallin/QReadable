<html>
<head>
<link rel="stylesheet" type="text/css" href="styles.css">
<script src="jquery-1.8.2.js"></script>
<script src="account.js"></script>
</head>

<body onload="updateIfLoggedIn()">
	<div id="header" height='200px'>
		<a href="index.html">Home</a>&nbsp;&nbsp;
		<a href="about.html">About</a>&nbsp;&nbsp;
		<a href="app.html">Get the Android app</a>&nbsp;&nbsp;
		<span class="loggedOut">
		Username<input type="text" id="username"> 
		Password<input type="password" id="password">
		<button onclick="login()">Login</button>
		<button onclick="createAccount()">Create account</button>
		</span>
		<span class="loggedIn" style="display:none">
		<span id="usernameLabel"></span>
		<button onclick="logout()">Logout</button>
		</span>
	</div>
	<div align="center" id="flashContent">
			<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="1000" height="1000" id="qreadable" align="middle">
				<param name="movie" value="qreadable.swf" />
				<param name="quality" value="high" />
				<param name="bgcolor" value="#ffffff" />
				<param name="play" value="true" />
				<param name="loop" value="true" />
				<param name="wmode" value="window" />
				<param name="scale" value="showall" />
				<param name="menu" value="true" />
				<param name="devicefont" value="false" />
				<param name="salign" value="" />
				<param name="allowScriptAccess" value="sameDomain" />
				<param name="FlashVars" value="squareString=%(url)s">
				<!--[if !IE]>-->
				<object type="application/x-shockwave-flash" data="/static/qreadable.swf" width="1000" height="1000">
					<param name="movie" value="qreadable.swf" />
					<param name="quality" value="high" />
					<param name="bgcolor" value="#ffffff" />
					<param name="play" value="true" />
					<param name="loop" value="true" />
					<param name="wmode" value="window" />
					<param name="scale" value="showall" />
					<param name="menu" value="true" />
					<param name="devicefont" value="false" />
					<param name="salign" value="" />
					<param name="allowScriptAccess" value="sameDomain" />
					<param name="FlashVars" value="squareString=%(url)s">
				<!--<![endif]-->
					<a href="http://www.adobe.com/go/getflash">
						<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" />
					</a>
				<!--[if !IE]>-->
				</object>
				<!--<![endif]-->
			</object>
		</div>
</body>
</html>