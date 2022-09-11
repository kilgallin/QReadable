
/*Map from valid URL characters (as defined in section 2 of 
http://tools.ietf.org/html/rfc3986) to their QReadable encoding. A QReadable 
representation is a rectangle of 0s (white cells) and 1s (black cells) between
1 and 5 cells in both width and height, such that the black cells collectively
resemble the represented character. The components of the QReadable are: 
	w-width (in cells) required to display the character, 
	h-height from baseline of the highest black cell of the character, 
	bits-string of length (w x h) where character i contains the contents of
		 cell i when reading the character grid left-to-right, top-to-bottom.

As an example, the equality sign character "=" has value 
{w:3,h:4,bits:"111000111000"}, indicating a width of 3, height of 4, and pattern
consisting of four rows of 3 characters, with contents:
	111
	000
	111
	000
The two lines of 1s, then, when filled in as black squares, resemble the 
horizontal lines of an equality sign

In addition to the URL characters, spaces are included with width and height 2
*/
var pixels = { 
	 "a":{w:4,h:4,bits:"0110100110111101"},
	 "b":{w:3,h:5,bits:"100100111101111"},
	 "c":{w:3,h:4,bits:"111100100111"},
	 "d":{w:3,h:5,bits:"001001111101111"},
	 "e":{w:3,h:4,bits:"111101110111"},
	 "f":{w:3,h:4,bits:"111100110100"},
	 "g":{w:3,h:5,bits:"010101111001111"},
	 "h":{w:3,h:5,bits:"100100111101101"},
	 "i":{w:1,h:5,bits:"10111"},
	 "j":{w:3,h:5,bits:"001000001001111"},
	 "k":{w:4,h:5,bits:"10001010110010101001"},
	 "l":{w:3,h:5,bits:"100100100100111"},
	 "m":{w:5,h:4,bits:"10001110111010110001"},
	 "n":{w:3,h:4,bits:"111101101101"},
	 "o":{w:4,h:4,bits:"0110100110010110"},
	 "p":{w:3,h:4,bits:"111101111100"},
	 "q":{w:4,h:4,bits:"1110101011100011"},
	 "r":{w:2,h:4,bits:"11101010"},
	 "s":{w:2,h:4,bits:"11100111"},
	 "t":{w:3,h:5,bits:"010111010010011"},
	 "u":{w:3,h:4,bits:"101101101111"},
	 "v":{w:4,h:4,bits:"1001100110100100"},
	 "w":{w:5,h:4,bits:"10001101011101110001"},
	 "x":{w:3,h:5,bits:"101101010101101"},
	 "y":{w:3,h:4,bits:"101111001111"},
	 "z":{w:3,h:5,bits:"111001010100111"},
	 "1":{w:2,h:5,bits:"0111010101"},
	 "2":{w:2,h:5,bits:"1101111011"},
	 "3":{w:3,h:5,bits:"111001011001111"},
	 "4":{w:3,h:5,bits:"001101111001001"},
	 "5":{w:3,h:5,bits:"111100111011111"},
	 "6":{w:3,h:5,bits:"111100111101111"},
	 "7":{w:3,h:5,bits:"111001001001001"},
	 "8":{w:3,h:5,bits:"111101111101111"},
	 "9":{w:3,h:5,bits:"111101111011011"},
	 "0":{w:3,h:5,bits:"111101101101111"},
	 "/":{w:5,h:5,bits:"0000100010001000100010000"},
	 "-":{w:3,h:3,bits:"111000000"},
	 "_":{w:4,h:1,bits:"1111"},
	 "?":{w:3,h:5,bits:"111001011000010"},
	 "&":{w:4,h:5,bits:"11101010010010101101"},
	 "~":{w:5,h:4,bits:"01000101010001000000"},
	 "%":{w:5,h:5,bits:"1100111010001000101110011"},
	 "#":{w:5,h:5,bits:"0101011111010101111101010"},
	 ":":{w:1,h:4,bits:"1010"},
	 ".":{w:1,h:1,bits:"1"},
	 "[":{w:2,h:5,bits:"1110101011"},
	 "]":{w:2,h:5,bits:"1101010111"},
	 "@":{w:4,h:5,bits:"11111011101110001111"},
	 "!":{w:1,h:5,bits:"11101"},
	 "$":{w:5,h:5,bits:"1111110100111110010111111"},
	 "'":{w:1,h:5,bits:"11000"},
	 "(":{w:2,h:5,bits:"0110101001"},
	 ")":{w:2,h:5,bits:"1001010110"},
	 "*":{w:5,h:5,bits:"0010011111011100101000000"},
	 "+":{w:3,h:3,bits:"010111010"},
	 ",":{w:2,h:3,bits:"010110"},
	 ";":{w:2,h:5,bits:"0100010110"},
	 "=":{w:3,h:4,bits:"111000111000"},
	 " ":{w:2,h:1,bits:"00"}
}

var track = function(grid,x,y,size){
	var i;
	for(i = 0; i < size; i++){
		grid[x+i][y] = 1;
	}
	grid[x][y+1] = 1;
	grid[x+size-1][y+1] = 1;
	for(i = 2; i < size-2; i++){
		grid[x][y+i] = 1;
		if(size == 7){
			grid[x+2][y+i] = 1;
			grid[x+3][y+i] = 1;
			grid[x+4][y+i] = 1;
			grid[x+6][y+i] = 1;
		} else if (size == 5){
			grid[x+2][y+i] = 1;
			grid[x+4][y+i] = 1;
		}
	}
	grid[x][y+size-2] = 1;
	grid[x+size-1][y+size-2] = 1;
	for(i = 0; i < size; i++){
		grid[x+i][y+size-1] = 1;
	}
}

