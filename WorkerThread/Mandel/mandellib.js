var canvas;
var ctx;

var i_max = 1.5;
var i_min = -1.5;
var r_min = -2.5;
var r_max = 1.5;

var max_iter = 1024;
var escape = 100;
var palette = [];

function createTask(row) {
	// body...
	var task = {
		//为哪一行创建像素值
		row: row,
		//一行的宽度
		width: rowData.width,
		//放大了多少次
		generation: generation,
		//要计算的区域
		r_min: r_min,
		r_max: r_max,
		i: i_max + (i_min - i_max) * row / canvas.height,
		//计算的精度
		max_iter: max_iter,
		escape: escape
	};
	return task;
}

//调色
function makePalette() {
	// body...
	function wrap(x) {
		// body...
		x = ((x + 256) & 0x1ff) - 256;
		if (x < 0) {
			x = -x;
		}
		return x;
	}
	for (var i = 0; i <= this.max_iter; i++) {
		palette.push([wrap(7*i), wrap(5*i), wrap(11*i)]);
	}
}

//使用调色板将从工作线程得到的结果，绘制在画布上
function drawRow(workerResults) {
	// 获得一行中的像素值
	var values = workerResults.values;
	//单行ImageData对象，包含画布中这一行的实际像素
	var pixelData = rowData.data;
	for (var i = 0; i < rowData.width; i++) {
		var red = i * 4;
		var green = i * 4 + 1;
		var blue = i * 4 + 2;
		var alpha = i * 4 + 3;
		pixelData[alpha] = 255;
		if (values[i] < 0) {
			pixelData[red] = pixelData[green] = pixelData[blue] = 0;
		} else {
			var color = this.palette[values[i]];
			pixelData[red] = color[0];
			pixelData[green] = color[1];
			pixelData[blue] = color[2];
		}
	}
	ctx.putImageData(this.rowData, 0, workerResults.row);
}

//建立所有图形绘制代码以及计算全局变量
function setupGraphics() {
	// body...
	canvas = document.getElementById("fractal");
	ctx = canvas.getContext("2d");
	// 将画布调整为浏览器大小
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var width = ((i_max - i_min) * canvas.width / canvas.height);
	var r_mid = (r_max + r_min) / 2;
	r_min = r_mid - width/2;
	r_max = r_mid + width/2;

	rowData = ctx.createImageData(canvas.width, 1);
	makePalette();
}
