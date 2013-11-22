Torn.Point = function(parent, position) {
    Torn.Entity.call(this, parent);

    this.position = position || new THREE.Vector3(0, 0, 0);

    this.material = new THREE.MeshNormalMaterial({
        wireframe: false
    });

    this.geometry = new THREE.SphereGeometry(
        1
    );

    this.mesh = new THREE.Mesh(
        this.geometry,
        this.material
    );

    this.mesh.position = this.position;

    parent.add(this.mesh);
}

Torn.Point.prototype = Object.create(Torn.Entity.prototype);