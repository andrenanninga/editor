Torn.Tiler = function(parent, src) {
    Torn.Entity.call(this, parent);

    this.src = src;

    this.image = new Image();
    this.image.onload = function(e) {
        Torn.tiler.onload(e, Torn.tiler);
    };
    this.image.src = this.src;

    this.canvasWidth = 256;
    this.canvasHeight = 256;

    this.domElement = document.createElement('canvas');
    this.domElement.width = this.canvasWidth;
    this.domElement.height = this.canvasHeight;
    this.context = this.domElement.getContext('2d');

}

Torn.Grid.prototype = Object.create(Torn.Entity.prototype);

Torn.Tiler.prototype.onload = function(event, self) {
    var scale = self.canvasWidth / self.image.width;

    self.upscale(scale);
    self.drawUv();
}

Torn.Tiler.prototype.upscale = function(scale) {
    this.upscale = scale;

    this.context.drawImage(this.image, 0, 0);
    this.imageData = this.context.getImageData(0, 0, this.image.width, this.image.height).data;

    var offset = 0;
    for(var y = 0; y < this.image.height; y++) {
        for(var x = 0; x < this.image.width; x++) {
            var r = this.imageData[offset++];
            var g = this.imageData[offset++];
            var b = this.imageData[offset++];
            var a = this.imageData[offset++] / 100.0;

            this.context.fillStyle = 'rgba(' + [r, g, b, a].join(',') + ')';
            this.context.fillRect(x * scale, y * scale, scale, scale);
        }
    }
}

Torn.Tiler.prototype.drawUv = function(uv) {
    var uv = [[1, 1], [1, 0], [0, 0]];
    var points = this._uvToCoords(uv);

    console.log(this._coordsToUv(points));

    this.context.strokeStyle = '#ffffff';
    this.context.lineWidth = 2;
    this.context.beginPath();
    this.context.moveTo(points[0][0], points[0][1]);
    this.context.lineTo(points[1][0], points[1][1]);
    this.context.lineTo(points[2][0], points[2][1]);
    this.context.lineTo(points[0][0], points[0][1]);
    this.context.stroke();
}

Torn.Tiler.prototype._uvToCoords = function(uv) {
    var points = [];
    var angle = 90 * Math.PI / 180.0;
    var origin = {
        x: this.image.width / 2,
        y: this.image.height / 2
    }

    var cos = Math.cos(angle);
    var sin = Math.sin(angle);

    for(var i = 0; i < 3; i++) {
        points[i] = [];
        var x = uv[i][0] * this.image.width;
        var y = uv[i][1] * this.image.height;

        points[i][0] = origin.x + (x - origin.x) * cos - (y - origin.y) * sin;
        points[i][1] = origin.y + (x - origin.x) * sin + (y - origin.y) * cos;

        points[i][0] *= this.upscale;
        points[i][1] *= this.upscale;
    }

    return points;
}

Torn.Tiler.prototype._coordsToUv = function(points) {
    var uv = [];
    var angle = -90 * Math.PI / 180.0;
    var origin = {
        x: this.image.width / 2,
        y: this.image.height / 2
    }

    var cos = Math.cos(angle);
    var sin = Math.sin(angle);

    for(var i = 0; i < 3; i++) {
        uv[i] = [];
        var x = points[i][0] / this.upscale;
        var y = points[i][1] / this.upscale

        uv[i][0] = origin.x + (x - origin.x) * cos - (y - origin.y) * sin;
        uv[i][1] = origin.y + (x - origin.x) * sin + (y - origin.y) * cos;

        uv[i][0] /= this.image.width;
        uv[i][1] /= this.image.height;
    }

    return uv;
}