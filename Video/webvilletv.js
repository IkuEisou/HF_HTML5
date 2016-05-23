var position = 0;
var playlist;
var video;

window.onload = init;

function init(argument) {
	playlist = ["video/preroll",
	"video/areyoupopular",
	"video/destinationearth"];

	video = document.getElementById("video");
	video.addEventListener("ended", nextVideo, false);
	video.src = playlist[position] + getFormatExtention();
	video.load();
	video.play();
	alert("Playing " + video.currentSrc);
}

function nextVideo(argument) {
	position++;
	if (position >= playlist.length) {
		position = 0;
	}
	video.src = playlist[position] + getFormatExtention();
	video.load();
	video.play();
	alert("Playing " + video.currentSrc);
}

function getFormatExtention(argument) {
	if (video.canPlayType("video/mp4") != "") {
		return ".mp4";
	}else if (video.canPlayType("video/webm") != "") {
		return ".webm";
	}else if (video.canPlayType("video/ogg") != "") {
		return ".ogv";
	}
}