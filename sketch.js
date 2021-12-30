

var steps =0;
let analyzer;

var total_letters=0;
var scala = 0;

var textout = new Array();
var bpm=0;


let   w = window.innerWidth;// document.getElementById("wrapper").offsetWidth;
let  h = window.innerHeight;//document.getElementById("wrapper").offsetHeight;
var numTimeSteps = 32;
var timeStepCounter = 0;
var sloop;
var synth;
var text_to_save;
var index = 0;


var presentation = 0;


var canvaW = 0;
var canvaH = 0;
var notes = new Array();
var note_velocity = new Array();
var note_duration = new Array();
var i=0;
var txt="Prima di iniziare, alza il volume del tuo dispositivo";
//window.location.href='https://google.com';
window.addEventListener('load', (event) => {

  w = w*60/100;

  h = h*60/100;

 canvaW = w*90/100;
 canvaH = h*60/100;
 //typeWriter();

});
function typeWriter() {
  if (i < txt.length) {
    document.getElementById("testoiniziale").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}
function setup()
{

   let cnv = createCanvas(canvaW, canvaH);

    cnv.parent("wrapper");

    sloop =  new p5.SoundLoop(soundLoop, "16n");
    synth = new PolySynth(8, DetunedOsc);
    analyzer = new p5.FFT();







}

function draw() {
  background(0);

 waveform = analyzer.waveform();

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

}
function createMetaTag() {
  let meta = createElement('meta');
  meta.attribute('name', 'viewport');
  meta.attribute('content', 'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height');

  let head = select('head');
  meta.parent(head);
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
  textFunction();
  getAudioContext().resume();

  setTimeout(function(){
   userStartAudio();
  sloop.start();
 }, 2000);
}
function continuepresentation()
{
  textFunction();
  getAudioContext().resume();

  setTimeout(function(){
   userStartAudio();
  sloop.start();
}, 500);
}
function tryDaphne()
{

  document.getElementById("userinteraction2").disabled = true;
    saveText();
    textFunction();
    setTimeout(function(){
     //your code here
    userStartAudio();
      sloop.start();
   }, 500);
}
function windowResized() {
  w = document.getElementById("wrapper").offsetWidth;
  h = document.getElementById("wrapper").offsetHeight;
  resizeCanvas(w*90/100, h*60/100);
}
function reset()
{
  console.log("cambio");
  document.getElementById("testouscita").innerHTML="";

  index = 0;
   textout = new Array();

 total_letters=0;
  notes = new Array();
  note_velocity = new Array();
  note_duration = new Array();



steps=0;

}
function textFunction()
{

  reset();
  var t="";

  if(presentation==0)
  {
    t = "Ciao! Il mio nome è Daphne.";

  }
  else if(presentation==1)
  {
      t = "Traduco le informazioni musicali intrinseche di un testo e genero dei suoni e delle melodie in base a queste.";

  }
  else if(presentation==2)
  {
      t = "Sono stata inventata e realizzata da Lou Nime come strumento artistico utilizzato in fase di composizione del suo ultimo album.";

  }
  else if(presentation==3)
  {
      t = "Il mio nome è ispirato a Daphne Oram, compositrice avanguardista, pioniera della musica elettronica.";

  }
  else if(presentation==4)
  {
      t = "Questa è la mia versione lite adattata per il web, provala anche tu!";

  }
  else {
       t = text_to_save;
  }
  if(t==null)
  {
  }
  else
  {
    total_letters=t.length;

    var fondamentale = 60;
    fondamentale += searchTonalita(t);
  console.log(fondamentale);

  var progression = [0, 2, 4, 5, 7, 9, 11];
  var scala =  searchMajor(total_letters);
  progression = major(scala);
  console.log(progression);

    for(var x=0;x<t.length;x++)
    {
      if (t.charCodeAt(x)!=null && t.charCodeAt(x)!=127)
      {
        convertToScale(t.charCodeAt(x),fondamentale);
      }
    }

     bpmCreator();
  }

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
	  bpm = total_letters/steps*20;//steps/total_letters*500;
    }

sloop.bpm = Math.round(bpm*2);
}
function searchMajor(t)
{
  var a=0;
	try{

		if(t%2==0)
		{
         a = 0;
         }
	    else if(t%3==0)
        {
            a = 1;
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
       return a;
}

function searchTonalita(t)
{
  var a = t;
  var tonalita = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for(j=0;j<a.length;j++)
  {
    if (a.charCodeAt(j)!=null && a.charCodeAt(j)!=127)
    {
      var x = a.charCodeAt(j)
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
      textout.push(String.fromCharCode(a.charCodeAt(j)));
    }
  }
  var maximum = 0;
  for(var j=0; j<tonalita.length-1; j++)
      {

       if(tonalita[maximum] > tonalita[j+1])
       {
        maximum = maximum;
         }
         else
         {
          maximum = j+1;
         }
      }

  return maximum;
}

function convertToScale(x,fondamentale)
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

     }
     else if(x==98||x==99||x==100||x==103||x==112||x==116||x==118)//soft_consonant
     {
       note_duration.push(370);
       note_velocity.push(120);

     }
     else//hard_consonant
     {
       note_duration.push(220);
       note_velocity.push(110);

     }

     notes.push(progression[x-start_posn]+fondamentale+octave);
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

     }
     else if(x==66||x==67||x==68||x==71||x==80||x==84||x==86)//soft_consonant
     {
       note_duration.push(380);
       note_velocity.push(110);

     }
     else//hard_consonant
     {
       note_duration.push(220);
       note_velocity.push(120);

     }

     notes.push(progression[x-start_posn]+fondamentale+octave);
    }
  else
{

	steps++;
      notes.push(2000);
      note_velocity.push(0);
      note_duration.push(1000);


}


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
       progression = [0, 2, 4, 5, 7, 9, 11];
    }
    else if(a==1)
    {
      progression = [0,2,3,5,7,8,11];
    }
    else if(a==2)
    {
      progression = [0,2,4,7,9,12,14];
    }
    else if(a==3)
    {
      progression = [0,3,5,7,10,12,15];
    }
    else if(a==4)
    {
      progression = [0,3,4,6,8,11,12];
    }
    else if(a==5)
    {
      progression = [0,2,3,5,6,8,9];
    }
    else if(a==6)
    {
      progression = [0,1,3,4,6,7,9];
    }
    else if(a==7)
    {
      progression = [0,2,3,5,6,8,9];
    }
    else if(a==8)
    {
      progression = [0,2,4,6,8,10,13];
    }
    else if(a==9)
    {
      progression = [0,2,4,5,7,8,10];
    }
    else if(a==10)
    {
      progression = [0,2,4,5,7,8,9];
    }
     else if(a==11)
    {
      progression = [0,1,4,5,7,8,11];
    }

  }
   return progression;
}

