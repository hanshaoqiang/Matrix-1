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
	return (strictSize(matrix)[0] === strictSize(matrix)[1])?true:false;
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

var serialize = function(matrix){
		rows = size(matrix)[0],
		cols = size(matrix)[1],
		k	 = 0,
		vector = [];

	for(var i = 0; i < rows; i++ ) {
		for(var j = 0; j < cols; j++ ) {
			vector.push(matrix[i][j]);
		}
	}
	return vector;
}


var Matrix = function(rows, cols, identity){
	this.val = [];
	identity = identity || false;
	for(var i = 0; i < rows; i++) {
		var temp = [];
		for( var j = 0; j < cols; j++) {
			if(i === j && identity === true) {
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

	if(!squareMatrix(matrix)){
		return "Not a square matrix";
	}

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
	if(!squareMatrix(matrix)){
		return "Not a square matrix";
	}
	var adjoint = [], negative = -1;
	for( var i = 0; i < matrix.length; i++ ) {
		var temp = [];
		for( var j = 0; j < matrix[i].length; j++ ) {
			
			negative *= -1;

			var subMatrixVal = matrixGenerator(matrix, i, j),
				subMatrixRows = size(subMatrixVal)[0],
				subMatrixCols = size(subMatrixVal)[1];
			var subMatrix = new Matrix(subMatrixRows, subMatrixCols);
				subMatrix.set(serialize(subMatrixVal), subMatrixRows, subMatrixCols);
			temp.push( subMatrix.det() * negative );
		}
		adjoint.push(temp);
	}

	this.val = adjoint;
	this.val = this.transpose().val;
	return this;
}

Matrix.prototype.inv = function(){
	var matrix = this.val;
	var det = this.det();
	var adj = this.adj().val;
	var rows = size(adj)[0];
	var cols = size(adj)[1];
	
	for(var i = 0; i < rows; i++ ) {
		for ( var j = 0; j < cols; j++ ) {
			adj[i][j] /= det; 
		}
	}
	this.val = adj;
	return this;
}
/* ==========================================================
	
	Implementing matrix methods

========================================================== */

var input = [1,2,3,0,-1,4,3,2,1];
var secondMatrix = [
				[2, 5, -3,  -2],
				[-2, -3, 2, -5],
				[1, 3, -2,   0],
				[-1, -6, 4,  0]
			];
var matrix = new Matrix(3,3);
console.log(matrix.val);
console.log(matrix.set(input, 3, 3).val);
console.log(matrix.det());
console.log(matrix.inv());