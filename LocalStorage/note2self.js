window.onload = init;

function init(argument) {
	var button = document.getElementById("add_button");
	var stickiesArray = getStickiesArray();
	button.onclick = createSticky;

	for (var i = stickiesArray.length - 1; i >= 0; i--) {
		var key = stickiesArray[i];
		var value = JSON.parse(localStorage[key]);
		addStickyToDOM(key, value);
	}
}

function addStickyToDOM(key, stickyObj) {
	// body...
	var stickies = document.getElementById("stickies");
	var sticky = document.createElement("li");
	var span = document.createElement("span");
	sticky.setAttribute("id", key);
	sticky.style.backgroundColor = stickyObj.color;
	span.innerHTML = stickyObj.value;
	sticky.appendChild(span);
	stickies.appendChild(sticky);
	sticky.onclick = deleteSticky;
}

function createSticky(argument) {
	// body...
	var note_text = document.getElementById("note_text").value;
	var curDate = new Date();
	var time = curDate.getTime();
	var key = "sticky_" + time;

	var colorSelectObj = document.getElementById("note_color");
	var index = colorSelectObj.selectedIndex;
	var color = colorSelectObj[index].value;
	var stickyObj = {
		"value": note_text,
		"color": color
	};
	var stickiesArray = getStickiesArray();
	stickiesArray.push(key);
	localStorage.setItem(key, JSON.stringify(stickyObj));
	localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
	addStickyToDOM(key, stickyObj);
}

function getStickiesArray() {
	// body...
	var stickiesArray = localStorage.getItem("stickiesArray");
	if (stickiesArray == "undefined") {
		stickiesArray = [];
		localStorage.setItem("stickiesArray", JSON.stringify(getStickiesArray));
	}else{
		stickiesArray = JSON.parse(stickiesArray);
	}

	return stickiesArray;
}

function deleteSticky(e) {
	// body...
	var key = e.target.id;
	if (e.target.tagName.toLowerCase() == "span") {
		key = e.target.parentNode.id;
	}
	localStorage.removeItem(key);
	var stickiesArray = getStickiesArray();
	if (stickiesArray) {
		for (var i = stickiesArray.length - 1; i >= 0; i--) {
			if (key == stickiesArray[i] ) {
				stickiesArray.splice(i,1);
			}
		}
		localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
		removeStickyFromDOM(key);
	}
}

function removeStickyFromDOM(key) {
	// body...
	var stickies = document.getElementById("stickies");
	var sticky = document.getElementById(key);

	stickies.removeChild(sticky);
}