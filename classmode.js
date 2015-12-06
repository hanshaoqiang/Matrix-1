/* -----------------------------------------------------------------
	This function generates the minors of an element of a matrix
	Arguments : 
		1. Matrix 
		2. Index of the element for which the minors are required
 ----------------------------------------------------------------- */
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
/*  -----------------------------------------------------------------
	size and strictSize provide the matrix order.
	size is fast at the cost of unreliability.
	 - strictSize checks rows and coloumns of a matrix
	 - size checks rows but only the first column  
 ----------------------------------------------------------------- */
var size = function(matrix) {
	rows = matrix === undefined? 0: matrix.length;
	cols = matrix[0] === undefined? 0 : matrix[0].length;
	return [rows, cols];	
}

var strictSize = function(inputMatrix) {
	var cols = [];
	var rows = inputMatrix === undefined? 0 : inputMatrix.length;

	for(var i = 0; i < inputMatrix.length; i++ ) {
		cols.push(inputMatrix[i].length);
	}

	cols = cols.filter( function(val, index){
		return cols.indexOf(val) === index;
	});
	cols = cols.pop();
	return [rows, cols];			

}

/*  -----------------------------------------------------------------
 
	Checks if a given matrix is a square matrix

 ----------------------------------------------------------------- */
var squareMatrix = function(matrix) {
	return (strictSize(matrix)[0] === strictSize(matrix)[1])?true:false;		 
}

/*  -----------------------------------------------------------------
 
	Converts an N-dimensional matrix to 1-dimension array.

 ----------------------------------------------------------------- */

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

/*  -----------------------------------------------------------------
 
	Matrix constructor:
		- first argument for number of rows of the new matrix.
		- second argument for number of coloumns of the new matrix
		- third argument [is optional]: can be set as true or false. 
			- set third argument to true for creating identity matrix.
			- not setting as true creates null matrix.
		- properties : val
			- val is the matrix bound to the Matrix object instance. 

 ----------------------------------------------------------------- */

var Matrix = function(rows, cols, identity){
	this.val = [];
	identity = identity === true? true : false;
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
	this.determinant = (identity === true)? 1:0;
	this.adjoint = this.val;
}

/*  -----------------------------------------------------------------
 
	Matrix setter:
		- first argument is an array to be converted to a matrix.
		- second argument for number of rows of the new matrix.
		- third argument for number of coloumns of the new matrix.

 ----------------------------------------------------------------- */

Matrix.prototype.set = function(input, rows, cols, junk) {
	var pos = 0;
	var matrix = [];
	junk = junk || false;
	for( var i = 0; i < rows; i++ ) {
		var temp = [];
		for( var j = pos; j < cols + pos; j++ ) {
			temp.push(input[j]);
		}
		pos += cols;
		matrix.push(temp);
	}

	this.val = matrix;
	if(!junk){
		this.det();
		this.adj();		
	}
	return this;
}

/*  -----------------------------------------------------------------
 
	Matrix transpose:
		- 	Transposes an NxM matrix:
			by swapping the non left diagonal elements.
		-	Transposes an NxM matrix:
			-	by serialising the matrix.
			-	creating a new matrix using the Matrix.set() method.
			-	swapping rows and coloumns in the Matrix.set() method.

 ----------------------------------------------------------------- */


Matrix.prototype.transpose = function() {
	var matrix = this.val;
	var serial = serialize(matrix);
	var rows = size(matrix)[0];
	var cols = size(matrix)[1];
	if( rows !== cols) {
		this.val = this.set(serial, cols, rows).val;
	} else {
		var transpose = [];
		for(var i = 0; i < rows; i++ ) {
			var temp = [];
			for ( var j = 0; j < cols; j++ ) {
				temp.push(matrix[j][i]);
			}
			transpose.push(temp);
		}

	}
	this.val = transpose;
	return this;
}

/*  -----------------------------------------------------------------
 
	Matrix determinant:
		-	Calculates determinant of a matrix 

 ----------------------------------------------------------------- */

