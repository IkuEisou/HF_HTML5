onmessage = pingpong;
function pingpong(event) {
	// body...
	if(event.data == "ping")
		postMessage("pong");
}