let width = window.innerWidth;
let height = window.innerHeight;
let canvas = document.getElementById('myCanvas');

canvas.setAttribute('width', width);
canvas.setAttribute('height', height);

let ball = {
  rorationX: 0,
  rorationY: 0,
  rorationZ: 0,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
}

let gui = new dat.GUI();
gui.add(ball, 'rorationX').min(-0.2).max(0.2).step(0.001);
gui.add(ball, 'rorationY').min(-0.2).max(0.2).step(0.001);
gui.add(ball, 'rorationZ').min(-0.2).max(0.2).step(0.001);
gui.add(ball, 'positionX').min(-0.2).max(0.2).step(0.001);
gui.add(ball, 'positionY').min(-0.2).max(0.2).step(0.001);
gui.add(ball, 'positionZ').min(-0.2).max(0.2).step(0.001);

let renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setClearColor(0x000000);

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
camera.position.set(0, 0, 1000);
let light = new THREE.AmbientLight(0xffffff);
scene.add(light);
let geometry = new THREE.SphereGeometry(200, 12, 12);
let material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  vertexColors: THREE.FaceColors
});

for (let i = 0; i < geometry.faces.length; i++) {
  geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
}

let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function loop() {
  
  mesh.rotation.x += ball.rorationX;
  mesh.rotation.y += ball.rorationY;
  mesh.rotation.z += ball.rorationZ;
  mesh.position.x += ball.positionX;
  mesh.position.y += ball.positionY;
  mesh.position.z += ball.positionZ;

  renderer.render(scene, camera);
  requestAnimationFrame(function () {
    loop();
  });
}

loop();