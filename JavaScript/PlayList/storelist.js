function getStoreArray(key) {
	var playlistArray = localStorage.getItem(key);
	if (playlistArray == null || playlistArray == "") {
		playlistArray = new Array();
	}
	else{
		playlistArray = JSON.parse(playlistArray);
	}
	return playlistArray;
}

function getSavedSongs(list) {
	return getStoreArray(list);
}

function save(item){
	var playlistArray = getStoreArray("playlist");
	playlistArray.push(item);
	localStorage.setItem("playlist", JSON.stringify(playlistArray));
}

function loadPlaylist(list) {
	var playlistArray = getSavedSongs(list);
	var ul = document.getElementById(list);
	if (playlistArray.length) {
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
			ul.appendChild(li);
			console.log("Add html " + li.outerHTML);
		}

	    var buttons = document.getElementsByClassName('remove');
        for (var i=0; i < buttons.length; i++) {
	         buttons[i].onclick =  function () {
			    var that = this;
			    var index = that.getAttribute("id");
				var songlist = getStoreArray(list);
			    var delItem = songlist[index];
			    var isDel = confirm("你确定要删除："+delItem);

			    if (!isDel) { return; }
			    songlist.splice(index, 1);
			    localStorage.setItem(list, JSON.stringify(songlist));

			    location.reload(false);

			    return false;
			}
          console.log("Add eventListrener for " + buttons[i].outerHTML);
        }
	}
}