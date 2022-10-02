import * as THREE from './threejs/three.module.js';
import {GLTFLoader} from './threejs/GLTFLoader.js';
import {OBJLoader} from './threejs/OBJLoader.js';
import {OrbitControls} from './threejs/OrbitControls.js';
import { SVGLoader } from './threejs/SVGLoader.js';
import { Interaction } from './threejs/three.interaction.module.js'

var scene, camera, rendered;
var kepler,earth_clouds,mars,sun,wasp_12b,crancri_55,hubble;
var spitzer,proxima_b,vesta,triton,titan_1,titan_19,osiris_rex;
var odyssey, europa, ganymede, ceres, jupiter;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const intersectionPoint = new THREE.Vector3();
const planeNormal = new THREE.Vector3();
const plane = new THREE.Plane();

//ferr 
var ferr;
// deinos
var deinos;

function init() {
    scene = new THREE.Scene();
    var background = new THREE.TextureLoader();
    background.load('/media/background.jpg', (texture) => {
        scene.background = texture;
    });

    // scene.background = new THREE.Color(0x26ff22);
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    );

    camera.position.z = 70;

    rendered = new THREE.WebGLRenderer({antialias: true});
    rendered.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(rendered.domElement);

    // controls
    let control = new OrbitControls(camera, rendered.domElement);

    // grid helper
    const size = 200; const divisions = 20; 
    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add( gridHelper );

    // mars
    var mars_geometry = new THREE.SphereGeometry(5, 50, 50);
    var texture = new THREE.TextureLoader().load('/models/diffuse-mars2k.png');
    var material = new THREE.MeshBasicMaterial({
        map: texture
    });
    mars = new THREE.Mesh(mars_geometry, material);
    mars.position.y = 6;
    mars.position.x = 450;
    mars.position.z = 450;
    scene.add(mars);
    
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    // CARDS
    // FERROACID
    var texture = new THREE.TextureLoader().load('models/cards/Ferroacido.png');
    var material = new THREE.MeshBasicMaterial({map:texture});
    // 
    // geometria
    var card = new THREE.PlaneGeometry(10,10,10,10);
    ferr = new THREE.Mesh(card, material);
    ferr.position.x = -80;
    ferr.position.y = 10;
    ferr.position.z = -8;
    ferr.rotation.y = 1.5;
    // ferr.position.z = 75;
    scene.add(ferr);

    // const interaction = new Interaction(rendered, scene, camera);
     // RADIODEINO-300
     var texture1 = new THREE.TextureLoader().load('models/cards/Deinococus.png');
     var material1 = new THREE.MeshBasicMaterial({map:texture1});
     // 
     // geometria
     var card1 = new THREE.PlaneGeometry(10,10,10,10);
     deinos = new THREE.Mesh(card1, material1);
     deinos.position.x = 80;
     deinos.position.y = 10;
     deinos.position.z = 80;
     deinos.rotation.y = 4; 
     scene.add(deinos);
     
    // deinos.cursor = 'pointer';
    // deinos.on('click', function(ev) {
    //     console.log(ev);
    // });
    // 
    // var texture = new THREE.TextureLoader().load('models/cards/cartaPrueba.png');
    // var material = new THREE.MeshBasicMaterial({map:texture});
    // // 
    // // geometria
    // var card = new THREE.PlaneGeometry(200,200,10,10);
    // var ob = new THREE.Mesh(card, material);
    // scene.add(ob);
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    // test card svg
    // var loader = new SVGLoader();
    // loader.load('/models/cards/cartaPrueba.svg', function (data) {
    //     const paths = data.paths;
	// 	const group = new THREE.Group();

	// 	for ( let i = 0; i < paths.length; i ++ ) {

	// 		const path = paths[ i ];

	// 		const material = new THREE.MeshBasicMaterial( {
	// 			color: path.color,
	// 			side: THREE.DoubleSide,
	// 			depthWrite: false
	// 		} );

	// 		const shapes = SVGLoader.createShapes( path );

	// 		for ( let j = 0; j < shapes.length; j ++ ) {

	// 			const shape = shapes[ j ];
	// 			const geometry = new THREE.ShapeGeometry( shape );
	// 			const mesh = new THREE.Mesh( geometry, material );
	// 			group.add( mesh );

	// 		}
    //     }

    //     scene.add(group);
    // });
    // geometria
    // var card = new THREE.PlaneGeometry(200,200,10,10);
    // var ob = new THREE.Mesh(card, material);
    // scene.add(ob);
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    // Events popup
    
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 10);
    scene.add(light);

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, -10);

    scene.add(light);
}

