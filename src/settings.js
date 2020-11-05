import tactJs from 'tact-js';

const btn_test = document.getElementById("test");
const btn_multitest = document.getElementById("multitest");
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
btn_songtest.addEventListener("click", songtest);

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

function songtest() {
  console.log("TEST");
}