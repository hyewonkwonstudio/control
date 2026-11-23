const firebaseConfig = {
  apiKey: "AIzaSyBwx7XYW_Ni5gn4i2nsgajKrvs9YCkEVPw",
  authDomain: "flower-c1170.firebaseapp.com",
  databaseURL:
    "https://flower-c1170-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flower-c1170",
  storageBucket: "flower-c1170.firebasestorage.app",
  messagingSenderId: "699132943609",
  appId: "1:699132943609:web:577380f63a27f40eeed628",
}; // 1단계에서 복사한 내용
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let buttonX;
let buttonY;
let buttonRadius;
let buttonH;

let sliderStartX;
let sliderEndX;
let sliderY;
let handleX;
let handleRadius;

function setup() {
  createCanvas(windowWidth, windowHeight);
  init();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  init();
}

function init() {
  buttonX = width * 0.5;
  buttonY = height * 0.5 - 100;
  buttonRadius = 50;
  buttonH = 10;

  sliderStartX = width * 0.5 - 150;
  sliderEndX = width * 0.5 + 150;
  sliderY = height * 0.5 + 100;
  handleX = sliderStartX;
  handleRadius = 20;
}

function draw() {
  background(242, 139, 5);

  button();
  slider();
}

function mousePressed() {
  // 버튼을 눌렀을 때 → 꽃 키우기 신호 보내기
  if (dist(mouseX, mouseY, buttonX, buttonY - buttonH) < buttonRadius) {
    sendGrow();
  }

  // 슬라이더를 눌렀을 때
  if (
    mouseX > sliderStartX &&
    mouseX < sliderEndX &&
    mouseY > sliderY - handleRadius &&
    mouseY < sliderY + handleRadius
  ) {
    handleX = mouseX;
    sendSlider();
  }
}

function mouseDragged() {
  if (
    mouseX > sliderStartX &&
    mouseX < sliderEndX &&
    mouseY > sliderY - handleRadius &&
    mouseY < sliderY + handleRadius
  ) {
    handleX = mouseX;
    sendSlider();
  }
}

function button() {
  let up = 10;
  if (dist(mouseX, mouseY, buttonX, buttonY - buttonH) < buttonRadius) {
    up = 7;
    if (mouseIsPressed) {
      up = 2;
    }
  }

  buttonH = lerp(buttonH, up, 0.5);

  noStroke();
  fill(140);
  ellipse(buttonX, buttonY, buttonRadius * 2, buttonRadius * 2);
  fill(217);
  ellipse(buttonX, buttonY - buttonH, buttonRadius * 2, buttonRadius * 2);
  fill(255);
  ellipse(
    buttonX,
    buttonY - buttonH,
    buttonRadius * 2 - 15,
    buttonRadius * 2 - 15
  );
}

function slider() {
  let radius = 20;
  if (dist(mouseX, mouseY, handleX, sliderY) < handleRadius) {
    radius = 22;
    if (mouseIsPressed) {
      radius = 25;
    }
  }

  handleRadius = lerp(handleRadius, radius, 0.5);

  stroke(255);
  strokeWeight(10);
  line(sliderStartX, sliderY, sliderEndX, sliderY);
  fill(242, 139, 5);
  ellipse(handleX, sliderY, handleRadius * 2, handleRadius * 2);
}
function sendGrow() {
  db.ref("flower/clicks").set(firebase.database.ServerValue.increment(1));
}

function sendSlider() {
  let value = round(map(handleX, sliderStartX, sliderEndX, 0, 100));
  db.ref("flower/slider").set(value);
}