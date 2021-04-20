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

var gPassages=13;
// This stir fry has 3 passages, ie 3 main texts.
var gPassageStyles=["passage0","passage1", "passage2", "passage3", "passage4", "passage5"];
// An array of 3 style names, a style for each passage.
var gLength=1;
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
	gTextArray[0][0] =        
	gTextArray[0][0] = " My mother used to spend hours getting ready before she would step outside. I’m sure she still does. When I am young, I watch her from her bedroom doorway as she leans over the sink in her bathroom—her chin tilted towards the glow of her magnified mirror suction cupped to the medicine cabinet—her lips a soft and hollow O as she brushes her soft blonde self with color. Such a shame, she says, you didn’t get any of my genes. Can’t even tell you’re mine. Better hope you don’t get your father’s legs too. Built like tree trunks, she says, the whole family."
	

	// Above is the first passage. 
	gTextArray[1][0] = 
	gTextArray[1][1] = " My mother’s parents died before I was born, but when I’m young my mom often takes me to get In-and-Out burgers and park outside their old Beverly Hills mansion. Sit and eat in our rented red compact as we stare at the house and my mother talks about all the celebrities that used to come over for dinner. How Groucho Marx would bring his pitbull. How my mother’s mother was mean when she drank. Used to slap the back of my mother’s arm with a brush and tell her she was too hairy. Told my mother she should feel lucky because they adopted her from the wrong side of the tracks, but that maybe they wouldn’t have if they had known their daughter would grow up with such hairy arms."


	// Above is the second passage.
	gTextArray[2][0] = 
	gTextArray[2][1] = " In high school I play varsity volleyball, back row. No spike or hard serve can get past me. I have the whole back court covered. My mother tells me girls who play sports don’t get boys. Power Legs, my coaches call me when they drive me home from the games."

	
	// Above is the third passage.
	gTextArray[3][0] = 
	gTextArray[3][1] = " I was always going to move back east. Wanted a place that seemed rooted to something more than the stucco facades of 1980’s LA strip malls and the plethora of people only one generation deep who migrated alone there for fame or fortune—wanted old cobblestone streets and crumbly brick buildings and plaques depicting moments I had read about in history books. Wanted families who collected their lineage through grandfather clocks and creaky homes they passed down for generations. "

	// Above is the fourth passage.
	gTextArray[4][0] = 
	gTextArray[4][1] = " My mother’s been married two times before my father. She tells me she never loved him but when you’re pushing forty you’ve got limited options for making babies. She saw him on Venice Beach playing volleyball with a team of displaced vets—mostly vietnam—and thought, that’ll do. You don’t even look like you’re mine, she tells me."
	// Above is the fifth passage.
	gTextArray[5][0] = 
	gTextArray[5][1] = " When I turn twenty-eight, I buy myself a DNA test. One of those where you swab the inside of your mouth with a piece of cotton and send it off in the mail. It takes three months to get back the results. 50% German. More german than the average modern german, who has mixed with other nordic and eastern races and now is only 36% of their original genetic race. Legs like tree trunks, my mother always says, the whole lot of you. "
	
	// Above is the sixth passage.
	gTextArray[6][0] = 
	gTextArray[6][1] = " The rest of the DNA results were a smattering of other things. 25% Polish Jew, 13% Norwegian, 7% Scandinavian, Less than 2% of… I call my mother to tell her one of her birth parents must be Jewish. I’m done with that wild goose chase, she tells me. All I wanted in the world was someone who looked like me and you came out all Moeck.  "

	
	// Above is the seventh passage.
	gTextArray[7][0] = 
	gTextArray[7][1] = " When my mother decides to downsize to a smaller place with a view, I fly back west to help her pack. I arrive at a house that has already been painted and cleaned, all her boxes packed and stacked down in the garage. It was easier to just pay a company to do it, she tells me. There was so much junk I gave half of it away, she says, Goodwill took two truckfuls. I feel relieved. The whole plane ride a growing uneasiness had been building inside me about returning. About the few seconds you have to spend with each object as you wrap it and put it in a box. We sleep the next two nights on a king-sized air mattress in the bare living room, then we watch the movers load the boxes into a truck and we follow them up the freeway. "

	// Above is the eigth passage.
	gTextArray[8][0] = 
	gTextArray[8][1] = " My mother posts pictures of her new condo on Facebook. I could spend the rest of my life doing nothing but looking at my view! The picture is taken from her living room, I recognise the trinkets on her wooden coffee table on which she props her socked feet. The rest of the image is taken up by a massive plate glass window, behind which a steep hill drops down to meet the ocean. A few cypress trees frame the bottom edge of the view. "

	// Above is the ninth passage.
	gTextArray[9][0] = 
	gTextArray[9][1] = " The DNA test comes with a one-month free trial of the company’s ancestry online database. That first month, I spend many nights awake in front of my computer researching names to connect to my digital family tree. Only the German side yields results. Cross references from global city archives, census reports, marriage and death certificates, draft letters, even ancient cruise ship logs. I find my grandfather’s WWII draft registration. His father’s birth certificate. David. My father’s middle name. More uploads from strangers who might be cousins. One woman by the name of Susan Moeck posts pictures of family gravestones in Wisconsin covered in snow. On my computer, I scroll through the images hoping to find my grandfather’s name. "

	// Above is the tenth passage.
	gTextArray[10][0] = 
	gTextArray[10][1] = " One day I get an email through the DNA website from Canada. A 25% genetic match with a sixty-five year old man in Vancouver. A Genetic Uncle and he sends me a photo of himself that looks just like my mother. I’ve been looking for my family forever, he says. Through this DNA test I found you, my niece, and another half brother. After immediately paying for a year’s subscription to the site’s Canadian records, I call my mom and tell her, but she doesn’t want to see the picture. I email the man back saying that my mother needs time to absorb this before she’s ready, but that I would love to stay in touch. An uncle. As I type that first email to him I find it strange my cheeks are wet. He sends three more emails over the course of a week that I let pile up unread in my inbox. "

	// Above is the eleventh passage.
	gTextArray[11][0] = 
	gTextArray[11][1] = " Today, I sit at my kitchen table in my tiny apartment eating my breakfast of yogurt and fresh blueberries with honey and flipping through a recent magazine that came in the mail and it slowly occurs to me a smoke alarm is going off somewhere in the building. It is soft at first, so I didn’t hear it as my mind is focused on the material I’m reading, but like everything it wiggles itself in. I sit there half listening to the beeping, now fully aware of its presence but also still trying to keep my eyes with the text on the page. Smoke alarms are sensitive in these old buildings. I learned long ago to not give them much mind. But somewhere in my half conscious thought I envision for a moment that the fire is real and smoke is seeping under my door. I imagine myself standing up—see it in my mind as if I am actually doing it—putting my cat in his carrier, looking around and not seeing anything else I couldn’t lose, heading downstairs. Then the part of me that is still sitting in the kitchen, reading words on a page, continues to eat her breakfast. "

	// Above is the twelth passage.
	gTextArray[12][0] = 
	gTextArray[12][1] = " You know you're my best friend, she frequently tells me. And I always make sure to smile."

	
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
