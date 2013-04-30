//Julia 5 as taken from http://www.nihilogic.dk/labs/javascript_canvas_fractals/

function julia(attr){

	var start = attr.start;
	var end = attr.end;
	var w = h = attr.size;
	var zoom = 1;
	var vx = 0;			//Viewpoints X
	var vy = 0;			//Viewpoint Y

	/* Julia Set Items  ------------------------ */
	var cr = -0.835;
	var ci = -0.2321;


	var mi = Math.max(30, Math.round(Math.max(Math.log(zoom),1) * 30)); //30 is startit
	var itfac = 1/mi*30;

	var xmin = vx - 2/zoom;
	var xmax = vx + 2/zoom;
	var ymin = vy - 2/zoom;
	var ymax = vy + 2/zoom;

	var dx = xmax-xmin;
	var dy = ymax-ymin;


	var data = {};
	var px, py, it;
	var c1, c2, c3, m;


	startTime = new Date().getTime();
	start = attr.offsetStart;
	gap = attr.gap;

	for(i = start; i < end; i = i + gap) {
		var offset = i*4;

		px = (i % w );
		py = h - ((i/w) | 0);

		x = xmin + px/w * dx;
		y = ymin + py/h * dy;
		it = mi;

		//Julia Code
		var xx = x*x, yy = y*y;
		do {
			y = (x+x)*y + ci;
			x = xx - yy + cr;
			yy = y*y;
			xx = x*x;

			if (xx+yy > 4) {
				y = (x+x)*y + ci;
				x = xx - yy + cr;
				yy = y*y;
				xx = x*x;

				break;
			}
		} while(--it);
		res = {
			it : it, x : x, y : y, xx : xx, yy : yy
		};

		//Julia Code here
		it = mi - res.it;

		var mag =  it * itfac;

		c1 = c2 = c3 = (res.it==mi) ? 255 : 255 - mag/30 * 255;
		c1 = c1 < 0 ? 0 : c1;
		c2 = c2 < 0 ? 0 : c2;
		c3 = c3 < 0 ? 0 : c3;

		c1 = c1 > 255 ? 255 : c1;
		c2 = c2 > 255 ? 255 : c2;
		c3 = c3 > 255 ? 255 : c3;

		data[offset] = c1;
		data[offset+1] = c2;
		data[offset+2] = c3;
	}

	var end = new Date().getTime();


	return {data: data, client: attr.client, core: attr.core, offset: attr.offsetStart, gap: attr.gap, time: end - startTime};
}