//Initialize a 41x41 grid to all zeroes, plus tracking squares and lines
var initializeGrid = function(grid){
	var i,j;
	
	for(i = 0; i < 41; i++){
		grid[i] = new Array(41);
		for(j = 0; j < 41; j++){
			grid[i][j]=0;
		}
	}
	//Fill in the alignment squares
	track(grid,0,0,7);
	track(grid,34,0,7);
	track(grid,0,34,7);
	track(grid,32,32,5);
	
	//Dotted lines on the left and top
	for(i = 8; i < 34; i += 2){
		grid[6][i] = 1;
		grid[i][6] = 1;
	}
}

//fills the grid in with the characters from url, starting with the first
//character at (startX,startY) and using minX as the left edge of each new line
//Returns true if successful and false if the url is too long to convert 
var fillGrid = function(grid, startX, startY, minX, url){
	var i,j;

	//Cursor position for location in the grid of the bottom-left corner of the 
	//next character
	var x = startX;
	var y = startY;
	
	for(c in url){
		var qrChar = pixels[url[c].toLowerCase()];
		//Find the next blank spot the character will fit in
		var skip = false;
		do{
			skip = false;
			//Look one square to the left of the cursor position to avoid 
			//starting a character immediately after the bottom-left
			//tracking square or left-side tracking line
			var xOff = -1;
			//If we're against the left edge of the grid itself though, 
			//don't look left to avoid an out-of-bounds error
			if(x == 0) xOff = 0;
			//search the area affected by the character for existing black cells
			//or grid edges
			for(i = 0; i < qrChar.h; i++){
				for(j = xOff; j < qrChar.w+1; j++){
					//if the character would go off the right of the grid, skip
					//do this check first to avoid looking up grid[x+j] otws
					if(x+j >= 41){
						skip = true;
						break;
					}
					//if we run into a tracking cell, skip
					if(grid[x+j][y-qrChar.h+i] == 1) {
						skip = true;
						break;
					}
				}
			}
			//move the cursor right a spot and try again if a collision is found
			if(skip)x++;
			//if that puts the cursor too far right, move down a line
			if(x+qrChar.w >= 41) {
				x = minX;
				y += 6;
				//special case to move below the top tracking line
				if(y == 11) y = 13;
			}
			//if we go off the bottom of the grid, the string can't be converted
			//starting from this position
			if(y >= 41){
				return false;
			}
		}while(skip);

		/* once the cursor is in the first safe location, fill in the cells for
		the character as encoded in the bit string. Note that the bitstring for
		the character is in LTR top-to-bottom order while y represents the
		cursor at the bottom, so (x,y-h) is the actual beginning point for the
		character
		*/
		for(i = 0; i < qrChar.h; i++){
			for(j = 0; j < qrChar.w; j++){
				var bitArray = qrChar.bits.split('');
				grid[x+j][y-qrChar.h+i] = bitArray[i*qrChar.w+j];
			}
		}
		/* Move the cursor right, leaving one blank space before the start of
		the next character. If this goes off the right of the grid, the do-
		while placement loop for the next character will correct it
		*/
		x += qrChar.w+1;
	}
	return true;
}

var toQR = function(url){

	//The URL to be encoded, in char[] form
	var urlArray = url.split('');
		
	//Check for illegal characters in the url. Stop submission and display error
	//if any are found.
	for(c in urlArray){
		if(pixels[urlArray[c]]==undefined){
			$("#error").text("Sorry, \"" + 
			urlArray[c] + "\" is not a legal character for a URL.");
			return false;
		}
	}
	
	//Initialize the grid of cells representing the QR code with 1s for black
	//cells and 0s for white
	var grid = new Array(41);
	initializeGrid(grid);
	
	//Try to fill in the grid using only the space below and to the right of
	//the tracking squares and lines
	var filled = fillGrid(grid,8,13,8,urlArray);
	
	//If the url is too long to fit in this space, squeeze another ~8-16 chars
	//in by using the space above and to the left of the tracking lines. This
	//decreases readability by using non-contiguous space, but allows more text.
	if(!filled) {
		//First, reset the grid from the previous attempt
		initializeGrid(grid);
		filled = fillGrid(grid,10,5,0,urlArray);
		//If it doesn't fit even with the extra space, abandon hope
		if(!filled){
			$("#error").text("Sorry, that string is too long to be represented"+ 
				" by a QReadable code. <br/> Try removing unnecessary portions"+
				" like \"http://www.\" or use a URL shortening service first");
			return false;
		}
	}
	
	//Finally, after the grid has been filled in completely, serialize it back
	//to a bitstring to be passed to the flash object
	var str = "";
	for(i = 0; i < 41; i++){
		for(j = 0; j < 41; j++){
			str += grid[j][i];
		}
	}

	//Set the hidden input on the form being submitted to the serialized string
	document.forms.getQReadableCode.url.value = str;
	
	//If the user is logged in, pass the user info in the hidden fields as well
	var username = sessionStorage.getItem("username");
	var token = sessionStorage.getItem("token");
	if(username != undefined && token != undefined){
		document.forms.getQReadableCode.username.value = username;
		document.forms.getQReadableCode.token.value = token;
	}
}