# weave

weave.js is a JavaScript library for drawing a weave pattern on HTML5 Canvas.

![QuickSettings Panel](weave.png)

You create a Weave object with:

    var weave = Weave.create(tileSize, bandSize);

The bandSize is the width of the strip of material that is woven in both directions. The tileSize is the distance between the center of two bands.

You can immediately render the weave to an HTML5 Canvas with:

    weave.render(context, x, y, width, height);

This is simply the 2d rendering context you are drawing to and the rectangular area that you are filling with a weave.

Properties that control how the weave is drawn:

		fillStyle       // the fill color of the bands
		strokeStyle     // the stroke color of the bands.
		lineWidth       // the size of the stroke.
		drawFill        // should the bands be drawn with a fill?
		drawStroke      // should the bands be drawn with a stroke?
		shadowColor     // shadow color, obvious.
		shadowOffsetX   // totally obvious.
		shadowOffsetY   // painfully obvious.
		shadowBlur      // mostly obvious, but can be set to "auto".

The only thing that really needs a comment here is the shadow blur. Because the weave is drawn as discreet tiles, if the blur extends off of the edge of a tile, you'll wind up with a hard edge, rather than a smooth blur. Setting shadowBlur to "auto" calculates the blur size so this won't happen, at least if the offset x and y are 0. Feel free to override this, as long as you're happy with the results.

## demo
(uses QuickSettings https://github.com/bit101/quicksettings)

http://htmlpreview.github.io/?https://github.com/bit101/weave/blob/master/demos/demo.html
