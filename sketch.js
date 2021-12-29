
var accordatura = new Array();
var is_major = true;
var notes = new Array();
var note_velocity = new Array();
var note_duration = new Array();
var steps =0;
var is_loop = false;
var instrument_linked = true;

var tonalita = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let sequence;
let polySynth;
let analyzer;

var resonance = new Array();
var frequencyFilter = new Array();
var context;
var chords= new Array();
var Mchord = [4,7];
var mchord = [3,7];
var dimichord = [3,7];
var startChord=0;

var soft_consonant=0;
var hard_consonant=0;
var vocals=0;
var labiali=0;
var dentali = 0;
var linguali = 0;
var gutturali = 0;
var nasali = 0;
var sibilanti = 0;
var total_letters=0;
var scala = 0;
var fondamentale = 60;
var progression = [0, 2, 4, 5, 7, 9, 11];
var notes_length=0;
var ms=200;
var textout = new Array();
var is_pause = 0;
var counter = 0;
var wp =0;
 var type = new Array();
var bpm=0;
var is_playing=0;

let   w = window.innerWidth;// document.getElementById("wrapper").offsetWidth;
let  h = window.innerHeight;//document.getElementById("wrapper").offsetHeight;
var numTimeSteps = 32;
var timeStepCounter = 0;
var sloop;
var synth;
var text_to_save;
var index = 0;
var released = true;
var maximum = 0;
var att=0;
var dec=0;
var sus = 0;
var rel = 0;
var presentation = true;
var textPresentation = "Hello! Mi chiamo Daphne, sono stata programmata per parlare. Beh, non proprio parlare... Traduco in melodia le parole che ricevo. Prova anche tu"

var canvaW = 0;
var canvaH = 0;
let reverb;
var cookie_name;
window.addEventListener('load', (event) => {
  //setCookie(cookie_name, "disabled", -1);
  w = w*60/100;

  h = h*60/100;

 canvaW = w*90/100;
 canvaH = h*60/100;

});

window.addEventListener('reload', (event) => {
  //setCookie(cookie_name, "disabled", -1);
  //location.reload(true);

});
function setup()
{
//  createMetaTag();



  let cnv = createCanvas(canvaW, canvaH);


    // cnv.mousePressed(playSound);
    cnv.parent("wrapper");
/*    saveTextButton = createButton('createMelody');
    saveTextButton.parent("userinteraction");
  saveTextButton.mousePressed(saveText);
  saveTextButton.size(w/4, controlPanelHeight);

  playPauseButton = createButton('PLAY/PAUSE');
  playPauseButton.parent("userinteraction");
  playPauseButton.mousePressed(togglePlayPause);
  playPauseButton.size(w/4, controlPanelHeight);
*/

    //var s = new DetunedOsc();
    sloop =  new p5.SoundLoop(soundLoop, "16n");
    synth = new PolySynth(8, DetunedOsc);
    analyzer = new p5.FFT();
  //  reverb = new p5.Reverb();
    //reverb.process(synth, 3, 20);
    textPresentation = "Hello! Mi chiamo Daphne, sono stata programmata per parlare. Beh, non proprio parlare... Traduco in melodia le parole che ricevo. Prova anche tu";
    textPresentation = "Hello! ";

}

