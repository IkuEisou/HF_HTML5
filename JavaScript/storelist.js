function getStoreArray(key) {
	// body...
	var playlistArray = localStorage.getItem(key);
	if (playlistArray == null || playlistArray == "") {
		playlistArray = new Array();
	}
	else{
		playlistArray = JSON.parse(playlistArray);
	}
	return playlistArray;
}

function getSavedSongs() {
	// body...
	return getStoreArray("playlist");
}

function save(item){
	var playlistArray = getStoreArray("playlist");
	playlistArray.push(item);
	localStorage.setItem("playlist", JSON.stringify(playlistArray));
}

function loadPlaylist( ) {
	// body...
	var playlistArray = getSavedSongs();
	var ul = document.getElementById("playlist");
	if (playlistArray != null) {
		for (var i = playlistArray.length - 1; i >= 0; i--) {
			var li = document.createElement("li");
			li.innerHTML = playlistArray[i];
			ul.appendChild(li);
		}
	}
}