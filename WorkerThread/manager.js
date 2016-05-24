window.onload = init;

function init(argument) {
	// body...
	var worker = new Worker("worker.js");
	worker.postMessage("ping");

	worker.onmessage = function (event) {
		// body...
		var message = "Worker says " + event.data;
		document.getElementById("output").innerHTML = message;
	};
}