Torn = {};

Torn.init = function() {
    Torn.renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    //Torn.renderer.shadowMapEnabled = true;
    //Torn.renderer.shadowMapType = THREE.PCFSoftShadowMap;

    Torn.scene = new THREE.Scene();

    Torn.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        5000
    );

    Torn.controls = new THREE.OrbitControls(Torn.camera);
    Torn.camera.position.z = 48;
    Torn.camera.position.y = 48;
    //Torn.camera.lookAt(new THREE.Vector3(0,0,0));
    //Torn.camera.position.z = 100;

    Torn.renderStats = new Stats();
    Torn.renderStats.domElement.style.position = 'absolute';
    Torn.renderStats.domElement.style.top = '0px';
    Torn.renderStats.domElement.style.zIndex = 100;

    Torn.entities = {};

    Torn.clock = new THREE.Clock();
    Torn.projector = new THREE.Projector();

    Torn.grid = new Torn.Grid();
    Torn.cursor = new Torn.Cursor();
    Torn.tiler = new Torn.Tiler(null, 'assets/img/tiles.png');

    document.getElementById("tiler").appendChild(Torn.tiler.domElement);

    Torn.container = document.getElementById("viewport");

    Torn.container.appendChild(Torn.renderStats.domElement);
    Torn.container.appendChild(Torn.renderer.domElement);

    Torn.onWindowResize();
    window.addEventListener('resize', Torn.onWindowResize, false);

    Torn.container.addEventListener('mousemove', function(e) {
        Torn.cursor.onMouseMove(e, Torn.cursor);
    }, false);

    Torn.container.addEventListener('mouseup', function(e) {
        Torn.cursor.onMouseClick(e, Torn.cursor);
    }, false);

    Torn.populate();
    Torn.render();
}

Torn.populate = function() {
    //Torn.entities.city = new Torn.City(Torn.scene, 512, 512);
    //Torn.entities.city.generate();

    Torn.thing = new Torn.Thing(Torn.scene, box);

    Torn.axis = new THREE.AxisHelper(64);
    Torn.scene.add(Torn.axis);
}

Torn.render = function() {
    requestAnimationFrame(Torn.render);
    var delta = Torn.clock.getDelta();

    Torn.controls.update();
    Torn.renderStats.update();
    Torn.renderer.render(Torn.scene, Torn.camera);
}

Torn.onWindowResize = function(event) {
    Torn.renderer.setSize(Torn.container.offsetWidth, Torn.container.offsetHeight);

    Torn.camera.aspect = Torn.container.offsetWidth / Torn.container.offsetHeight;
    Torn.camera.updateProjectionMatrix();
}

Torn.getShader = function(name) {
    return document.getElementById(name).textContent;
}