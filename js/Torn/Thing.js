var box = {
    points: [
        [0 ,  0,  0],
        [16,  0,  0],
        [0 , 16,  0],
        [16, 16,  0],
        [0 ,  0, 16],
        [16,  0, 16],
        [0 , 16, 16],
        [16, 16, 16],
    ],
    triangles: [
        // [0, 2, 1],
        // [1, 2, 3],

        // [0, 1, 4],
        // [4, 1, 5],

        // [2, 0, 4],
        // [2, 4, 6],

        [6, 7, 3],
        [2, 6, 3],

        [5, 7, 6],
        // [5, 6, 4],

        // [3, 5, 1],
        // [5, 3, 7],
    ],
    uv: [
        [[0, 12], [4, 12], [4, 16]],
        [[0, 16], [0, 12], [4, 16]],
        [[16, 16], [16, 0], [0, 0]],
    ]
}

Torn.Thing = function(parent, data) {
    Torn.Entity.call(this, parent);

    this.points = data.points;
    this.triangles = data.triangles;
    this.uv = data.uv;

    this.drawPoints();
    this.drawTriangles();
    this.drawFaces();
}

Torn.Thing.prototype = Object.create(Torn.Entity.prototype);

Torn.Thing.prototype.drawPoints = function() {
    for(var i = 0; i < this.points.length; i++) {
        var point = this.points[i];
        var position = new THREE.Vector3(point[0], point[1], point[2]);

        new Torn.Point(this.parent, position);
    }
}

Torn.Thing.prototype.drawTriangles = function() {
    for(var i = 0; i < this.triangles.length; i++) {
        var triangle = this.triangles[i];
        var corners = [];

        for(var j = 0; j < 3; j++) {
            var corner = this.points[triangle[j]];
            corners.push(new THREE.Vector3(corner[0], corner[1], corner[2]));
        }

        new Torn.Line(this.parent, corners, 0x00fff0, false, true);
    }
}

Torn.Thing.prototype.drawFaces = function() {
    var material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('assets/img/tiles.png')
    });
    material.map.magFilter = THREE.NearestFilter;
    var geometry = new THREE.Geometry;

    var w = 16;
    var h = 16;

    for(var i = 0; i < this.points.length; i++) {
        var point = this.points[i];
        geometry.vertices.push(new THREE.Vector3(point[0], point[1], point[2]));
    }

    for(var i = 0; i < this.triangles.length; i++) {
        var triangle = this.triangles[i];
        geometry.faces.push(new THREE.Face3(triangle[0], triangle[1], triangle[2]));

        if(typeof this.uv[i] != "undefined") {
            geometry.faceVertexUvs[0].push([
                new THREE.Vector2(this.uv[i][0][0] / w, this.uv[i][0][1] / h),
                new THREE.Vector2(this.uv[i][1][0] / w, this.uv[i][1][1] / h),
                new THREE.Vector2(this.uv[i][2][0] / w, this.uv[i][2][1] / h)
            ]);
        }
    }

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var mesh = new THREE.Mesh(
        geometry,
        material
    );


    this.parent.add(mesh);
}