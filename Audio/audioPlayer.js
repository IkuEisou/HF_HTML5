window.onload = function (argument) {
	// body...
	var audioElement = document.getElementById("boombox");
	var musicname = audioElement.getAttribute("src");
	var namediv = document.getElementById("musicname");
	namediv.innerHTML = "Now playing is " + musicname;
	audioElement.volume = .5;
	audioElement.play();
}