Matrix.prototype.det = function() {
	var matrix = this.val;
	var ans = 0;
	for (var i = 0; i < matrix[0].length; i++) {
			var subMatrixVal = matrixGenerator(matrix, 0, i);
			var subMatrixRows = size(subMatrixVal)[0];
			var subMatrixCols = size(subMatrixVal)[1];
			var subMatrix = new Matrix(subMatrixRows, subMatrixCols);
				subMatrix.set(serialize(subMatrixVal), subMatrixRows, subMatrixCols, true);
		if( size(subMatrixVal)[0] === 0) {
			ans = matrix[0].pop();
		} else if( size(matrix)[0] === 2 ){
			
			if( i%2 === 0 ){
				ans += matrix[0][i] * subMatrix.val[0][0]; 						
			} else {
				ans -= matrix[0][i] * subMatrix.val[0][0];
			}

		} else if( size(subMatrix.val)[0] === 2 ) {
			
			if( i%2 === 0 ){
				ans += matrix[0][i] * ( (subMatrix.val[0][0]*subMatrix.val[1][1]) - (subMatrix.val[0][1] * subMatrix.val[1][0]) ); 						
			} else {
				ans -= matrix[0][i] * ( (subMatrix.val[0][0]*subMatrix.val[1][1]) - (subMatrix.val[0][1] * subMatrix.val[1][0]) );
			}

		} else {

			if( i%2 === 0 ){
				ans += matrix[0][i] * subMatrix.det();	
			} else {
				ans -= matrix[0][i] * subMatrix.det();
			}

		}
	}
	this.determinant = ans;
	return this;
}

Matrix.prototype.adj = function(){
	var matrix = this.val;
	var adjoint = [], negative = -1;
	var rows = size(matrix)[0];
	
	if(rows === 1){
		this.adjoint = matrix;
		return this;
	} else if (rows === 2) {
		matrix = this.transpose().val;
		matrix[0][1] *= -1;
		matrix[1][0] *= -1;
		this.adjoint = matrix;
		return this;
	} else {

		for( var i = 0; i < matrix.length; i++ ) {
			var temp = [];
			for( var j = 0; j < matrix[i].length; j++ ) {
				
				negative *= -1;

				var subMatrixVal = matrixGenerator(matrix, i, j);
				var subMatrixRows = size(subMatrixVal)[0];
				var subMatrixCols = size(subMatrixVal)[1];

				var subMatrix = new Matrix(subMatrixRows, subMatrixCols);
					subMatrix.set(serialize(subMatrixVal), subMatrixRows, subMatrixCols, true);
				temp.push( subMatrix.det() * negative );
			}
			adjoint.push(temp);
		}

		this.adjoint = adjoint;
		this.adjoint = this.transpose().val;
		return this;

	}


}

