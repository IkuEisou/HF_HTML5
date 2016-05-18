window.onload = init;
var lastReportTime = 0;
function init() {
	// var button = document.getElementById("amilucky");
	// button.onclick = getSales;
	setInterval(addScriptTag, 3000);
// 	var url = "http://wickedlysmart.com/ifeelluckytoday";
// 	var request = new XMLHttpRequest();
// 	request.onload = function() {
// 		if (request.status == 200) {
// 			displayLuck(request.responseText);
// 		}
// 		else{
// 			alert("API is unavailable!");
// 		}
// 	};
// 	request.open("GET", url);
// 	request.send(null);
}

function getSales() {
	// body...
   alert("I'm alive");
}
function displayLuck(luck) {
	var p = document.getElementById("luck");
	p.innerHTML = "Today you are " + luck;
}

function getLuck(luck) {
	var p = document.getElementById("luck");
	p.innerHTML = "Today you are " + luck;
}

function addScriptTag() {
	var url = "http://gumball.wickedlysmart.com/?callback=updateSales" + 
	"&lastreporttime=" + lastReportTime;
    var newScriptElement = document.createElement('script');
    newScriptElement.setAttribute("src", url);
    newScriptElement.setAttribute("id", "jsonp");

    var oldScriptElement = document.getElementById("jsonp");
    var head = document.getElementsByTagName("head")[0];
    if (oldScriptElement == null) {
    	head.appendChild(newScriptElement);
    }
    else{
    	head.replaceChild(newScriptElement, oldScriptElement);
    }
}


//回调函数的写法，自定义的回调函数result：
    function updateSales(sales) {
		var salesDiv = document.getElementById("luck");
		for(var i=0; i<sales.length; i++){
			var sale = sales[i];
			var div = document.createElement("div");
			div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
			salesDiv.appendChild(div);
		}
		if (sales.length > 0) {
			lastReportTime = sales[sales.length-1].time;
		}
	}