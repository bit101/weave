window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var weave = Weave.create(30, 20),
		model = {
			x: 0,
			y: 0,
			w: width,
			h: height,
			drawBG: false,
			shadowBlur: 5,
			autoBlur: true
		},
		bg = document.createElement("img");
	
	bg.src = "chocorua.jpg";


	var rect = QuickSettings.create(10, 10, "Rect");
	rect.setGlobalChangeHandler(draw);
	rect.bindRange("x", 0, 500, model.x, 1, model);
	rect.bindRange("y", 0, 500, model.y, 1, model);
	rect.bindRange("w", 100, width, model.w, 1, model);
	rect.bindRange("h", 100, height, model.h, 1, model);
	rect.bindBoolean("drawBG", false, model);
	
	var size = QuickSettings.create(10, 220, "Size");
	size.setGlobalChangeHandler(draw);
	size.bindRange("tileSize", 20, 100, 30, 1, weave);
	size.bindRange("bandSize", 10, 90, 20, 1, weave);

	var style = QuickSettings.create(10, 340, "Style");
	style.setGlobalChangeHandler(draw);
	style.bindColor("fillStyle", "#eeeeee", weave);
	style.bindColor("strokeStyle", "#999999", weave);
	style.bindRange("lineWidth", 1, 10, 1, 1, weave);
	style.bindBoolean("drawStroke", false, weave);

	var shadows = QuickSettings.create(700, 10, "Shadows");
	shadows.setGlobalChangeHandler(draw);
	shadows.bindRange("shadowOffsetX", -10, 10, 0, 1, weave);
	shadows.bindRange("shadowOffsetY", -10, 10, 0, 1, weave);
	shadows.bindRange("shadowBlur", 0, 40, model.shadowBlur, 1, model);
	shadows.bindBoolean("autoBlur", model.autoBlur, model);

	draw();

	function draw() {
		context.clearRect(0, 0, width, height);
		if(model.drawBG) {
			context.drawImage(bg, 0, 0);
		}
		if(model.autoBlur) {
			weave.shadowBlur = "auto";
		}
		else {
			weave.shadowBlur = model.shadowBlur;
		}
		weave.render(context, model.x, model.y, model.w, model.h);
	}

};