Matrix.prototype.inv = function(){

	var matrix = this.val;

	if(!squareMatrix(matrix)){
		return "Not a square matrix";
	}

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

Matrix.prototype.disp = function(){
	var str = "";
	var matrix = this.val;
	for(var i = 0; i < matrix.length; i++) {
		str += "\n\t";
		for(var j = 0; j < matrix[i].length; j++) {
			if(j === 0 ){
				str += "|\t";
			}
			str += matrix[i][j] + "\t";
			if(j === matrix[i].length - 1) {
				str += "|";
			}
		}
	}
	return str;
}

Matrix.prototype.add = function(){
	var newMatrices = [];
	var current = this.val;
	var argumentLength = arguments.length;
	var rows = size(current)[0];
	var cols = size(current)[1];
	for(var i = 0; i < argumentLength; i++) {
		if(size(arguments[i])[0] !== size(current)[0] || size(arguments[i])[1] !== size(current)[1] ) {
			this.val = NaN;
			return this;
		} else {
			newMatrices.push(arguments[i]);			
		}
	}

	for(i = 0; i < argumentLength; i++) {
		for(var j = 0; j < rows; j++) {
			for(var k = 0; k < cols; k++) {
				current[j][k] += newMatrices[i][j][k];
			}	
		}		
	}
	this.val = current;
	return this;
}

Matrix.prototype.sub = function(){
	var newMatrices = [];
	var current = this.val;
	var argumentLength = arguments.length;
	var rows = size(current)[0];
	var cols = size(current)[1];
	for(var i = 0; i < argumentLength; i++) {
		if(size(arguments[i])[0] !== size(current)[0] || size(arguments[i])[1] !== size(current)[1] ) {
			this.val = NaN;
			return this;
		} else {
			newMatrices.push(arguments[i]);			
		}
	}

	for(i = 0; i < argumentLength; i++) {
		for(var j = 0; j < rows; j++) {
			for(var k = 0; k < cols; k++) {
				current[j][k] -= newMatrices[i][j][k];
			}	
		}		
	}
	this.val = current;
	return this;
}

Matrix.prototype.multiply = function(){
	var newMatrices = [];
	var current = this.val;
	var argumentLength = arguments.length;

	for(var i = 0; i < argumentLength; i++) {
		newMatrices.push(arguments[i]);			
	}

	for(var i = 0; i < argumentLength; i++ ) {
	
		var rows = size(current)[0];
		var cols = size(current)[1];
		var newRows = size(newMatrices[i])[0];
		var newCols = size(newMatrices[i])[1];
		console.log("qualifier : " + cols +"x"+ newRows);
		console.log("new dimensions : " + rows +"x"+newCols);
		if(cols !== newRows) {
			this.val = [NaN];
			return this;
		}

		var product = new Matrix(rows, newCols);
		product = product.val;
	
		for(var j = 0; j < rows; j++ ) {
			for(var k = 0; k < size(newMatrices[i])[1]; k++) {
				for( var l = 0; l < cols; l++ ) {
					product[j][k] += current[j][l] * newMatrices[i][l][k];
				}
			}
		}
		current = product;		
	}
	this.val = product;
	return this;
}

Matrix.prototype.scale = function() {
	var matrix = this.val;
	var product = 1;
	var rows = size(matrix)[0];
	var cols = size(matrix)[1];

	for(var i = 0; i < argumentLength; i++) {
		product *= arguments[i];
	}

	for(var i = 0; i < rows; i++) {
		for(var j = 0; j < cols; j++) {
			matrix[i][j] *= product;
		}
	}
	this.val = matrix;
	return this;
}

Matrix.prototype.isEqual = function(matrix2) {
	var matrix = this.val;
	var rows = size(matrix)[0];
	var cols = size(matrix)[1];
	var newRows = size(matrix2)[0];
	var newCols = size(matrix2)[1];

	if(rows !== newRows || cols !== newCols) {
		return false;
	} else {

		for(var i = 0; i < rows; i++ ) {
			for(var j = 0; j < cols; j++ ) {
				if(matrix[i][j] !== matrix2[i][j]){
					return false;
				}
			}
		}
	}

	return true;
}

/* ==========================================================
	
	Implementing matrix methods

========================================================== */

var input = [1,2,3,0,-1,4,3,2,1];
var _3dMatrix = [
				[1, 2,  3],
				[0, -4, 1],
				[0, 3, -1]
			];

var _3dMatrix1 = [
				[1, 2,  3],
				[3, -3, 1],
				[0, 1, -1]
			];

var _3dMatrix2 = [
				[1, 2,  -3],
				[5, -4, 1],
				[0, -2, -1]
			];

var _4dMatrix = [
				[2, 5, -3,  -2],
				[-2, -3, 2, -5],
				[1, 3, -2,   0],
				[-1, -6, 4,  0]
			];

var _5dMatrix = [
				[1, 3, 1, 3,   1],
				[1, -1, 3, 4, -5],
				[1, 2, 7, 0,   5],
				[1, 2, 3, 4,  -5],
				[1, 0, -1, -4, 5],
			];

var _2dMatrix = [
				[5, -3],
				[1, 2]
			];
var _1dMatrix = [
					[1]
];
var matrix = new Matrix(2,2,true);
console.log(matrix.set([1,0,2,4], 2, 2));
// console.log(matrix.adj());
