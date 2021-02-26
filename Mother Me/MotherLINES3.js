/*
Original commenting by Jim Andrews, with small tweaks for Ali Rachel Pearl's Blood/Lines

A stir fry text has the following form. It has gPassages (integer)
texts. This one has 2 passages from Ali Rachel Pearl's novel-in-progress
Each passage is chopped into gLength pieces. gLength
is 25 in this stir fry. When the reader places the mouse over part
n of text t, the program replaces that small text with part n of
text t+1. 

Each of the gLength HTML elements with id's of j0 to j24, or jwhatever,
if gLength=whatever, holds HTML code. Not necessarily just text.
This means that a stir fry can also involve graphics or any
arbitrary HTML code, not just text. Marko Niemi made a stir fry,
for instance, that displays images, not texts. The stir fry is a
multi-media form. 

Let's look at how the gLength HTML elements j0 to j24 are coded. Below, 
we see an example.

<p id="j24" class="passage0" data-type="t" data-idnum="24">
  Jerome J. McGann<br><i data-type="c">Social Values and Poetic Acts</i><br>Harvard University Press, 1988.
</p>

This is a paragraph (p) element, but the elements can be span or
div or whatever. If an element starts out being a div, it will
remain a div; if it starts out being a p, it will remain a p, etc.

The id starts with j. And is followed by a number between 0 and gLength-1.

The style/class is initially passage0, a style coded in the stylesheet.
As the user stirs the text, the style and content cycle among the 
gPassages passages and styles.

The data-type of these elements must be "t". Note that in our example,
there is inner content like this:
<i data-type="c">Social Values and Poetic Acts</i>
Any tagged inner content must have data-type="c". This is important
for the touchscreen programming to work right.

*/

//****************************************************************
// GLOBALS
//****************************************************************

var gPassages=10;
// This stir fry has 3 passages, ie 3 main texts.
var gPassageStyles=["passage0","passage1", "passage2", "passage3", "passage4", "passage5"];
// An array of 3 style names, a style for each passage.
var gLength=23;
// Each passage in this stir fry is chopped into 25 pieces.
var gStateOfArt;
// An array of length gLength. Each passage is referred to by
// an index from 0 to gPassages-1. Each element of the gStateOfArt
// array is such an integer. In other words, element x of
// gStateOfArt tells us which passage is currently displayed by
// the HTML node with id='j'+x. All gLength elements are 
// initially 0.
var gTextArray;
// A 2-dimensional array that holds the texts. gTextArray[s][t]
// holds part t of passage s. 
var gCounter=0;
// When the user clicks the image at the bottom, the program
// displays an unstirred passage. This integer is an index
// between 0 and gPassages-1 that indicates which passage
// will be displayed when that button is clicked.

//****************************************************************
// INITIALIZATION
//****************************************************************


window.onload=initialize;  

