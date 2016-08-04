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
			var rmbtn = document.createElement("button");
			var rmtext = document.createTextNode("x");
			var song = document.createTextNode(playlistArray[i]+"  ");
			rmbtn.setAttribute("class", "remove");
			rmbtn.setAttribute("id", i);
			rmbtn.appendChild(rmtext);
			li.appendChild(song);
			li.appendChild(rmbtn);
			// li.innerHTML = playlistArray[i] ;
			ul.appendChild(li);
			console.log(li.outerHTML);
		}

	    // var buttons = document.getElementsByClassName('remove');
     //    for (var i=0; i < buttons.length; i++) {
     //      buttons[i].addEventListener('click', remove(i, "playlist"));
     //    }
	}
}

function remove(index, list) {
    var songlist = getStoreArray();
    songlist.splice(index, 1);
    localStorage.setItem(list, JSON.stringify(songlist));

    // loadPlaylist();

    return false;
}