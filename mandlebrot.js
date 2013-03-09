mandlebrot = {


	n: 4096,
	cutoff: 100,


	set: {},


	main: function(){


		//Calculate start time
		start = new Date();


		for (var i = 0; i < this.n; i++) {
			for(var j = 0; j < this.n; j++){

				var cr = (4.0 * i - 2 * this.n) / this.n;
				var ci = (4.0 * j - 2 * this.n) / this.n;

				var zr = cr;
				var zi = ci;

				var k = 0;

				while (k < this.cutoff && zr * zr + zi * zi < 4.0){

                    newr = cr + zr * zr - zi * zi ;
                    newi = ci + 2 * zr * zi ;
                     zr = newr ;
                     zi = newi ;

					k++;
				}


				if (typeof this.set[i] == "undefined"){
					this.set[i] = [];
				}

				this.set[i][j] = k;
			}
		}


		end = new Date();




		console.log("Time:", end.getTime() - start.getTime());

		//To do - put this in RAM
		canvas = document.getElementById("canvas");
		context = canvas.getContext("2d");
		canvas.width = this.n;
		canvas.height = this.n;

		var id = context.createImageData(1,1); // only do this once per page
		var d  = id.data;                        // only do this once per page

		for (var i = 0 ; i < this.n ; i++) {
              for (var j = 0 ; j < this.n ; j++) {

                 k = this.set[i][j];

                 level  = 0;
                 if(k < this.cutoff) {
                     level = parseFloat(k / this.cutoff);
				}


				d[0]   = parseInt(level/2);
				d[1]   = parseInt(level/2);
				d[2]   = parseInt(level);




				context.putImageData( id, i, j );

              }
          }




		/*








		var id = context.createImageData(1,1); // only do this once per page
		var d  = id.data;                        // only do this once per page
		d[3] = 255;



		//http://www.robodesign.ro/coding/canvas-primer/20081208/
	var imgData=context.createImageData(this.n,this.n);



	for (var i=0;i<imgData.data.length;i+=4) {

		x = parseInt(i / (this.n * 4));

		y = 10;


		//jv = iv % (this.n * 4);


	console.log(i,x,y);

	  imgData.data[i+0]=255;
	  imgData.data[i+1]=0;
	  imgData.data[i+2]=0;
	  imgData.data[i+3]=255;



	  }

		console.log(imgData.data.length);


	 for (var j = 0 ; j < this.n ; j++) {


		}


	for (var i=0;i<imgData.data.length;i+=4) {




	  imgData.data[i+0]=255;
	  imgData.data[i+1]=0;
	  imgData.data[i+2]=0;
	  imgData.data[i+3]=255;



	  }
	context.putImageData(imgData,0,0); */











	   /*  for (var i = 0 ; i < this.n ; i++) {
              for (var j = 0 ; j < this.n ; j++) {

                  k = this.set[i][j];

                 level  = 0;
                  if(k < this.cutoff) {
                      level = k / this.cutoff;
					}

				d[0]   = level/2;
				d[1]   = level/2;
				d[2]   = level;

				context.putImageData( id, i, j );

              }
          } */


		console.log("Done");

	}






};