function initialize() {
	// Runs after window has loaded. Initializes program.
	document.body.addEventListener('touchmove',function(e){
      e.preventDefault();
      // This prevents the body scrolling on the iPad as you
      // 'drag' touch.
  });
	gStateOfArt=[];
	for (var i=0; i<gLength; i++) {
	  gStateOfArt[i]=0;
	}
	// Initializes gStateOfArt to have gLength entries of 0.
	gTextArray = new Array(gPassages);
	for (var i=0; i < gPassages; i++) 
	{   
	  gTextArray[i] = new Array(gLength);  
	}
	// Initializes gTextArray to be a 2-dimensional array.
	gTextArray[0][0] = "When listening to a story one learns just as much about the teller as the tale:"
	gTextArray[0][1] = " The first time I brought your father over to meet my parents,"
	gTextArray[0][2] = " you once told me, "
	gTextArray[0][3] = "he couldn’t stop looking at the place settings, never seen anything as "
	gTextArray[0][4] = "fancy in his life. Your grandmother"
	gTextArray[0][5] = "had wanted to show "
	gTextArray[0][6] = "she was capable in the kitchen, despite " 	
	gTextArray[0][7] = "her being knockout drunk and never having cooked a meal in her life. "
	gTextArray[0][8] = "Come dessert time, "
	gTextArray[0][9] = "she lifts herself up from the table, dismisses "
	gTextArray[0][10] = "the help, and stumbles into "
	gTextArray[0][11] = "the kitchen. We hear "
	gTextArray[0][12] = "banging and clatter and mumbled curses before she enters the room triumphant, a flaming "
	gTextArray[0][13] = "cherry jubilee that she places in the center of the table. We were halfway through eating "
	gTextArray[0][14] = "when my father asks " 	
	gTextArray[0][15] = "what she used to light the flames and "
	gTextArray[0][16] = "my mother produces the Sterno can from "
	gTextArray[0][17] = "the other room. We spent the remainder of the evening each in our own separate bathrooms, "
	gTextArray[0][18] = "you say as you turn to me with glowing eyes, "
	gTextArray[0][19] = "we spent the whole evening keeled over  "
	gTextArray[0][20] = "the toilet with our fingers down our throats, gagging out "
	gTextArray[0][21] = "that glorious dinner. "

	// Above is the first passage. 
	gTextArray[1][0] = "When listening to a story one learns just as much about the teller as the tale:"
	gTextArray[1][1] = "-----------------I-----------------------------------------------------"
	gTextArray[1][2] = "-------------------"
	gTextArray[1][3] = "--------------------look----at-------------------------------------------------"
	gTextArray[1][4] = "---------------------You------------------"
	gTextArray[1][5] = "-----------------show "
	gTextArray[1][6] = "---------------------------------------------" 
	gTextArray[1][7] = "--------------------------------------------------------------me-----------------"
	gTextArray[1][8] = "----me----------------"
	gTextArray[1][9] = "she------her-self---------------------------------"
	gTextArray[1][10] = "---------------------------------"
	gTextArray[1][11] = "---------------We-----"
	gTextArray[1][12] = "bang----and-clatter--------------------------------------------------------------------------a-flaming"
	gTextArray[1][13] = "-------------------------place-----------------------------------------------------------------------"  
	gTextArray[1][14] = "--------------------" 		
	gTextArray[1][15] = "-----------used--------------------------"
	gTextArray[1][16] = "----------------------------------------------"
	gTextArray[1][17] = "------------------------------------------------------------------each----our-own-------------------------------"
	gTextArray[1][18] = "you-say-as-you-----------------------------------"
	gTextArray[1][19] = "-----------------------------------------------"
	gTextArray[1][20] = "--------let---------------------------our-throats----------------g--o---"
	gTextArray[1][21] = "---------------------"

	// Above is the second passage.
	gTextArray[2][0] = "When listening to a story one learns just as much about the teller as the tale:"
	gTextArray[2][1] = "-----------------I-----------------------------------------------------"
	gTextArray[2][2] = "-------------------"
	gTextArray[2][3] = "--------------------look----at-------------------------------------------------"
	gTextArray[2][4] = "---------------------You------------------"
	gTextArray[2][5] = "-----------------show "
	gTextArray[2][6] = "---------------------------------------------" 
	gTextArray[2][7] = "--------------------------------------------------------------me-----------------"
	gTextArray[2][8] = "----me----------------"
	gTextArray[2][9] = "she------her-self---------------------------------"
	gTextArray[2][10] = "---------------------------------"
	gTextArray[2][11] = "---------------We-----"
	gTextArray[2][12] = "bang----and-clatter--------------------------------------------------------------------------a-flaming"
	gTextArray[2][13] = "-------------------------place-----------------------------------------------------------------------"  
	gTextArray[2][14] = "--------------------" 		
	gTextArray[2][15] = "-----------used--------------------------"
	gTextArray[2][16] = "----------------------------------------------"
	gTextArray[2][17] = "------------------------------------------------------------------each----our-own-------------------------------"
	gTextArray[2][18] = "you-say-as-you-----------------------------------"
	gTextArray[2][19] = "-----------------------------------------------"
	gTextArray[2][20] = "--------let---------------------------our-throats----------------g--o---"
	gTextArray[2][21] = "---------------------"
	
	// Above is the third passage.
	gTextArray[3][0] = "When listening to a story one learns just as much about the teller as the tale:"
	gTextArray[3][1] = "-----------------I-----------------------------------------------------"
	gTextArray[3][2] = "-------------------"
	gTextArray[3][3] = "--------------------look----at-------------------------------------------------"
	gTextArray[3][4] = "---------------------You------------------"
	gTextArray[3][5] = "-----------------show "
	gTextArray[3][6] = "---------------------------------------------" 
	gTextArray[3][7] = "--------------------------------------------------------------me-----------------"
	gTextArray[3][8] = "----me----------------"
	gTextArray[3][9] = "she------her-self---------------------------------"
	gTextArray[3][10] = "---------------------------------"
	gTextArray[3][11] = "---------------We-----"
	gTextArray[3][12] = "bang----and-clatter--------------------------------------------------------------------------a-flaming"
	gTextArray[3][13] = "-------------------------place-----------------------------------------------------------------------"  
	gTextArray[3][14] = "--------------------" 		
	gTextArray[3][15] = "-----------used--------------------------"
	gTextArray[3][16] = "----------------------------------------------"
	gTextArray[3][17] = "------------------------------------------------------------------each----our-own-------------------------------"
	gTextArray[3][18] = "you-say-as-you-----------------------------------"
	gTextArray[3][19] = "-----------------------------------------------"
	gTextArray[3][20] = "--------let---------------------------our-throats----------------g--o---"
	gTextArray[3][21] = "---------------------"

// Above is the forth passage.
	gTextArray[4][0] = "When listening to a story one learns just as much about the teller as the tale:"
	gTextArray[4][1] = "-----------------I-----------------------------------------------------"
	gTextArray[4][2] = "-------------------"
	gTextArray[4][3] = "--------------------look----at-------------------------------------------------"
	gTextArray[4][4] = "---------------------You------------------"
	gTextArray[4][5] = "-----------------show "
	gTextArray[4][6] = "---------------------------------------------" 
	gTextArray[4][7] = "--------------------------------------------------------------me-----------------"
	gTextArray[4][8] = "----me----------------"
	gTextArray[4][9] = "she------her-self---------------------------------"
	gTextArray[4][10] = "---------------------------------"
	gTextArray[4][11] = "---------------We-----"
	gTextArray[4][12] = "bang----and-clatter--------------------------------------------------------------------------a-flaming"
	gTextArray[4][13] = "-------------------------place-----------------------------------------------------------------------"  
	gTextArray[4][14] = "--------------------" 		
	gTextArray[4][15] = "-----------used--------------------------"
	gTextArray[4][16] = "----------------------------------------------"
	gTextArray[4][17] = "------------------------------------------------------------------each----our-own-------------------------------"
	gTextArray[4][18] = "you-say-as-you-----------------------------------"
	gTextArray[4][19] = "-----------------------------------------------"
	gTextArray[4][20] = "--------let---------------------------our-throats----------------g--o---"
	gTextArray[4][21] = "---------------------"
	
// Above is the fifth passage.
	gTextArray[5][0] = "When listening to a story one learns just as much about the teller as the tale:"
	gTextArray[5][1] = "-----------------I-----------------------------------------------------"
	gTextArray[5][2] = "-------------------"
	gTextArray[5][3] = "--------------------look----at-------------------------------------------------"
	gTextArray[5][4] = "---------------------You------------------"
	gTextArray[5][5] = "-----------------show "
	gTextArray[5][6] = "---------------------------------------------" 
	gTextArray[5][7] = "--------------------------------------------------------------me-----------------"
	gTextArray[5][8] = "----me----------------"
	gTextArray[5][9] = "she------her-self---------------------------------"
	gTextArray[5][10] = "---------------------------------"
	gTextArray[5][11] = "---------------We-----"
	gTextArray[5][12] = "bang----and-clatter--------------------------------------------------------------------------a-flaming"
	gTextArray[5][13] = "-------------------------place-----------------------------------------------------------------------"  
	gTextArray[5][14] = "--------------------" 		
	gTextArray[5][15] = "-----------used--------------------------"
	gTextArray[5][16] = "----------------------------------------------"
	gTextArray[5][17] = "------------------------------------------------------------------each----our-own-------------------------------"
	gTextArray[5][18] = "you-say-as-you-----------------------------------"
	gTextArray[5][19] = "-----------------------------------------------"
	gTextArray[5][20] = "--------let---------------------------our-throats----------------g--o---"
	gTextArray[5][21] = "---------------------"

	// Above is the sixth passage.
	gTextArray[6][0] = "When listening to a story one learns just as much about the teller as the tale:"
	gTextArray[6][1] = "-----------------I-----------------------------------------------------"
	gTextArray[6][2] = "-------------------"
	gTextArray[6][3] = "--------------------look----at-------------------------------------------------"
	gTextArray[6][4] = "---------------------You------------------"
	gTextArray[6][5] = "-----------------show "
	gTextArray[6][6] = "---------------------------------------------" 
	gTextArray[6][7] = "--------------------------------------------------------------me-----------------"
	gTextArray[6][8] = "----me----------------"
	gTextArray[6][9] = "she------her-self---------------------------------"
	gTextArray[6][10] = "---------------------------------"
	gTextArray[6][11] = "---------------We-----"
	gTextArray[6][12] = "bang----and-clatter--------------------------------------------------------------------------a-flaming"
	gTextArray[6][13] = "-------------------------place-----------------------------------------------------------------------"  
	gTextArray[6][14] = "--------------------" 		
	gTextArray[6][15] = "-----------used--------------------------"
	gTextArray[6][16] = "----------------------------------------------"
	gTextArray[6][17] = "------------------------------------------------------------------each----our-own-------------------------------"
	gTextArray[6][18] = "you-say-as-you-----------------------------------"
	gTextArray[6][19] = "-----------------------------------------------"
	gTextArray[6][20] = "--------let---------------------------our-throats----------------g--o---"
	gTextArray[6][21] = "---------------------"
	
	// Above is the sEVENTH passage.
	gTextArray[7][0] = "When listening to a story one learns just as much about the teller as the tale:"
	gTextArray[7][1] = "-----------------I-----------------------------------------------------"
	gTextArray[7][2] = "-------------------"
	gTextArray[7][3] = "--------------------look----at-------------------------------------------------"
	gTextArray[7][4] = "---------------------You------------------"
	gTextArray[7][5] = "-----------------show "
	gTextArray[7][6] = "---------------------------------------------" 
	gTextArray[7][7] = "--------------------------------------------------------------me-----------------"
	gTextArray[7][8] = "----me----------------"
	gTextArray[7][9] = "she------her-self---------------------------------"
	gTextArray[7][10] = "---------------------------------"
	gTextArray[7][11] = "---------------We-----"
	gTextArray[7][12] = "bang----and-clatter--------------------------------------------------------------------------a-flaming"
	gTextArray[7][13] = "-------------------------place-----------------------------------------------------------------------"  
	gTextArray[7][14] = "--------------------" 		
	gTextArray[7][15] = "-----------used--------------------------"
	gTextArray[7][16] = "----------------------------------------------"
	gTextArray[7][17] = "------------------------------------------------------------------each----our-own-------------------------------"
	gTextArray[7][18] = "you-say-as-you-----------------------------------"
	gTextArray[7][19] = "-----------------------------------------------"
	gTextArray[7][20] = "--------let---------------------------our-throats----------------g--o---"
	gTextArray[7][21] = "---------------------"
	// Above is the eighth passage.

	gTextArray[8][0] = "When listening to a story one learns just as much about the teller as the tale:"
	gTextArray[8][1] = "-----------------I-----------------------------------------------------"
	gTextArray[8][2] = "-------------------"
	gTextArray[8][3] = "--------------------look----at-------------------------------------------------"
	gTextArray[8][4] = "---------------------You------------------"
	gTextArray[8][5] = "-----------------show "
	gTextArray[8][6] = "---------------------------------------------" 
	gTextArray[8][7] = "--------------------------------------------------------------me-----------------"
	gTextArray[8][8] = "----me----------------"
	gTextArray[8][9] = "she------her-self---------------------------------"
	gTextArray[8][10] = "---------------------------------"
	gTextArray[8][11] = "---------------We-----"
	gTextArray[8][12] = "bang----and-clatter--------------------------------------------------------------------------a-flaming"
	gTextArray[8][13] = "-------------------------place-----------------------------------------------------------------------"  
	gTextArray[8][14] = "--------------------" 		
	gTextArray[8][15] = "-----------used--------------------------"
	gTextArray[8][16] = "----------------------------------------------"
	gTextArray[8][17] = "------------------------------------------------------------------each----our-own-------------------------------"
	gTextArray[8][18] = "you-say-as-you-----------------------------------"
	gTextArray[8][19] = "-----------------------------------------------"
	gTextArray[8][20] = "--------let---------------------------our-throats----------------g--o---"
	gTextArray[8][21] = "---------------------"
	// Above is the ninth passage.

	gTextArray[9][0] = "When listening to a story one learns just as much about the teller as the tale:"
	gTextArray[9][1] = "-----------------I-----------------------------------------------------"
	gTextArray[9][2] = "-------------------"
	gTextArray[9][3] = "--------------------look----at-------------------------------------------------"
	gTextArray[9][4] = "---------------------You------------------"
	gTextArray[9][5] = "-----------------show "
	gTextArray[9][6] = "---------------------------------------------" 
	gTextArray[9][7] = "--------------------------------------------------------------me-----------------"
	gTextArray[9][8] = "----me----------------"
	gTextArray[9][9] = "she------her-self---------------------------------"
	gTextArray[9][10] = "---------------------------------"
	gTextArray[9][11] = "---------------We-----"
	gTextArray[9][12] = "bang----and-clatter--------------------------------------------------------------------------a-flaming"
	gTextArray[9][13] = "-------------------------place-----------------------------------------------------------------------"  
	gTextArray[9][14] = "--------------------" 		
	gTextArray[9][15] = "-----------used--------------------------"
	gTextArray[9][16] = "----------------------------------------------"
	gTextArray[9][17] = "------------------------------------------------------------------each----our-own-------------------------------"
	gTextArray[9][18] = "you-say-as-you-----------------------------------"
	gTextArray[9][19] = "-----------------------------------------------"
	gTextArray[9][20] = "--------let---------------------------our-throats----------------g--o---"
	gTextArray[9][21] = "---------------------"
	// Above is the tenth passage.
	
	
	setBindings();
	resizeBrowser();
}; // end of initialize

