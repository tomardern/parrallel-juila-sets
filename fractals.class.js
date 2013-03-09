var fractals = {

	phi: 1.6180339887,


	julia_base : function(x, y, it, cr, ci) {
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
		} while(--it)
		return {
			it : it, x : x, y : y, xx : xx, yy : yy
		};
	},

	julia1 : function(x, y, it) {
		return fractals["julia_base"](x, y, it, this.phi - 2, this.phi - 1);
	},

	julia2 : function(x, y, it) {
		return fractals["julia_base"](x, y, it, 1-this.phi, 0);
	},

	julia3 : function(x, y, it) {
		return fractals["julia_base"](x, y, it, 0.285, 0);
	},

	julia4 : function(x, y, it) {
		return fractals["julia_base"](x, y, it, .285, 0.01);
	},

	julia5 : function(x, y, it) {
		return fractals["julia_base"](x, y, it,-0.835, -0.2321);
	},

	julia6 : function(x, y, it) {
		return fractals["julia_base"](x, y, it, -0.7, -0.3);
	},

	julia7 : function(x, y, it) {
		return fractals["julia_base"](x, y, it, 0, 1);
	},

	julia8 : function(x, y, it) {
		return fractals["julia_base"](x, y, it, -0.391, -0.587);
	},

	julia9 : function(x, y, it) {
		return fractals["julia_base"](x, y, it,-0.123, 0.745);
	},

	julia10 : function(x, y, it) {
		return fractals["julia_base"](x, y, it,-0.75, 0);
	},

	julia11 : function(x, y, it) {
		var zr, zi;
		var cr = 0.6;
		var ci = 1.1;
		var xx = x*x, yy = y*y;
		do {
			zr = x - (x?(x<0?-1:1):0);
			zi = y;
			x = cr*zr-ci*zi;
			y = cr*zi+ci*zr;
			yy = y*y;
			xx = x*x;
			if (xx+yy > 4)
				break;
		} while(--it)
		return {
			it : it, x : x, y : y, xx : xx, yy : yy
		};
	},

	juliasine_base : function(x, y, it, cr, ci) {
		var xx = x*x, yy = y*y;
		var z, expy, expmy;
		var c = [cr, ci];
		do {

			expy = Math.exp(y);
			expmy = Math.exp(-y);
			z = [Math.sin(x) * (expy + expmy)/2, Math.cos(x) * (expy - expmy)/2];

			x = c[0]*z[0]-c[1]*z[1];
			y = c[0]*z[1]+c[1]*z[0];

			yy = y*y, xx = x*x;
			if (xx+yy > 500)
				break;
		} while(--it)
		return {
			it : it, x : x, y : y, xx : xx, yy : yy
		};
	},

	juliasine : function(x, y, it) {
		return fractals["juliasine_base"](x, y, it, 4, 1, 0.1);
	},

	juliasine2 : function(x, y, it) {
		return fractals["juliasine_base"](x, y, it, 4, 1, 0.3);
	},

	juliacosine_base : function(x, y, it, cr, ci) {
		var xx = x*x, yy = y*y;
		var z, expy, expmy;
		var c = [cr, ci];
		do {
			expy = Math.exp(y);
			expmy = Math.exp(-y);
			z = [Math.cos(x) * (expy + expmy)/2, - Math.sin(x) * (expy - expmy)/2];

			x = c[0]*z[0]-c[1]*z[1];
			y = c[0]*z[1]+c[1]*z[0];

			yy = y*y, xx = x*x;
			if (xx+yy > 500)
				break;
		} while(--it)
		return {
			it : it, x : x, y : y, xx : xx, yy : yy
		};
	},

	juliacosine : function(x, y, it) {
		return fractals["juliacosine_base"](x, y, it, 4, 1, 0.6);
	},

	juliacosine2 : function(x, y, it) {
		return fractals["juliacosine_base"](x, y, it, 4, Math.PI/2 * 1.5, Math.PI/2 * 0.05);
	},

	juliacosine3 : function(x, y, it) {
		var xx = x*x, yy = y*y;
		var z, expy, expmy;
		var c = [1, 0.1];
		do {
			expy = Math.exp(y);
			expmy = Math.exp(-y);
			z = [Math.cos(x) * (expy + expmy)/2, - Math.sin(x) * (expy - expmy)/2];

			x = c[0]*z[0]-c[1]*z[1];
			y = c[0]*z[1]+c[1]*z[0];

			tx = x;
			x = -y;
			y = tx;

			yy = y*y, xx = x*x;
			if (xx+yy > 500)
				break;
		} while(--it)
		return {
			it : it, x : x, y : y, xx : xx, yy : yy
		};
	},

}