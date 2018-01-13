	let image = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; //to store picture name
	let imageposition = new Array(16); //declare an array that can store 16 items
	let blankposition; //to store where the blank image is 
	let imgtag = document.getElementsByTagName("img");
	let count = 0; //to count how many times a user move a image
	let flag; //used to check whether a user arrange puzzles in right places
	let shuffleflag = false; //used to check whether the puzzle is shuffled
	let solvableflag = false; //used to check whether the puzzle is solvable

	//loading the page
	window.onload = start;

	//If a user click "SOLVE" button, a sample picture is displayed.
	document.getElementById("solveb").addEventListener("click", showSample);

	// If a user click "START" button, shuffled images are displayed.
	document.getElementById("startb").addEventListener("click", newShuffle);

	//display a sample picture
	function showSample(){
	  	for(let j = 0; j < 16; j++){
	  		imgtag[j].src = "img/" + j + ".jpg";
	  	}//end for loop

	  	shuffleflag = false;
	}//end function showSample

	//used when only loading 
	function start(){
	  	//display shuffled images
	  	for(let j = 0; j < image.length; j++){
	  		imageposition[j] = image[j];

	  		//create img tags and assign images
	  		let simage = document.createElement("img");
			simage.setAttribute("src", "img/" + image[j] + ".jpg");
			simage.setAttribute("onclick", "move(this)");
			simage.setAttribute("alt", "slidingpieze");
			let shuffleimage = document.getElementById("play");
			shuffleimage.appendChild(simage);
	  	}//end for loop
	}//end function startShuffle

	//display shuffled images
	function newShuffle(){
		let h2message = document.getElementById("me");
		h2message.innerHTML = "";

		shuffleflag = true;
		//delete a sample image if it is displayed
		let sampleimage = document.getElementById("sample");
		if(sampleimage != null){
			sampleimage.parentNode.removeChild(sampleimage);
		}

	 	while (!solvableflag) {
	 		let ilength = image.length; 
		 	for(let i = ilength - 1; i > 0; i--) {
			    let irandom = Math.floor(Math.random() * (i + 1));
			    var tmp = image[i];
			    image[i] = image[irandom];
			    image[irandom] = tmp;
			}
		  	//check solvable puzzle or not
		  	solvableflag = solvableCheck(image);
	 	}

	 	solvableflag = false;

	  	//display shuffled images
	  	for(let j = 0; j < image.length; j++){
	  		imgtag[j].src = "img/" + image[j] + ".jpg";
	  		imageposition[j] = "img/" + image[j] + ".jpg";
	  	}//end for loop

	  	//set 0 to the count
	  	count = 0;
	  	
		//display the number of movement
		document.getElementById("counter").innerHTML = count;
	}//end function newShuffle

	function solvableCheck(image){
		let imagecheck = image;
		let parity = 0;
	    let gridWidth = Math.sqrt(imagecheck.length);
	    let row = 0; // the current row we are on
	    let blankRow = 0; // the row with the blank tile

	    // for (let i = 0; i < imagecheck.length; i++) {
	    for (let i = 0; i < imagecheck.length; i++) {
	        if (i % gridWidth == 0) { // advance to next row
	            row++;
	        }

	        if (imagecheck[i] == 15) { // the blank tile
	            blankRow = row; // save the row on which encountered
	            continue;
	        }

	        for (let j = i + 1; j < imagecheck.length; j++) {
	            if ((imagecheck[i] > imagecheck[j]) && (imagecheck[j] != 15)) {
	                parity = parity + 1;
	            }
	        }//end for loop
	    }//end for loop

        if (blankRow % 2 == 0) { // blank on odd row; counting from bottom
            return parity % 2 == 0;
        } else { // blank on even row; counting from bottom
            return parity % 2 != 0;
        }
	}//end function solvableCheck

	//to check whether puzzles shold be moved or not if a user click images
	function move(img){
		if(shuffleflag == true) {
			let t = img;
			let clickimg = t.getAttribute("src")
			let clickposition = imageposition.indexOf(clickimg);
			let blankposition = imageposition.indexOf("img/15.jpg"); 

			if(blankposition + 4 == clickposition){
				swiftImage(clickimg, clickposition, blankposition);
			} 

			if(blankposition - 1 == clickposition ){
				swiftImage(clickimg, clickposition, blankposition);
			}

			if(blankposition + 1 == clickposition){
				swiftImage(clickimg, clickposition, blankposition);
			}

			if(blankposition - 4 == clickposition){
				swiftImage(clickimg, clickposition, blankposition);
			}

			completeCheck();
		} else {
			window.alert("Start Game after click SHUFFLE button");
		}
	}

	//to move images
	function swiftImage(clickimg, clickposition, blankposition){
			let store = clickimg;
			imgtag[clickposition].src = "img/15.jpg";
			imgtag[blankposition].src = store;

			imageposition[blankposition] = store;
			imageposition[clickposition] = "img/15.jpg";

			//count up
			count++;

			//display the number of movements
			document.getElementById("counter").innerHTML = count;
	}

	//to check whether a user arrange images in right places
	function completeCheck(){
		// window.alert("flag");
		for(let c = 0; c < imageposition.length; c++){
			if(imageposition[c] != "img/" + c + ".jpg"){
				flag = 1;
				break;
			}//end if statement
			flag = 0;
		}//end for loop
		
		if(flag != 1){
			showMessage();
		}//end if statement
	}//end function completeCheck

	function showMessage(){
		let h2message = document.getElementById("me");
		h2message.innerHTML = "Well done!";
	}//end function showMessage





