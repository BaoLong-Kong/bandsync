import tactJs from 'tact-js';

const btn_test = document.getElementById("test");
const btn_multitest = document.getElementById("multitest");
const inp_songtest = document.getElementById("song-upload");
const inp_audiotest = document.getElementById("audio-upload");
const aud_player = document.getElementById("player");
const btn_songtest = document.getElementById("songtest");

var key = 'dot';
var position = 'ForearmL';
var points = [
  {
    index: 0,
    intensity: 50
  },
  {
    index: 1,
    intensity: 50
  },
  {
    index: 2,
    intensity: 50
  }
];
var durationMillis = 200;

var tempo;
var beat;
var instrument1Ins;
var instrument1Outs;
var instrument2Ins;
var instrument2Outs;

tactJs.addListener(function(msg) {
    if (msg.status === 'Connected') {
      // console.log('connected');
    } else if (msg.status === 'Disconnected') {
  
    } else if (msg.status === 'Connecting') {
      // 
    }
});

btn_test.addEventListener("click", test);
btn_multitest.addEventListener("click", multitest);

//errorcodes: 0 - success, 2 - connection not established
function test() {
  console.log(tactJs.submitDot(key, position, points, durationMillis));
}

function multitest() {
  // for (var i = 0; i < 3; i++) {
  //   setTimeout(() => {console.log(tactJs.submitDot(key, position, points, durationMillis))}, 1000);
  // }
  var interval = setInterval(() => {console.log(tactJs.submitDot(key, position, points, durationMillis))}, 1000);
  setTimeout(() => {clearInterval(interval)}, 4000);
}

inp_songtest.addEventListener("change", function() {
  var reader = new FileReader();

  reader.addEventListener('load', function() {
    var result = JSON.parse(reader.result);
    tempo = result.tempo;
    beat = result.beat;
    instrument1Ins = result.instruments[0].ins;
    instrument2Ins = result.instruments[1].ins;
    instrument1Outs = result.instruments[0].ins;
    instrument2Outs = result.instruments[1].ins;

    console.log(result);
    console.log(beat);
    console.log(instrument1Ins);
  });

  reader.readAsText(inp_songtest.files[0]);
})

inp_audiotest.addEventListener("change", audiotest);

function audiotest({
  target
}) {
  // Make sure we have files to use
  if (!target.files.length) return;

  // Create a blob that we can use as an src for our audio element
  const urlObj = URL.createObjectURL(target.files[0]);

  // Clean up the URL Object after we are done with it
  aud_player.addEventListener("load", () => {
    URL.revokeObjectURL(urlObj);
  });

  // Allow us to control the audio
  aud_player.controls = "true";

  // Set the src and start loading the audio from the file
  aud_player.src = urlObj;
}

btn_songtest.addEventListener("click", songtest);

function songtest() {
  setInterval(() => {aud_player.play()}, 4000);
}