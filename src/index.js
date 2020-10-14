import tactJs from 'tact-js';

const btn_test = document.getElementById("test");
var key = 'dot';
var position = 'ForearmL';
var points = [
  {
    index: 0,
    intensity: 100
  },
  {
    index: 1,
    intensity: 100
  },
  {
    index: 2,
    intensity: 100
  }
];
var durationMillis = 1000;

tactJs.addListener(function(msg) {
    if (msg.status === 'Connected') {
      // console.log('connected');
    } else if (msg.status === 'Disconnected') {
  
    } else if (msg.status === 'Connecting') {
      // 
    }
});

btn_test.addEventListener("click", test);


//errorcodes: 0 - success, 2 - connection not established
function test() {
  console.log(tactJs.submitDot(key, position, points, durationMillis));
}