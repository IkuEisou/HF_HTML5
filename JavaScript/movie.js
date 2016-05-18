
function movie(title, genre, rating, showtimes) {
	// body...
	this.title = title;
	this.genre = genre;
	this.rating = rating;
	this.showtimes = showtimes;
	this.getNextShowing = function (movie) {
	var now = new Date().getTime();

		for (var i = 0; i < this.showtimes.length; i++) {
			var showtime = getTimeFromString(this.showtimes[i]);
			if ((showtime - now)>0) {
				return "Next showing of " + this.title + " is " + this.showtimes[i];
			}
		}
		return null;
	}
}

function getTimeFromString(timeString) {
	// body...
	var theTime = new Date();
	var time = timeString.match(/(\d+)(?::(\d\d))?\s*(p?)/);
	theTime.setHours( parseInt(time[1]) + (time[3]? 12 : 0) );
	theTime.setMinutes( parseInt(time[2]) || 0 );
	return theTime.getTime();
}

var movie1 = new movie("Plan 9 frome Outer Space",  "Cult Classic", 5, ["3:00pm","7:00pm","11:00pm"]);
var movie2 = new movie("Forbidden Planet", "Classic Sci-fi", 5, ["5:00pm","9:00pm"]);
var nextShowing = movie1.getNextShowing();

nextShowing = movie2.getNextShowing();

//For node.js
console.log(nextShowing);
console.log(nextShowing);

//For Browser
//alert(nextShowing);
//alert(nextShowing);