function animate() {
    requestAnimationFrame(animate);
    kepler.rotation.y += 0.001;
    earth_clouds.rotation.y += 0.001;
    //cards
    // ferr.rotation.y += 0.01;

    // end
    rendered.render(scene, camera);
};

// planets
//kepler planet
var loader = new GLTFLoader();
    loader.load('/models/kepler-452b.glb', (gltf) => {
        kepler = gltf.scene;
        kepler.scale.set(0.04,0.04,0.04);
        kepler.position.x = 155;
        kepler.position.y = 6;
        scene.add(kepler);
        // root.scale.set(root.scale.x * 0.2, root.scale.y * 0.2, root.scale.z * 0.2);
        // root.position.y += root.scale.y;
});
// earth planet
var loader = new GLTFLoader();
loader.load('/models/earth_clouds.glb', (gltf) => {
        earth_clouds = gltf.scene;
        earth_clouds.scale.set(0.01,0.01,0.01);
        earth_clouds.position.y = 6;
        scene.add(earth_clouds);
        animate();
        // root.scale.set(root.scale.x * 0.2, root.scale.y * 0.2, root.scale.z * 0.2);
        // root.position.y += root.scale.y;
});
// sun
var loader = new GLTFLoader();
loader.load('/models/sun.glb', (gltf) => {
    sun = gltf.scene;
    sun .scale.set(0.02,0.02,0.02);
    sun.position.y = 6;
    sun.position.x = -80;
    sun.position.z = -80;
    scene.add(sun);
});
var loader = new GLTFLoader();
loader.load('/models/55_Cancri_e_1_24364.glb', (gltf) => {
    crancri_55 = gltf.scene;
    crancri_55.scale.set(0.1,0.1,0.1);
    crancri_55.position.y = 6;
    crancri_55.position.x = 145;
    crancri_55.position.z = 1000;
    scene.add(crancri_55);
});
var loader = new GLTFLoader();
loader.load('/models/Hubble.glb', (gltf) => {
    hubble = gltf.scene;
    hubble.position.y = 6;
    hubble.position.x = 65;
    scene.add(hubble);
});
var loader = new GLTFLoader();
loader.load('/models/SPITZER.glb', (gltf) => {
    spitzer = gltf.scene;
    spitzer.position.y = 6;
    spitzer.position.x = 300;
    spitzer.position.z = 100;
    scene.add(spitzer);
});
var loader = new GLTFLoader();
loader.load('/models/proxima_b.glb', (gltf) => {
    proxima_b = gltf.scene;
    proxima_b.position.y = 6;
    proxima_b.position.x = -245;
    proxima_b.position.z = -100;
    proxima_b.scale.set(0.01,0.01,0.01);
    scene.add(proxima_b);
});
// Legend Ferroacid
var loader = new GLTFLoader();
loader.load('/models/Vesta_1_100.glb', (gltf) => {
    vesta = gltf.scene;
    vesta.scale.set(0.005,0.003,0.003);
    vesta.position.y = 6;
    vesta.position.x = -100;
    scene.add(vesta);
});
var loader = new GLTFLoader();
loader.load('/models/Vesta_1_100.glb', (gltf) => {
    var vesta = gltf.scene;
    vesta.scale.set(0.002,0.002,0.002);
    vesta.position.y = 20;
    vesta.position.x = -100;
    scene.add(vesta);
});
var loader = new GLTFLoader();
loader.load('/models/Triton_1_2707.glb', (gltf) => {
    triton = gltf.scene;
    triton.scale.set(0.1,0.1,0.1);
    triton.position.y = 6;
    triton.position.x = -395;
    triton.position.z = -395;
    scene.add(triton);
});
var loader = new GLTFLoader();
loader.load('/models/TitanSurface_1_5150.glb', (gltf) => {
    titan_1 = gltf.scene;
    titan_1.scale.set(0.01,0.01,0.01);
    titan_1.position.y = 6;
    titan_1.position.x = -80;
    titan_1.position.z = 80;
    scene.add(titan_1);
});
var loader = new GLTFLoader();
loader.load('/models/Titan_1_5150.glb', (gltf) => {
    titan_1 = gltf.scene;
    titan_1.scale.set(0.01,0.01,0.01);
    titan_1.position.y = 6;
    titan_1.position.x = 650;
    scene.add(titan_1);
});
var loader = new GLTFLoader();
loader.load('/models/Rhea_1_1529.glb', (gltf) => {
    titan_19 = gltf.scene;
    titan_19.scale.set(0.1,0.1,0.1);
    titan_19.position.y = 6;
    titan_19.position.x = 500;
    titan_19.position.z = 700;
    scene.add(titan_19);
});
var loader = new GLTFLoader();
loader.load('/models/Osiris_Rex.glb', (gltf) => {
    osiris_rex = gltf.scene;
    osiris_rex.scale.set(1,1,1);
    osiris_rex.position.y = 6;
    osiris_rex.position.z = -500;
    
    scene.add(osiris_rex);
});
var loader = new GLTFLoader();
loader.load('/models/Odyssey.glb', (gltf) => {
    odyssey = gltf.scene;
    odyssey.scale.set(1,1,1);
    odyssey.position.y = 6;
    odyssey.position.x = 800;
    odyssey.position.z = 800;
    scene.add(odyssey);
});
var loader = new GLTFLoader();
loader.load('/models/Europa_1_3138.glb', (gltf) => {
    europa = gltf.scene;
    europa.scale.set(0.01,0.01,0.01);
    europa.position.y = 6;
    europa.position.z = 80;
    scene.add(europa);
});
var loader = new GLTFLoader();
loader.load('/models/Ganymede_1_5268.glb', (gltf) => {
    ganymede = gltf.scene;
    ganymede.scale.set(0.01,0.01,0.01);
    ganymede.position.y = 6;
    ganymede.position.z = -80;
    scene.add(ganymede);
});
var loader = new GLTFLoader();
loader.load('/models/Ceres_1_1000.glb', (gltf) => {
    ceres = gltf.scene;
    ceres.scale.set(0.01,0.01,0.01);
    ceres.position.y = 6;
    ceres.position.z = -65;
    ceres.position.x = 80;
    scene.add(ceres);
});
var loader = new GLTFLoader();
loader.load('/models/Jupiter_1_142984.glb', (gltf) => {
    jupiter = gltf.scene;
    jupiter.scale.set(0.013,0.013,0.013);
    jupiter.position.y = 6;
    jupiter.position.z = 90;
    jupiter.position.x = 80;
    scene.add(jupiter);
});
// huevo
// var loader = new GLTFLoader();
// loader.load('/models/WASP-12b_1_249888.glb', (gltf) => {
//     wasp_12b = gltf.scene;
//     wasp_12b.position.y = -15;
//     scene.add(wasp_12b);
// });

init();

window.addEventListener('mousemove', function(e) {
    mouse.x = (e.clientX / this.window.innerWidth) * 2 -1;
    mouse.y = -(e.clientY / this.window.innerHeight) * 2 -1;
    planeNormal.copy(camera.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, intersectionPoint);
});

/*
es una representación de lo que puede ser una vida en el espacio exterior
tomando en cuenta que existen especies tales que tienen caracteristicas sumamente
increíbles con las cuales se les permite tener una vida en diferentes escenarios, puede ser
la radiación, presión atmosferica, temperaturas extremas. Para esto conocer sobre ellos
y el desarrollo que ha tenido la experimentación nos permite estar informados.

Nuestro demo usa gráficos en 3D proporcionados por una librería de javascript usando un entorno
web. Para hacerlo dinámico se espera que tengas que usar de las caracteristicas de estos individuos
para sobrevivir en el espacio.

Elementos usados:
Javascript, HTML, CSS.
Librería Three.js
Node.js para el servidor

Recursos de la nasa
Texturas
Modelos .glb .obj
*/