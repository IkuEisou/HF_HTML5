window.onload = init;

function handleButtonClick(){
	var textInput = document.getElementById("songTextInput");
	var songName = textInput.value;
	var msg;
	if (songName == "") {
		msg = "Please enter a song!";
		alert(msg);
	}
	else{
		msg = "Adding "+songName;
		var li = document.createElement("li");
		var ul = document.getElementById("playlist");
		li.innerHTML = songName;
		ul.appendChild(li);
		save(songName);
		console.log(songName + " is saved!\n");
	}
}

function init() {
	var button = document.getElementById("addButton");
	button.onclick = handleButtonClick;
	loadPlaylist("playlist");
}