function setBindings() {
  // Called once. Toward the end of initialize.
  window.addEventListener("resize", resizeBrowser, false);
  if (isEventSupported("touchmove")) {
    //set up touch handling
    var maintextobj=document.getElementById("maintext");
    document.body.addEventListener("touchstart", touchInProgress, false);
    document.body.addEventListener("touchmove", touchInProgress, false);
  }
  else {
    // Mouse handling
    for (var i=0; i<gLength; i++) {
      document.getElementById('j' + i).addEventListener("mouseover", cutupMouse, false);
    }
  }
} // end of setBindings

//****************************************************************
// FUNCTIONS
//****************************************************************

function resizeBrowser() {
	// Called at the beginning of the program and when the user resizes the browser.
	var bh=browserHeight();
	var mainTextHeight=bh - elementHeight(document.getElementById('titleImg'));
	var textHeight=elementHeight('maintext');
	if (mainTextHeight>=textHeight) {
		document.getElementById('maintext').style.top=Math.round((mainTextHeight-textHeight)/2) + 'px';
	}
	else {
			document.getElementById('maintext').style.top='0px';
	}
}

function cutupMouse() {
	// This gets called each time the mouseover event occurs over
	// one of the html elements with id such as j0 or j5 etc.
  var x=this.getAttribute("data-idnum");
  var xint=parseInt(x);
  gStateOfArt[xint]=(gStateOfArt[xint]+1) % gPassages;
  // When the reader places the mouse over part n of text t, the 
  //program replaces that small text with part n of text t+1. 
  cutup(this, gStateOfArt[xint], xint);
}

