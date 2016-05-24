importScripts("workerlib.js");

onmessage = function (task) {
	// body...
	var workerResult = computeRow(task.data);
	postMessage(workerResult);
}