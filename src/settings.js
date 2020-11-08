// import tactJs from 'tact-js';

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
var bps;
var instrument1Ins;
var instrument1Outs;
var instrument2Ins;
var instrument2Outs;

// tactJs.addListener(function(msg) {
//     if (msg.status === 'Connected') {
//       // console.log('connected');
//     } else if (msg.status === 'Disconnected') {
  
//     } else if (msg.status === 'Connecting') {
//       // 
//     }
// });

btn_test.addEventListener("click", test);
btn_multitest.addEventListener("click", multitest);

//errorcodes: 0 - success, 2 - connection not established
// function test() {
//   console.log(tactJs.submitDot(key, position, points, durationMillis));
// }

// function multitest() {
//   var interval = setInterval(() => {console.log(tactJs.submitDot(key, position, points, durationMillis))}, 1000);
//   setTimeout(() => {clearInterval(interval)}, 4000);
// }

inp_songtest.addEventListener("change", function() {
  var reader = new FileReader();

  reader.addEventListener('load', function() {
    var result = JSON.parse(reader.result);
    tempo = result.tempo;
    beat = result.beat;
    bps = 60 / tempo;
    instrument1Ins = calculatecounts(result.instruments[0].ins);
    instrument2Ins = calculatecounts(result.instruments[1].ins);
    instrument1Outs = calculatecounts(result.instruments[0].outs);
    instrument2Outs = calculatecounts(result.instruments[1].outs);

    console.log(result);
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
  for (let i = 0; i < instrument1Ins.length; i++) {
    setTimeout(() => {countin_out()}, instrument1Ins[i])
  }
  for (let i = 0; i < instrument1Outs.length; i++) {
    setTimeout(() => {countin_out()}, instrument1Outs[i])
  }
  for (let i = 0; i < instrument2Ins.length; i++) {
    setTimeout(() => {countin_out()}, instrument2Ins[i])
  }
  for (let i = 0; i < instrument2Outs.length; i++) {
    setTimeout(() => {countin_out()}, instrument2Outs[i])
  }
  setTimeout(() => {startsong()}, (bps * beat[0]));
}

function startsong() {
  aud_player.play();
}

function calculatecounts(ins_outs) {
  var timings = new Array(ins_outs.length);
  for (let i = 0; i < ins_outs.length; i++) {
    timings[i] = calculatecountms(ins_outs[i]);
  }
  return timings;
}

function calculatecountms(in_out) {
  in_out[0] -= 2;
  return ((in_out[0] * beat[0] * bps + (--in_out[1] * bps) - bps) * 1000);
}

function countin_out() {
  // var interval = setInterval(() => {console.log(tactJs.submitDot(key, position, points, durationMillis))}, (bps * 1000));
  var interval = setInterval(() => {console.log("Beat")}, (bps * 1000));
  setTimeout(() => {clearInterval(interval)}, ((bps * 1000) * beat[0]));
}