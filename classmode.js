function matrixGenerator(matrix, row, col) {
	var seedMatrix = [];	

	for (var i = 0; i < matrix.length; i++) {
		var temp = [];
		for (var j = 0; j < matrix[i].length; j++) {
			if( i !== row && j !== col ) {
				temp.push(matrix[i][j]);
			}
		}
		if(temp.length > 0){
			seedMatrix.push(temp);			
		}
	}
	return seedMatrix;
}

var size = function(matrix) {
	return [matrix.length, matrix[0].length];	
}

var squareMatrix = function(matrix) {
	(strictSize(matrix)[0] === strictSize(matrix)[1])?true:false;
}

var strictSize = function(inputMatrix) {
	var cols = [];
	
	for(var i = 0; i < inputMatrix.length; i++ ) {
		cols.push(inputMatrix[i].length);
	}

	cols = cols.filter( function(val, index){
		return cols.indexOf(val) === index;
	});

	if( cols.length === 1 ) {
		return [inputMatrix.length, inputMatrix[0].length];			
	} else {
		return "Error";
	}

}


var Matrix = function(rows, cols){
	this.val = [];
	for(var i = 0; i < rows; i++) {
		var temp = [];
		for( var j = 0; j < cols; j++) {
			if(i === j) {
				temp.push(1);
			} else {
				temp.push(0);
			}
		}
		this.val.push(temp);
	}
}

Matrix.prototype.set = function(input, rows, cols) {
	var pos = 0;
	var matrix = [];
	for( var i = 0; i < rows; i++ ) {
		var temp = [];
		for( var j = pos; j < cols + pos; j++ ) {
			temp.push(input[j]);
		}
		pos += rows;
		matrix.push(temp);
	}
	this.val = matrix;
	return this;
}

Matrix.prototype.transpose = function() {
	var matrix = this.val;
	var transposed = [];
	for(var i = 0; i < matrix.length; i++ ) {
		var temp = [];
		for (var j = 0; j < matrix[i].length; j++) {
			temp.push(matrix[j][i]);			
		}
		transposed.push(temp);
		temp = [];
	}
	this.val = transposed;
	return this;
}

Matrix.prototype.det = function() {
	var matrix = this.val;

	var ans = 0;
	for (var i = 0; i < matrix[0].length; i++) {
		var seedMatrix = matrixGenerator(matrix, 0, i);
	
		if( size(seedMatrix)[0] === 0) {
			ans = matrix[0];
		} else if( size(seedMatrix)[0] === 1 ){
			
			if( i%2 === 0 ){
				ans += matrix[0][i] * seedMatrix[0][0]; 						
			} else {
				ans -= matrix[0][i] * seedMatrix[0][0];
			}

		} else if( size(seedMatrix)[0] === 2 ) {
			
			if( i%2 === 0 ){
				ans += matrix[0][i] * ( (seedMatrix[0][0]*seedMatrix[1][1]) - (seedMatrix[0][1] * seedMatrix[1][0]) ); 						
			} else {
				ans -= matrix[0][i] * ( (seedMatrix[0][0]*seedMatrix[1][1]) - (seedMatrix[0][1] * seedMatrix[1][0]) );
			}

		} else {

			if( i%2 === 0 ){
				ans += matrix[0][i] * det(seedMatrix);	
			} else {
				ans -= matrix[0][i] * det(seedMatrix);
			}

		}
	}
	return ans;
}

Matrix.prototype.adj = function(){
	var matrix = this.val;
	// if(!squareMatrix(matrix)){
	// 	return "Not a square matrix";
	// }

	var adjoint = [], negative = -1;
	for( var i = 0; i < matrix.length; i++ ) {
		var temp = [];
		for( var j = 0; j < matrix[i].length; j++ ) {
			negative *= -1;
			temp.push( (matrixGenerator(matrix, i, j)).det() * negative );
		}
		adjoint.push(temp);
	}
	this.val = adjoint;
	this.val = this.val.transpose();
	return this;
}
/* ==========================================================
	
	Implementing matrix methods

========================================================== */

var input = [1,2,3,0,-1,4,3,2,1];
var matrix = new Matrix(3,3);
console.log(matrix.val);
console.log(matrix.set(input, 3, 3).val);
console.log(matrix.adj());

