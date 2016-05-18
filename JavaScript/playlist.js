window.onload = init;

function handleButtonClick(){
	var textInput = document.getElementById("songTextInput");
	var songName = textInput.value;
	var msg;
	if (songName == "") {
		msg = "Please enter a song!";
	}
	else{
		msg = "Adding "+songName;
		var li = document.createElement("li");
		var ul = document.getElementById("playlist");
		li.innerHTML = songName;
		ul.appendChild(li);
		save(songName);
	}
	alert(msg);
}

function init() {
	// body...
	var button = document.getElementById("addButton");
	button.onclick = handleButtonClick;
	loadPlaylist();
}