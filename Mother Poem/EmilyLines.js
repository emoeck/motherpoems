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

var gPassages=3;
// This stir fry has 3 passages, ie 3 main texts.
var gPassageStyles=["passage0","passage1", "passage2"];
// An array of 3 style names, a style for each passage.
var gLength=24;
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
	gTextArray[0][0] = "For two days she has grieved, carrying her dead calf on her head, unwilling to let it go. "
	gTextArray[0][1] = "The mother, a member of the critically endangered southern resident family of orcas, gave birth to her calf Tuesday only to watch it die within half an hour. "
	gTextArray[0][2] = "All day, and through the night, she carried her female calf. "
	gTextArray[0][3] = "She was seen still carrying the calf on Wednesday by Ken Balcomb, founder and principal investigator of the Center for Whale Research. "
	gTextArray[0][4] = "“It is unbelievably sad,” said Brad Hanson, wildlife biologist with the Northwest Fisheries Science Center. "
	gTextArray[0][5] = "As a parent, you can only imagine what kinds of emotional stress these animals must be under, having these events happen,” the biologist commented. "
	gTextArray[0][6] = "“It reflects the very strong bonds these animals have towards eachother. " 	
	gTextArray[0][7] = "It was obvious the calf had not been dead very long, the umbilical cord was still visible. "
	gTextArray[0][8] = "The mother carrys her female calf by balancing it on her rostrum, just over her nose. She dives to pick it back up every time it slides off. "
	gTextArray[0][9] = "Scientists have documented grieving behavior in other animals with close social bonds, but never quite like this. This strong bond. "
	gTextArray[0][10] = "In one instance, a researcher attached a rope to the carcass of a bottlenose dolphin and towed it to shore— "
	gTextArray[0][11] = "the mother followed, touching the carcass until she could no longer continue into water too shallow to continue swimming. "
	gTextArray[0][12] = "There she remained, watching. "
	gTextArray[0][13] = "Some carry their young in their mouths, some on their backs. "
	gTextArray[0][14] = "“All mother's grieve, yes, but I have never heard of this,” she said of the mother. “More than 24 hours." 	
	gTextArray[0][15] = "'It is horrible. This is a sentient being. It understands the social bonds that it has with the rest of its family members,' the researcher said. "
	gTextArray[0][16] = "'She carried the calf in her womb from 17 to 18 months, she is bonded to it and she doesn’t want to let it go. It is that simple. She is grieving.' "
	gTextArray[0][17] = "The southern residents face at least three known challenges to their survival as a species: "
	gTextArray[0][18] = "Toxins, vessel traffic and "
	gTextArray[0][19] = "lack of food.  "
	gTextArray[0][20] = "When they are hungry, it makes everything worse, research has shown. "
	gTextArray[0][21] = "For researchers who work closely with the southern residents, their continued decline is painfully apparent. "
	gTextArray[0][22] = "“So they must be grieving, too.”"
	gTextArray[0][23] = "“So they must be grieving, too.”"
	gTextArray[0][24] = 
	// Above is the first passage. 
	gTextArray[1][0] = "She cannot remember when her child had ever liked to be touched. "
	gTextArray[1][1] = "Even as a toddler her child would pull away from her, her mother. "
	gTextArray[1][2] = "The mother doesn't think she was overly affectionate, but it’s hard to tell when it’s just the two of you, she thinks, nothing to measure the love against. "
	gTextArray[1][3] = "There had been a time when the child's father came early to pick the child up—he was always coming early to pick her up—and the mother had been braiding the child's hair on the sofa. "
	gTextArray[1][4] = "So lucky and rare, thought the mother, the child had climbed up and let her make her pretty and ready to go for the long weekend. "
	gTextArray[1][5] = "Then the honk of the father's horn, twenty minutes too soon. "
	gTextArray[1][6] = "The child jumped up eagerly and her braid slipped out of the mother's fingers, unweaving itself as she ran to grab her Cinderella bag, packed and waiting against the coffee table. "
	gTextArray[1][7] = "The mother remembers the child's eager eyes for the father, 'and I am the one putting in all the work,' she thought. All the father has to do is show up with his car honking twenty minutes too soon. "
	gTextArray[1][8] = "“Come here and let me finish your braid,” the mother said, because it was her time and the father honking his horn knew it. "
	gTextArray[1][9] = "So she held the child there between her legs as they both listened to the father's honking and the child kept squirming to go. "
	gTextArray[1][10] = "Weekends were always hard for the mother, not yet used to the house alone. "
	gTextArray[1][11] = "the mother let the honk go for as long as she could before she followed the child's run to the door. "
	gTextArray[1][12] = "She insisted on holding her child's hand as they walked out onto the porch, the father's black Subaru running idly at the end of the drive. "
	gTextArray[1][13] = "“One more hug for Mommy,” she said, bending down to the child's level, wrapping her tight. "
	gTextArray[1][14] = "He leaned into his horn and the mother and child heard the sound of tires and the father's car speeding away. "
	gTextArray[1][15] = "The mother, even all these years later, remembers the child's little body pulling, in that moment, then watching as she turned and ran to catch up to the father's car. "
	gTextArray[1][16] = "The child chased his car all the way down the block, but the father didn’t come back. Not that weekend at least. Children always remember, the mother thinks. "
	gTextArray[1][17] = "'All I wanted was for her to grow up strong,' the mother says outloud, returning to now, years later, where she lays on a table at Body Mechanics, a massage parlor in her new polished neighborhood. "
	gTextArray[1][18] = "It takes a lot to be a woman, the mother realizes, as she feels the masseuse now on her chest, her greedy fingers digging into that soft space below the mother's collarbone, and the mother feeks it pummel her whole body like a cave gone metallic, like someone pushing nickels into her mouth and she can't breathe—"
	gTextArray[1][19] = "the mother opens her eyes and she is sitting straight up, the towel having fallen to her waist and she feels her breasts dangling loosely against the tissue paper skin of her stomach and the masseuse wasn’t even looking. "
	gTextArray[1][20] = "The mother's nipples are hard "
	gTextArray[1][21] = "in the coldness of the room. “I want to be done here,” the mother says. "
	gTextArray[1][22] = "“I'm done here,” the mother decides outloud."
	gTextArray[1][23] = "“I'm done here,” the mother repeats again."
	gTextArray[1][24] = 
	// Above is the second passage.
	gTextArray[2][0] = ".. / -- --- .-. -. / - .... . / .-.. --- ... ... / --- ..-. / - .... . / -.-- --- ..- / .. / -. . ...- . .-. / -- . - .-.-.-"
	gTextArray[2][1] = ".. / -- --- .-. -. / - .... . / .-.. --- ... ..."
	gTextArray[2][2] = ".. / -- --- .-. -. / - .... . / .-.. --- ... ..."
	gTextArray[2][3] = " / --- ..-. / - .... . / -.-- --- ..- / .. / -. . ...- . .-. / -- . - .-.-.-"
	gTextArray[2][4] = " / --- ..-. / - .... . / -.-- --- ..- / .. / -. . ...- . .-. / -- . - .-.-.-"
	gTextArray[2][5] = " / --- ..-. / - .... . / -.-- --- ..- / .. / -. . ...- . .-. / -- . - .-.-.-"
	gTextArray[2][6] = ".. / -- --- .-. -. / - .... . / .-.. --- ... ..."
	gTextArray[2][7] = " / --- ..-. / - .... . / -.-- --- ..- / .. / -. . ...- . .-. / -- . - .-.-.-"
	gTextArray[2][8] = ".. / -- --- .-. -. / - .... . / .-.. --- ... ..."
	gTextArray[2][9] = " / --- ..-. / - .... . / -.-- --- ..- / .. / -. . ...- . .-. / -- . - .-.-.-"
	gTextArray[2][10] = ".. / -- --- .-. -. / - .... . / .-.. --- ... ..."
	gTextArray[2][11] = " / --- ..-. / - .... . / -.-- --- ..- / .. / -. . ...- . .-. / -- . - .-.-.-"
	gTextArray[2][12] = ".. / -- --- .-. -. / - .... . / .-.. --- ... ..."
	gTextArray[2][13] = ".. / -- --- .-. -. / - .... . / .-.. --- ... ... / --- ..-. / - .... . / -.-- --- ..- / .. / -. . ...- . .-. / -- . - .-.-.-"
	gTextArray[2][14] = " / --- ..-. / - .... . / -.-- --- ..- / .. / -. . ...- . .-. / -- . - .-.-.-"
	gTextArray[2][15] = " / --- ..-. / - .... . / -.-- --- ..- / .. / -. . ...- . .-. / -- . - .-.-.-"
	gTextArray[2][16] = ".. / -- --- .-. -. / - .... . / .-.. --- ... ..."
	gTextArray[2][17] = ".. / -- --- .-. -. / - .... . / .-.. --- ... ..."
	gTextArray[2][18] = ".. / -- --- .-. -. / - .... . / .-.. --- ... ..."
	gTextArray[2][19] = ".. / -- --- .-. -. / - .... . / .-.. --- ... ... / --- ..-. / - .... . / -.-- --- ..- / .. / -. . ...- . .-. / -- . - .-.-.-"
	gTextArray[2][20] = " / --- ..-. / - .... . / -.-- --- ..- / .. / -. . ...- . .-. / -- . - .-.-.-"
	gTextArray[2][21] = ".. / -- --- .-. -. / - .... . / .-.. --- ... ... / --- ..-. / - .... . / -.-- --- ..- / .. / -. . ...- . .-. / -- . - .-.-.-"
	gTextArray[2][22] = "'I mourn the loss of the you I never met,' our grief translates."
	gTextArray[2][23] = "'I mourn the loss of the you that died before me,' I translate."
	gTextArray[2][24] = 
	// Above is the third passage.
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