function soundLoop(cycleStartTime) {

  if(notes.length != 0)
  {
    //life();

  synth.setAdsr(0.001,0.1,0.2, 0.5);
  var d = int(random(1,12));
   synth.setParams([d,1,5]);
//  for (var i=0; i<notes.length; i++) {

      //cells[i].active = true;
      if (notes[index]!=2000) {
        // Play sound
      //  var velocity = ; // Between 0-1
        //var quaverSeconds =; // 8th note = quaver duration
        //
      //  var freq1 = midiToFreq(notes[index]);
      // var freq=  Number(freq1.toFixed(2))*2;

        synth.setNote(midiToFreq(notes[index])*2);
        synth.play(midiToFreq(notes[index])*2, note_velocity[index]/127, cycleStartTime,note_duration[index]/20);

      }
      else {
        synth.setNote(0);
        synth.play(0, 0, cycleStartTime, "16n");
      }
  //  this.interval ="16n";// "16n";//quaverSeconds/8;
    this.bpm = Math.round(bpm);

//  timeStepCounter=(timeStepCounter + 1) % numTimeSteps;
   putText(index);
   index++;
    if (index >= notes.length) {
    //synth.stop();

    this.stop(); // Stop the SoundLoop if we've reached the end of the song
    //synth.dispose();
    index=0;
    presentation++;
    document.getElementById("userinteraction2").disabled = false;
    if(presentation==5)
    {
      document.getElementById("userinteraction").style.visibility = "visible";
      setVisibilityToLower();
    }
    else if(presentation<5){
      {
        continuepresentation();
      }
    }
  }

}
}

function skipPresentation()
{
  presentation=5;
  document.getElementById("userinteraction").style.visibility = "visible";
  setVisibilityToLower();
  sloop.stop();
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
AudioVoice.prototype.dispose = function (){

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
  this.env = new p5.Envelope(this.attack, this.decay,  this.sustain, this.release);
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
    console.log("porcogiuda");
    this.poly_counter -= 1;
    this.poly_counter = this.poly_counter % this.num_voices;

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
PolySynth.prototype.dispose = function (){
  console.log("cancello");
  delete this;
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
    this.oscOne.disconnect();
  //  this.oscTwo.disconnect();
  }
  this.dispose = function(){
    delete this;
  }
}

DetunedOsc.prototype = Object.create(AudioVoice.prototype);
DetunedOsc.prototype.constructor = DetunedOsc;
