import tactJs from 'tact-js';
import "./stylesheet.css";

const inp_songtest = document.getElementById("counter-file");
const inp_audiotest = document.getElementById("music-file");
const aud_player = document.getElementById("player");
const btn_songtest = document.getElementById("start");
const btn_save = document.getElementById("save");

var key = 'dot';
var positionL = 'ForearmL';
var positionR = 'ForearmR';
var points = [
  {
    index: 0,
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

tactJs.addListener(function(msg) {
  if (msg.status === 'Connected') {
    // console.log('connected');
  } else if (msg.status === 'Disconnected') {

  } else if (msg.status === 'Connecting') {
    // 
  }
});

inp_songtest.addEventListener("change", function () {
  var reader = new FileReader();

  reader.addEventListener('load', function () {
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
    console.log(instrument1Outs);
    console.log(instrument2Ins);
    console.log(instrument2Outs)
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

btn_songtest.addEventListener("click", play);

function play() {
  console.log("play");

  if (document.getElementById("music-file").files[0]) {
    var player = document.getElementById('player');
    player.style.display = "block";
    player.play();
  }

  //var metadata = localStorage.getItem(document.getElementById("project_name").innerHTML);
  var metadata = readdata();
  console.log(metadata);

  var result = JSON.parse(metadata);
  tempo = result.tempo;
  beat = result.beat;
  bps = 60 / tempo;
  instrument1Ins = calculatecounts(result.instruments[0].ins);
  instrument2Ins = calculatecounts(result.instruments[1].ins);
  instrument1Outs = calculatecounts(result.instruments[0].outs);
  instrument2Outs = calculatecounts(result.instruments[1].outs);

  //console.log(result);
  //console.log(instrument1Ins);
  //console.log(instrument1Outs);
  //console.log(instrument2Ins);
  //console.log(instrument2Outs)

  songtest();
}

function songtest() {
  for (let i = 0; i < instrument1Ins.length; i++) {
    setTimeout(() => { countin_out(positionL) }, instrument1Ins[i])
  }
  for (let i = 0; i < instrument1Outs.length; i++) {
    setTimeout(() => { countin_out(positionL) }, instrument1Outs[i])
  }
  for (let i = 0; i < instrument2Ins.length; i++) {
    setTimeout(() => { countin_out(positionR) }, instrument2Ins[i])
  }
  for (let i = 0; i < instrument2Outs.length; i++) {
    setTimeout(() => { countin_out(positionR) }, instrument2Outs[i])
  }
  setTimeout(() => { play() }, (bps * beat[0] * 1000));
}

function calculatecounts(ins_outs) {
  var timings = new Array(ins_outs.length);
  for (let i = 0; i < ins_outs.length; i++) {
    timings[i] = calculatecountms(ins_outs[i]);
  }
  return timings;
}

function calculatecountms(in_out) {
  in_out[0]--;
  return ((in_out[0] * beat[0] * bps + (--in_out[1] * bps) - bps) * 1000);
}

function countin_out(position) {
  var interval = setInterval(() => { console.log(tactJs.submitDot(key, position, points, durationMillis)) }, (bps * 1000));
  // var interval = setInterval(() => {console.log("Beat " + position)}, (bps * 1000));
  setTimeout(() => { clearInterval(interval) }, ((bps * 1000) * beat[0]));
}

function readdata() {
  var name = document.getElementById("project_name").innerHTML;
  var tempo = document.getElementById("tempo").value;
  var tact1 = document.getElementById("tact0").value;
  var tact2 = document.getElementById("tact1").value;
  var instrument1 = document.getElementById("instrument1");
  var instrument2 = document.getElementById("instrument2");

  var phases1 = document.getElementById("tab1").querySelectorAll(".phase");
  var phases2 = document.getElementById("tab2").querySelectorAll(".phase");

  var ins1 = [];
  var outs1 = [];
  for (var i = 0; i < phases1.length; i++) {
    ins1.push([parseInt(phases1[i].querySelector("#start_time").value),
    parseInt(phases1[i].querySelector("#start_time2").value)]);
    outs1.push([parseInt(phases1[i].querySelector("#end_time").value),
    parseInt(phases1[i].querySelector("#end_time2").value)]);
  }

  var ins2 = [];
  var outs2 = [];
  for (var i = 0; i < phases2.length; i++) {
    ins2.push([parseInt(phases2[i].querySelector("#start_time").value),
    parseInt(phases2[i].querySelector("#start_time2").value)]);
    outs2.push([parseInt(phases2[i].querySelector("#end_time").value),
    parseInt(phases2[i].querySelector("#end_time2").value)]);
  }

  var json = {
    "track_name": name,
    "track_artist": "",
    "length": "",
    "tempo": parseInt(tempo),
    "beat": [parseInt(tact1), parseInt(tact2)],
    "key": "",
    "instruments": [
      {
        "insturment_id": 1,
        "insturment_description": instrument1.innerHTML,
        "ins": ins1,
        "outs": outs1
      },
      {
        "insturment_id": 2,
        "insturment_description": instrument2.innerHTML,
        "ins": ins2,
        "outs": outs2
      }
    ]
  }
  console.log(json);
  var jsonString = JSON.stringify(json);
  return jsonString;
}

btn_save.addEventListener("click", save);

function save() {
  name=document.getElementById("project_name").innerHTML;
  var jsonString = readdata();
  localStorage.setItem(name, jsonString);
  console.log("saved");
}
