//工作线程数
var numberOfWorkers = 8;
//工作线程池
var workers = [];
//该处理哪一行
var nextRow = 0;
//放大图像时，会开始计算一个新图像，会重启工作线程，统计计算的次数
var generation = 0;

window.onload = init;

function init() {
	setupGraphics();

	//
	// When you click on the canvas, the handler is called.
	// An event object is passed in that contains the
	//  x, y position of the mouse click. We pass those
	//  values to the click handler.
	//
	canvas.onclick = function(event) {
		handleClick(event.clientX, event.clientY);
	};
	//
	// When you resize the browser window, we need
	//	to resize the canvas and restart the workers.
	//
	window.onresize = function() {
		resizeToWindow();
	};

	//
	// Create all the workers and set up the message handler.  
	// 	Add each worker to the workers array.
	//
	for (var i = 0; i < numberOfWorkers; i++) {
		var worker = new Worker("worker.js");
		worker.onmessage = function (event) {
			// 将刚完成的工作线程传入自定义函数
			processWork(event.target, event.data);
		}
		worker.idle = true;
		//将完成过工作的线程放入工作线程池
		workers.push(worker);
	}
	//让线程池中的工作线程工作
	startWorkers();
}

function startWorkers() {
	// body...
	generation++;
	//从第一行开始
	nextRow = 0;

	for (var i = 0; i < workers.length; i++) {
		var worker = workers[i];

		if (worker.idle) {
			var task = createTask(nextRow);
			
			worker.idle = false;
			worker.postMessage(task);

			nextRow++;
		}
	}
}

function processWork(worker, workerResults) {
	if (workerResults.generation == generation) {
		drawRow(workerResults);
	}
	reassignWorker(worker);
}

function reassignWorker(worker) {
	// 下一个工作线程需要处理的行
	var row = nextRow++;
	//已经画到画布底部则停止工作
	if (row >= canvas.height) {
		worker.idle = true;
	} else {
		var task = createTask(row);
		worker.idle = false;
		worker.postMessage(task);
	}
}


// handleClick
//	This function takes the x, y position where the user
//		clicked and sets the parameters for the new
//		fractal. The zoom factor sets the new extent
//		of the bounds of the Mandelbrot set to the
//		zoomed in size. The new fractal maintains
//		the aspect ratio of the current canvas size.
//	We start the workers over on the new zoomed in
//		fractal.
//
function handleClick(x, y) {
	var width = r_max - r_min;
	var height = i_min - i_max;
	var click_r = r_min + ((width * x) / canvas.width);
	var click_i = i_max + ((height * y) / canvas.height);

	var zoom = 8;

	r_min = click_r - width/zoom;
	r_max = click_r + width/zoom;
	i_max = click_i - height/zoom;
	i_min = click_i + height/zoom;

	startWorkers();
}

//
// resizeToWindow
//	When the user resizes the browser window,
//		this function is called to resize the canvas,
//		and reset the fractal parameters (changing the
//		extent of the boundary and maintaining the new
//		aspect ratio of the window).
//	We restart the workers to compute the new fractal
//		based on the new size.
//
function resizeToWindow() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var width = ((i_max - i_min) * canvas.width / canvas.height);
	var r_mid = (r_max + r_min) / 2;
	r_min = r_mid - width/2;
	r_max = r_mid + width/2;
	rowData = ctx.createImageData(canvas.width, 1);

	startWorkers();
}

