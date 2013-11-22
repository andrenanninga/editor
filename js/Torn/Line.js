Torn.Line = function(parent, points, color, pairs, continuous) {
    Torn.Entity.call(this, parent);

    this.points = points || [];
    this.color = color || 0xfff000;
    this.pairs = pairs || false;
    this.continuous = continuous || false;

    this.material = new THREE.LineBasicMaterial({
        color: this.color,
        linewidth: 1
    });

    this.geometry = new THREE.Geometry();

    this.type = THREE.LineStrip;

    if(this.pairs) {
        this.type = THREE.LinePieces;
    }

    this.mesh = new THREE.Line(
        this.geometry,
        this.material,
        this.type
    );

    for(var i = 0; i < points.length; i++) {
        var point = points[i];
        this.addPoint(point.x, point.y, point.z);
    }

    if(this.continuous) {
        this.addPoint(points[0].x, points[0].y, points[0].z)
    }

    parent.add(this.mesh);
}

Torn.Line.prototype = Object.create(Torn.Entity.prototype);

Torn.Line.prototype.addPoint = function(x, y, z) {
    var x = x || 0;
    var y = y || 0;
    var z = z || 0;

    this.geometry.vertices.push(new THREE.Vector3(x, y, z));
}