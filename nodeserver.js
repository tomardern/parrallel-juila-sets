/*
Chance Example

This example shows an example of a distributed problem solving in queen.
Any browser which connects will begin guessing numbers under "maxNumber",
once any of the browsers find the "numberToFind", all workers will be killed,
and the process will exit.

The process will continue to run until one browser guesses the right number,
if no browsers are connected, it'll idle and wait.

*/
module.exports = function(queen){
	var numberToFind = 42,
		maxNumber = 1000,
		workforceConfig = {},
		workforce;

		var mi = Math.max(30, Math.round(Math.max(Math.log(1),1) * 30));
		var itfac = 1/mi*30;
		var start = 10000;
		var end = 20000;

		xmin = 0 - 2/1;
		xmax = 0 + 2/1;
		ymin = 0 - 2/1;
		ymax = 0 + 2/1;

		w = 1000;
		h = 1000;

		j = 1;

		dx = xmax-xmin;
		dy = ymax-ymin;


	var param = {core: j, start:start,end:end,mi: mi,itfac: itfac,w: w,h: h,dx: dx,dy: dy,xmin: xmin,ymin: ymin};

	// Run this script on the client-side (i.e. browser).
	workforceConfig.run = ['http://parrallel-juila-sets.localhost/queen.julia.js'];

	// If a browser connects after we started, have them join the workforce
	workforceConfig.populate = "continuous";

	// Don't kill the workforce if it's idling with no browsers connected
	workforceConfig.killOnStop = false;

	// When a new worker (i.e. browser) connects, trigger this handler function
	workforceConfig.handler = function(worker){
		// Tell the worker the maximum number to guess
		worker(param);

		// Whenever a worker has a message, execute a handler function
		worker.on("message", function(obj){
			queen.log(obj.core + " \t guessed by " + worker.provider.attributes.name + "\n");

		});
	};

	// Create the workforce
	workforce = queen(workforceConfig);
};