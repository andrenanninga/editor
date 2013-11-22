Torn.Grid = function(parent, width, height, size) {
    Torn.Entity.call(this, parent);

    this.width = width || 128;
    this.height = height || 128;
    this.size = size || 16;

    halfWidth = this.width / 2;
    halfHeight = this.height / 2;

    this.lines = [];

    for(var i = -halfHeight; i <= halfHeight; i += this.size) {
        var start = new THREE.Vector3(i, 0, -halfWidth);
        var end = new THREE.Vector3(i, 0, halfWidth);

        this.lines.push(start);
        this.lines.push(end);
    }

    for(var i = -halfWidth; i <= halfWidth; i += this.size) {
        var start = new THREE.Vector3(-halfHeight, 0, i);
        var end = new THREE.Vector3(halfHeight, 0, i);

        this.lines.push(start);
        this.lines.push(end);
    }

    this.parent.add(new Torn.Line(this.parent, this.lines, 0xAAAAAA, true));
}

Torn.Grid.prototype = Object.create(Torn.Entity.prototype);