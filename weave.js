(function() {
	var Weave = {
		tileSize: 100,
		bandSize: 50,
		oddTile: null,
		evenTile: null,
		fillStyle: "#ffffff",
		strokeStyle: "#999999",
		lineWidth: 1,
		drawFill: true,
		drawStroke: false,
		shadowColor: "rgba(0, 0, 0, 0.5)",
		shadowOffsetX: 0,
		shadowOffsetY: 0,
		shadowBlur: "auto",
		scratchCanvas: null,
		scratchContext: null,


		create: function(tileSize, bandSize) {
			var obj = Object.create(this);
			obj.init(tileSize, bandSize);
			return obj;
		},

		init: function(tileSize, bandSize) {
			this.tileSize = tileSize;
			this.bandSize = bandSize;

		    this.oddTile = this.createTile();
		    this.evenTile = this.createTile();

		    this.scratchCanvas = document.createElement("canvas");
		    this.scratchContext = this.scratchCanvas.getContext("2d");
		},

		clearTiles: function() {
			this.clearTile(this.oddTile);
			this.clearTile(this.evenTile);
		},

		drawTiles: function() {
			this.drawTile(this.oddTile, 0);
			this.drawTile(this.oddTile, 90);
			this.drawTile(this.evenTile, 90);
			this.drawTile(this.evenTile, 0);
		},

		createTile: function() {
			var canvas = document.createElement("canvas");
	      	var context = canvas.getContext("2d");
			return {
				canvas: canvas,
				context: context
			};
		},

		styleTile: function(tile) {
			var context = tile.context;
			context.fillStyle = this.fillStyle;
			context.strokeStyle = this.strokeStyle;
			context.lineWidth = this.lineWidth;
			context.shadowColor = this.shadowColor;
			context.shadowOffsetX = this.shadowOffsetX;
			context.shadowOffsetY = this.shadowOffsetY;
			if(this.shadowBlur === "auto") {
				context.shadowBlur = (this.tileSize - this.bandSize) / 2;
			}
			else {
				context.shadowBlur = this.shadowBlur;
			}

		},

		render: function(context, x, y, w, h) {
		    this.clearTiles();
		    this.drawTiles();

		    this.scratchCanvas.width = w;
		    this.scratchCanvas.height = h;


			var tile;
			for(var j = 0; j <= h / this.tileSize; j++) {
				for(var i = 0; i <= w / this.tileSize; i++) {
					if(i % 2 === j % 2) {
						tile = this.oddTile;
					}
					else {
						tile = this.evenTile;
					}
					this.scratchContext.drawImage(tile.canvas, this.tileSize / 2, this.tileSize / 2, this.tileSize, this.tileSize, i * this.tileSize, j * this.tileSize, this.tileSize, this.tileSize);
				}
			}
			context.drawImage(this.scratchCanvas, x, y);
		},

		clearTile: function(tile) {
			tile.canvas.width = this.tileSize * 2;
			tile.canvas.height = this.tileSize * 2;

			tile.context.clearRect(0, 0, this.tileSize * 2, this.tileSize * 2);
		},

		drawTile: function(tile, r) {
			this.styleTile(tile);
			tile.context.save();
			tile.context.translate(this.tileSize, this.tileSize);
			tile.context.rotate(r * Math.PI / 180);
			tile.context.beginPath();
			tile.context.rect(-this.bandSize / 2, -this.tileSize, this.bandSize, this.tileSize * 2);

			if(this.drawFill) {
				tile.context.fill();
			}
			if(this.drawStroke) {
				tile.context.shadowColor = null;
				tile.context.shadowBlur = 0;
				tile.context.shadowOffsetX = 0;
				tile.context.shadowOffsetY = 0;
				tile.context.beginPath();
				tile.context.rect(-this.bandSize / 2 + this.lineWidth / 2, -this.tileSize, this.bandSize - this.lineWidth, this.tileSize * 2);
				tile.context.stroke();
			}
			tile.context.restore();
		}
	};
	if (typeof define === "function" && define.amd) {
	    define(Weave);
	} else {
	   window.Weave = Weave;
	}

}());
