Torn.Cursor = function(parent, snap) {
    Torn.Entity.call(this, parent);

    this.snap = snap || 16;

    this.material = new THREE.MeshNormalMaterial();
    this.geometry = new THREE.CubeGeometry(1, 1, 1);

    this.mesh = new THREE.Mesh(
        this.geometry,
        this.material
    );

    this.parent.add(this.mesh);
}

Torn.Cursor.prototype = Object.create(Torn.Entity.prototype);

Torn.Cursor.prototype.onMouseMove = function(event, self) {
    var pos = this._translatePosition(event);

    var cell = [
        Math.round(pos.x / self.snap),
        Math.round(pos.z / self.snap)
    ];

    if(Math.abs(cell[0] * self.snap - pos.x) < 2 &&
       Math.abs(cell[1] * self.snap - pos.z) < 2) {

        pos.x = cell[0] * self.snap;
        pos.z = cell[1] * self.snap;
    }

    self.mesh.position = pos.clone();
}

Torn.Cursor.prototype.onMouseClick = function(event, self) {
    //var point = new Torn.Point(self.parent, self.mesh.position.clone());
    //self.parent.add(point.position);
}

Torn.Cursor.prototype._translatePosition = function(event) {
    var vector = new THREE.Vector3(
        ( event.offsetX / Torn.container.offsetWidth ) * 2 - 1,
        - ( event.offsetY / Torn.container.offsetHeight ) * 2 + 1,
    0.5 );

    Torn.projector.unprojectVector( vector, Torn.camera );

    var dir = vector.sub( Torn.camera.position ).normalize();
    var distance = - Torn.camera.position.y / dir.y;
    var pos = Torn.camera.position.clone().add( dir.multiplyScalar( distance ) );

    return pos;
}