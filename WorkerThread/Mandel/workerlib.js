function computeRow(task) {
	// body...
	var iter = 0;
	var c_i = task.i;
	var max_iter = task.max_iter;
	var escape = task.escape * task.escape;
	//为task对象新增一个数组属性，存放各像素的值
	task.values = [];
	//行中的各个像素
	for (var i = 0; i < task.width; i++) {
		var c_r = task.r_min + (task.r_max - task.r_min) * i / task.width;
		var z_r = 0, z_i = 0;
		//查找每个像素对应的适当值，复杂计算，多核并行计算可以提高计算速度
		for (iter = 0; z_r*z_r + z_i*z_i < escape && iter < max_iter; iter++) {
			var tmp = z_r*z_r - z_i*z_i + c_r;
			z_i = 2 * z_r * z_i + c_i;
			z_r = tmp; 
		}
		if (iter == max_iter) {
			iter = -1;
		}
		//将计算结果存入数组，再放入task对象
		task.values.push(iter);
	}
	return task;	
}