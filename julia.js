//Julia 5 as taken from http://www.nihilogic.dk/labs/javascript_canvas_fractals/

function julia(attr){


		data = {};
		var px, py, it;
		var c1, c2, c3, m;

		cr = -0.835;
		ci = -0.2321;

		for(i = attr.start; i < attr.end; i ++) {
			var offset = i*4;

			px = (i % attr.w );
			py = attr.h - ((i/attr.w) | 0);


			x = attr.xmin + px/attr.w * attr.dx;
			y = attr.ymin + py/attr.h * attr.dy;
			it = attr.mi;

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
			it = attr.mi - res.it;

			var mag =  it * attr.itfac;

			c1 = c2 = c3 = (res.it==attr.mi) ? 255 : 255 - mag/30 * 255;
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




	return data;
}