function cutup(Textian, jstate, jposition) {
	// Gets called each time the program stirs the text.
	// Textian is the html object. jstate is the number
	// of the passage. jposition is the number of the part.
  Textian.innerHTML=gTextArray[jstate][jposition];
  Textian.className=gPassageStyles[jstate];
}

function touchInProgress(e) {
	// Gets called each time the user stirs the text on a touchscreen.
	var touch = e.touches[0];
	var x = touch.pageX;
	var y = touch.pageY;
	var el= document.elementFromPoint(x,y); 
	//el is the topmost element the user is touching.
	if (el) {
    var dataType=el.getAttribute('data-type');
    // Each of the gLength HTML elements with id of j0 or j24
    // (or whatever) have data-type="t". Tagged inner content
    // of those elements must have data-type="c".
    if (dataType) {
    	// Then el is either one of our j0 to j24 elements or
    	// an element inside those.
    	while (dataType != 't') {
    		// This loop ensures that el ends up being one of our
    		// targeted j0 to j24 elements.
    		el=el.parentNode;
    		dataType=el.getAttribute('data-type');
    	}
    	var idnumasstring=el.getAttribute("data-idnum");
	    if (idnumasstring) {
	      var idnum=parseInt(idnumasstring);
	      gStateOfArt[idnum]=(gStateOfArt[idnum]+1)%gPassages;
	      cutup(el, gStateOfArt[idnum], idnum);
	    }

    }
	}
} // end of touchInProgress

function order() {
	// Called when the user clicks the button that
	// cycles through the texts.
	gCounter=(gCounter+1) % gPassages;
	for (var i=0; i<gLength; i++) {
		var el=document.getElementById("j"+i)
		el.innerHTML = gTextArray[gCounter][i];
		el.className=gPassageStyles[gCounter];
	}
}

/*
	var maintext=document.getElementById('maintext');
  for (var i=0; i<gLength; i++) {
	  var n=document.createElement('span');
	  n.setAttribute('id', 'j'+i);
	  n.setAttribute('class', gPassageStyles[gCounter]);
	  n.setAttribute('data-type', 't');
	  n.setAttribute('data-idnum', i.toString());
	  n.innerHTML=gTextArray[gCounter][i];
	  gObjArray[i]=n;
	  maintext.appendChild(n);
	}
	*/