function draw() {
  background(0);

  // map mouseY to modulator freq between a maximum and minimum frequency
//  fill(color(175,100,220));
//  rect(59,59,399,399);
  // analyze the waveform
//  reverb.drywet(0.5);
 waveform = analyzer.waveform();

  // draw the shape of the waveform
  stroke(255);
  strokeWeight(1);
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, -height / 4, height / 4);
    vertex(x, y + height / 2);
  }
  endShape();

  strokeWeight(1);
  // add a note about what's happening



}
function createMetaTag() {
  let meta = createElement('meta');
  meta.attribute('name', 'viewport');
  meta.attribute('content', 'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height');

  let head = select('head');
  meta.parent(head);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

window.setInterval(function() {
  var elem = document.getElementById('testouscita');
  elem.scrollTop = elem.scrollHeight;
}, 500);


function startpresentation()
{
  document.getElementById("f").style.visibility = "hidden";
  document.getElementById("f").style.animation="fadeOut 0.5s linear1 forwards";

  document.getElementById("r").style.visibility = "visible";
  document.getElementById("r").style.animation="fadeIn 1s linear 1 forwards";
  //document.getElementById("r").style.animation="fadeIn2 4s linear";

  getAudioContext().resume();
  setTimeout(function(){
   //your code here
   textFunction();
   userStartAudio();
   sloop.start()
  }, 3000);
}
function tryDaphne()
{
    saveText();
    setTimeout(function(){
     //your code here
userStartAudio();
     sloop.start()
   }, 1500);
}
function windowResized() {
  w = document.getElementById("wrapper").offsetWidth;
  h = document.getElementById("wrapper").offsetHeight;
  resizeCanvas(w*90/100, h*60/100);
}
function reset()
{
  document.getElementById("testouscita").innerHTML="";
  sloop =  new p5.SoundLoop(soundLoop, "16n");
  synth = new PolySynth(8, DetunedOsc);
  index = 0;
   textout=[];
 maximum = 0;
 tonalita = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
 type = [];
 soft_consonant=0;
 hard_consonant=0;
 chords=[];
startChord=0;
 vocals=0;
labiali=0;
dentali = 0;
linguali = 0;
gutturali = 0;
nasali = 0;
sibilanti = 0;
 total_letters=0;
 notes = [];
 note_velocity=[];
 note_duration=[];
 resonance = [];
 frequencyFilter = [];
 word = [];  notes_length=0;
fondamentale = 60;
is_major = true;
steps=0;
   wp=0;
   att=0;
   dec=0;
   sus = 0;
   rel = 0;
}
function textFunction()
{
  reset();
  var t="";
  if(presentation)
  {
    t = textPresentation;

  }
  else {
       t = text_to_save;
  }


  var x;
  if(t==null)
  {
    acc_found = false;
    accordatura = new Array();
  }
  else
  {
    total_letters=t.length;
    for(x=0;x<t.length;x++)
    {
      if (t.charCodeAt(x)!=null && t.charCodeAt(x)!=127)
      {
        searchScale(t.charCodeAt(x));
        textout.push(String.fromCharCode(t.charCodeAt(x)));
      }
    }
    for(var i=0; i<tonalita.length-1; i++)
        {
          console.log(tonalita[i]);
	       if(tonalita[maximum] > tonalita[i+1])
	       {
		      maximum = maximum;
           }
           else
           {
	          maximum = i+1;
           }
        }
        fondamentale += maximum;



    searchMajor(total_letters);
    for(x=0;x<t.length;x++)
    {
      if (t.charCodeAt(x)!=null && t.charCodeAt(x)!=127)
      {
        convertToScale(t.charCodeAt(x));
      }
    }

     bpmCreator();
  }
  ready = true;
console.log(fondamentale);
console.log(scala);
console.log(total_letters.toString());

}
function bpmCreator()
{

	 if(steps==0)
	 {
		steps=1;
    }

    {
	  bpm = total_letters/steps*30;//steps/total_letters*500;
    }

sloop.bpm = bpm*2;
}
function searchMajor(t)
{
	try{

		if(t%2==0)
		{
         is_major= true; a = 0;
         }
	    else if(t%3==0)
        {
           is_major= false; a = 1;
        }
        else if(t%5==0)
        {
	       a=2; //pentatonica maggiore
        }
        else if(t%7==0)
        {
	       a=3; //pentatonica minore
        }
        else if(t%11==0)
        {
	       a=4; //aumentata
        }
        else if(t%13==0)
        {
	       a=5; //diminuita 1
        }
        else if(t%17==0)
        {
	       a=6; //diminuita 2
        }
        else if(t%19==0)
        {
	       a=7; //alternata
        }
        else if(t%23==0)
        {
	       a=8; //enigmatica
        }
         else if(t%29==0)
        {
	       a=9; //bebop dominante
        }
          else if(t%31==0)
        {
	       a=10; //bebop maggiore
        }
          else if(t%37==0)
        {
	       a=11; //araba
        }
        else a =0; //maggiore

       }catch(e){}
       scala = a;
}
function searchScale(t)
{
	var x = t;


	if (x==65||x==97||x==109||x==77)
	{
    if(x==65||x==97)
    {
        tonalita[0] +=0.2;
    }
    else {
      tonalita[0] +=1;
    }
  }
    else if (x==66||x == 98 || x == 110||x==78)
    {tonalita[1] +=1;}
	 else if (x==67||x == 99 || x == 111||x==79)
            {
              if(x==79||x==111)
              {
                  tonalita[2] +=0.2;
              }
              else {
                tonalita[2] +=1;
              }

            }
            else if (x==68||x == 100 || x == 112||x==80)
            {
              tonalita[3] +=1;
            }
            else if (x==69||x == 101 || x == 113||x==81)
            {
              if(x==69||x==101)
              {
                  tonalita[4] +=0.2;
              }
              else {
                tonalita[4] +=1;
              }

            }
            else if (x==70||x == 102 || x == 114||x==82)
            {
              tonalita[5] +=1;
            }
            else if (x==71||x == 103 || x == 115||x==83)
            {
               tonalita[6] +=1;
            }
            else if (x==72||x == 104 || x == 116||x==84)
            {
               tonalita[7] +=1;
            }
            else if (x==73||x == 105 || x == 117||x==85)
            {
              tonalita[8] +=0.2;

            }
            else if (x==74||x == 106 || x == 118||x==86)
            {
              tonalita[9] +=1;
            }
            else if (x==75||x == 107 || x == 119||x==87)
            {
             tonalita[10] +=1;
            }
            else if (x==76||x == 108 || x == 120||x==88)
            {
              tonalita[11] +=1;
            }



}
function convertToScale(x)
{

  var start_posn=97;
  var octave = 0;

  if(x>=97)
  {
     if(x-start_posn<7)
     {octave = 0;}
     else if( 7<= x-start_posn && x-start_posn < 14)
     {octave = -36;start_posn=103;}
     else if(14<= x-start_posn && x-start_posn < 21)
     {octave = -24;start_posn= 111;}
     else if(21<= x-start_posn && x-start_posn < 28)
     {octave = -12;start_posn=118}
     else {octave = -0;start_posn=126}
     if(x-start_posn>=7) start_posn= x;

     if(x==97||x==101||x==105||x==106||x==111||x==117||x==121)//vocals
     {
       note_duration.push(600);
       note_velocity.push(90);
       resonance.push(0); frequencyFilter.push(5);
       type.push(1);
       vocals++;
     }
     else if(x==98||x==99||x==100||x==103||x==112||x==116||x==118)//soft_consonant
     {
       note_duration.push(370);
       note_velocity.push(120);
       if(x==98||x==112)
       {labiali++; resonance.push(20); frequencyFilter.push(-8); type.push(1.5);}
	   else if(x==100||x==116)
	   {dentali++;resonance.push(20); frequencyFilter.push(-8); type.push(1.5);}
		else if(x==99||x==103)
	   {gutturali++;resonance.push(80); frequencyFilter.push(-10); type.push(3);}
				else
	   {sibilanti++;resonance.push(100); frequencyFilter.push(-15);type.push(1);}
       soft_consonant++;
     }
     else//hard_consonant
     {
       note_duration.push(220);
       note_velocity.push(110);
       if(x==120)
       {dentali++;resonance.push(20); frequencyFilter.push(-8); type.push(1.5);}
	   else if(x==114||x==108)
	   {linguali++; resonance.push(40); frequencyFilter.push(-5);type.push(3);}
		else if(x==113||x==107)
	   {gutturali++;resonance.push(80); frequencyFilter.push(-10);type.push(3);}
		else if(x==109||x==110)
	   {nasali++;resonance.push(10); frequencyFilter.push(-12);type.push(2);}
				else
	   {sibilanti++; resonance.push(100); frequencyFilter.push(-15);type.push(1);}
       hard_consonant++;
     }

     notes.push(progression[x-start_posn]+fondamentale+octave);
     if(is_major)
     {
	   if(progression[x-start_posn]==0 ||progression[x-start_posn]==3 ||progression[x-start_posn]==4)
     {
	    chords.push(0);
     }
     else if(progression[x-start_posn]==6)
     {
	   chords.push(2);
     }
     else
     {
	   chords.push(1);
     }
     }
     else
     {
	   if(progression[x-start_posn]==0 ||progression[x-start_posn]==3 ||progression[x-start_posn]==4)
     {
	    chords.push(1);
     }
     else if(progression[x-start_posn]==1)
     {
	   chords.push(2);
     }
     else
     {
	   chords.push(0);
     }
     }

     //post(progression[x-start_posn]+fondamentale+octave);
    //outlet(0,progression[x-start_posn]+fondamentale+octave);

  }
  else if(x>=65 && x<=90)
  {
     start_posn = 65;
     if(x-start_posn<7)
     {octave = 0;}
     else if( 7<= x-start_posn && x-start_posn < 14)
     {octave = -24;start_posn=72;}
     else if(14<= x-start_posn && x-start_posn < 21)
     {octave = -12;start_posn= 80;}
     else if(21<= x-start_posn && x-start_posn < 28)
     {octave = 0;start_posn=88}
     else {octave = -12;start_posn=90}
     if(x-start_posn>=7) start_posn= x;

     if(x==65||x==69||x==74||x==85||x==89)//vocals
     {
       note_duration.push(600);
       note_velocity.push(90);
       resonance.push(0); frequencyFilter.push(5);
       type.push(1);
       vocals++;
     }
     else if(x==66||x==67||x==68||x==71||x==80||x==84||x==86)//soft_consonant
     {
       note_duration.push(380);
       note_velocity.push(110);
       if(x==66||x==80)
       {labiali++; resonance.push(20); frequencyFilter.push(-8); type.push(1.5);}
	   else if(x==68||x==84)
	    {dentali++;resonance.push(20); frequencyFilter.push(-8); type.push(1.5);}
			else if(x==67||x==71)
	  {gutturali++;resonance.push(80); frequencyFilter.push(-10);type.push(3);}
				else
	    {sibilanti++; resonance.push(100); frequencyFilter.push(-15);type.push(1);}
       soft_consonant++;
     }
     else//hard_consonant
     {
       note_duration.push(220);
       note_velocity.push(120);
       if(x==88)
        {dentali++;resonance.push(20); frequencyFilter.push(-8); type.push(1.5);}
	   else if(x==82||x==76)
	   {linguali++;resonance.push(40); frequencyFilter.push(-5);type.push(3);}
			else if(x==81||x==75)
	  {gutturali++;resonance.push(80); frequencyFilter.push(-10);type.push(3);}
		else if(x==77||x==78)
	    {nasali++;resonance.push(10); frequencyFilter.push(-12);type.push(2);}
			else
	   {sibilanti++; resonance.push(100); frequencyFilter.push(-150);type.push(1);}
       hard_consonant++;
     }

     notes.push(progression[x-start_posn]+fondamentale+octave);
     //post(progression[x-start_posn]+fondamentale+octave);
    //outlet(0,progression[x-start_posn]+fondamentale+octave);

    if(is_major)
     {
	   if(progression[x-start_posn]==0 ||progression[x-start_posn]==3 ||progression[x-start_posn]==4)
     {
	    chords.push(0);
     }
     else if(progression[x-start_posn]==6)
     {
	   chords.push(2);
     }
     else
     {
	   chords.push(1);
     }
     }
     else
     {
	   if(progression[x-start_posn]==0 ||progression[x-start_posn]==3 ||progression[x-start_posn]==4)
     {
	    chords.push(1);
     }
     else if(progression[x-start_posn]==1)
     {
	   chords.push(2);
     }
     else
     {
	   chords.push(0);
     }
     }
  }
  else
{

	steps++;
      notes.push(2000);
      note_velocity.push(0);
      note_duration.push(1000);
      resonance.push(0); frequencyFilter.push(0);
      type.push(1);
      chords.push(0);



}

notes_length = notes.length;
}
function getADSR()
{
	var result=0;
	var v = vocals;
	var SC = soft_consonant;
	var HC = hard_consonant;
	/*outlet(4, (v*2-linguali/2-nasali/2-dentali-labiali-sibilanti*2)/total_letters*200);
	outlet(5,(v*2-linguali/2-nasali-dentali/2-labiali/2-sibilanti*3)/total_letters*200);
	outlet(6,(v*2-linguali/2-nasali*2-dentali/4-labiali/4-sibilanti*3)/total_letters*200);
	outlet(7,(v*2-linguali-nasali-dentali/2-labiali/2-sibilanti*3)/total_letters*200);
*/
att=(v*2-linguali/2-nasali/2-dentali-labiali-sibilanti*2)/total_letters*200;
dec = (v*2-linguali/2-nasali-dentali/2-labiali/2-sibilanti*3)/total_letters*200;
sus = (v*2-linguali/2-nasali*2-dentali/4-labiali/4-sibilanti*3)/total_letters*200;
rel = (v*2-linguali-nasali-dentali/2-labiali/2-sibilanti*3)/total_letters*200;
}

function get_percentage()
{
	var vocals_percentage=0;
	var hard_consonant_percentage=0;
	var soft_consonant_percentage=0;

  if(total_letters!=0)
  {
    vocals_percentage = vocals/total_letters*127;
    hard_consonant_percentage = hard_consonant/total_letters*127;
    soft_consonant_percentage = soft_consonant/total_letters*127;
  }
  else {
    vocals_percentage=43;
    hard_consonant_percentage=43;
    soft_consonant_percentage=43;
  }
    /* outlet(1,vocals_percentage);
     outlet(2,soft_consonant_percentage);
     outlet(3,hard_consonant_percentage);*/
}
function fondamental(a)
{
   if(a!=null)
   {
     fondamentale = a+60;
   }
   else fondamentale = fondamentale;
}

function major(a)
{
  if(a!=null)
  {
    if(a==0)
    {
       is_major=true;progression = [0, 2, 4, 5, 7, 9, 11];
    }
    else if(a==1)
    {
      is_major=false;progression = [0,2,3,5,7,8,11];
    }
    else if(a==2)
    {
      is_major=false;progression = [0,2,4,7,9,12,14];
    }
    else if(a==3)
    {
      is_major=false;progression = [0,3,5,7,10,12,15];
    }
    else if(a==4)
    {
      is_major=false;progression = [0,3,4,6,8,11,12];
    }
    else if(a==5)
    {
      is_major=false;progression = [0,2,3,5,6,8,9];
    }
    else if(a==6)
    {
      is_major=false;progression = [0,1,3,4,6,7,9];
    }
    else if(a==7)
    {
      is_major=false;progression = [0,2,3,5,6,8,9];
    }
    else if(a==8)
    {
      is_major=false;progression = [0,2,4,6,8,10,13];
    }
    else if(a==9)
    {
      is_major=false;progression = [0,2,4,5,7,8,10];
    }
    else if(a==10)
    {
      is_major=false;progression = [0,2,4,5,7,8,9];
    }
     else if(a==11)
    {
      is_major=false;progression = [0,1,4,5,7,8,11];
    }

  }

}


//var cycleStartTime=0;

function soundLoop(cycleStartTime) {
  if(notes.length != 0){
    //life();
    get_percentage();
   //getADSR();
  //synth.setAdsr(resonance[index]/200+att/200,resonance[index]/200+dec/200,resonance[index]/200+sus/200,resonance[index]/200+rel/200);
  synth.setAdsr(0.001,0.1,0.2, 0.5);
  var d = int(random(1,12));
   synth.setParams([d,1,5]);
//  for (var i=0; i<notes.length; i++) {

      //cells[i].active = true;
      if (notes[index]!=2000) {
        // Play sound
        var velocity = note_velocity[index]/127; // Between 0-1
        var quaverSeconds =note_duration[index]/2000; // 8th note = quaver duration
        //
        var freq1 = midiToFreq(notes[index]);
       var freq=  Number(freq1.toFixed(2))*2;

        synth.setNote(freq);
        synth.play(freq,velocity, cycleStartTime, "16n");

      }
      else {
        var velocity = note_velocity[index]/127; // Between 0-1
        var quaverSeconds = note_duration[index]; // 8th note = quaver duration
        var freq1 = midiToFreq(notes[index].toFixed(2));
        var freq=  Number(freq1.toFixed(2));
        synth.setNote(0);
        synth.play(0, 0, cycleStartTime, "16n");
      }

//  }
//  sloop.stop();
  this.interval = "16n";//quaverSeconds/8;
  this.bpm = bpm;

//  timeStepCounter=(timeStepCounter + 1) % numTimeSteps;
   putText(index);
   index++;
  if (index >= notes.length) {
    synth.stop();
    this.stop(); // Stop the SoundLoop if we've reached the end of the song
    index=0;
    if(presentation)
    {
    //  pageScroll();
      document.getElementById("userinteraction").style.visibility = "visible";
      setVisibilityToLower();
        presentation = false;
    }
  }

}
}
function setVisibilityToLower()
{
  document.getElementById("userinteraction").style.animation="fadeIn 4s linear 1s 1 forwards";


}
function pageScroll() {
    window.scrollBy(0,1000);
    //scrolldelay = setTimeout(pageScroll,2);
}
//Here we generate the sequencer.
function putText(index)
{
  document.getElementById("testouscita").innerHTML += textout[index];
}
function saveText(){
text_to_save=document.getElementById('inDaphne').value;
localStorage.setItem("text", text_to_save); // save the item

textFunction();

}
function togglePlayPause() {
  if (sloop.isPlaying) {
    sloop.stop();
  } else {
    userStartAudio();
    sloop.start();
  }
}
function AudioVoice () {

  this.osctype = 'sine';
  this.volume= 0.33;
  this.note = 60;

  this.attack = 0.25;
  this.decay=0.25;
  this.sustain=0.95;
  this.release=0.25;
  this.env = new p5.Envelope(this.attack,this.volume, this.decay,this.volume,  this.sustain, this.volume,this.release);

  this.filter = new p5.LowPass();
  this.filter.set(22050, 5);

  this.env.connect(this.filter);

}

AudioVoice.prototype.voicePlay = function (){
  this.env.play(this.filter);
}
AudioVoice.prototype.stop = function (){

}
AudioVoice.prototype.attackPlay = function (){
  this.env.triggerAttack(this.oscillator);
}

AudioVoice.prototype.releasePlay = function (){
  this.env.triggerRelease(this.oscillator);
}

AudioVoice.prototype.setNote = function(){

}

AudioVoice.prototype.setParams = function(params){

}


AudioVoice.prototype.setAdsr = function (a,d,s,r){
  this.attack = a;
  this.decay=d;
  this.sustain=s;
  this.release=r;
  this.env = new p5.Env(this.attack, this.decay,  this.sustain, this.release);
  this.env.play(this.filter);
}

function PolySynth(num,synthVoice){
  this.voices = [];
  this.num_voices = num;
  this.poly_counter=0;

  this.allocateVoices(synthVoice);
}

PolySynth.prototype.allocateVoices = function(synthVoice){
  for (var i = 0 ; i < this.num_voices ; i++){
       this.voices.push(new synthVoice());
  }
}

PolySynth.prototype.play = function (){
    this.voices[this.poly_counter].voicePlay();
    this.poly_counter += 1;
    this.poly_counter = this.poly_counter % this.num_voices;
}
PolySynth.prototype.stop = function (){
    this.voices[this.poly_counter].stop();

}
PolySynth.prototype.setAdsr = function (a,d,s,r){
  this.voices[this.poly_counter].setAdsr(a,d,s,r);
}

PolySynth.prototype.setNote = function (note){
  this.voices[this.poly_counter].setNote(note);
}

PolySynth.prototype.setParams = function (params){
  this.voices[this.poly_counter].setParams(params);
}
function DetunedOsc(){

  AudioVoice.call(this);

  this.osctype = 'square';
  this.detune = 5;

  this.oscOne = new p5.Oscillator(midiToFreq(this.note),this.osctype);
  this.oscTwo = new p5.Oscillator(midiToFreq(this.note),'sine');
  this.oscOne.disconnect();
  this.oscTwo.disconnect();
  this.oscOne.start();
  this.oscTwo.start();

  this.oscOne.connect(this.filter);
  //this.oscTwo.connect(this.filter);

  this.setNote = function(note){
      this.oscOne.freq(note);
      this.oscTwo.freq(note/4);
      this.oscOne.freq(this.oscTwo);
  }

  this.setParams = function(params){

      this.detune = params[0];

  }
  this.stop = function(){
    console.log("ci sono");
    this.oscOne.stop();
    this.oscTwo.stop();
  }
}

DetunedOsc.prototype = Object.create(AudioVoice.prototype);
DetunedOsc.prototype.constructor = DetunedOsc;
