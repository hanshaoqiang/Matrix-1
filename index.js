var xPose = function (matrix) {

	var serial = serialize(matrix);
	var rows = size(matrix)[0];
	var cols = size(matrix)[1];
	var temp = new Matrix(rows, cols);

	if( rows !== cols) {
		temp.set(serial, cols, rows, true);
		return temp.val;
	} else {
		var transpose = [];
		for(var i = 0; i < rows; i++ ) {
			var temp = [];
			for ( var j = 0; j < cols; j++ ) {
				temp.push(matrix[j][i]);
			}
			transpose.push(temp);
		}
		return transpose;
	}
}

var calcDeterminant = function(matrix){

		if(!squareMatrix(matrix)){
			return [NaN];
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
					ans += matrix[0][i] * calcDeterminant(seedMatrix);	
				} else {
					ans -= matrix[0][i] * calcDeterminant(seedMatrix);
				}

			}
		}
		return ans;
	}

var	calcAdjoint = function(matrix){

		if(!squareMatrix(matrix)){
			return [NaN];
		}

		var adjoint = [], negative = -1;

		for( var i = 0; i < matrix.length; i++ ) {
			var temp = [];
			for( var j = 0; j < matrix[i].length; j++ ) {
				temp.push( calcDeterminant(matrixGenerator(matrix, i, j)) );								
			}
			adjoint.push(temp);
		}
		adjoint = xPose(adjoint);
		for( var i = 0; i < adjoint.length; i++ ) {
			for( var j = 0; j < adjoint[i].length; j++ ) {
				if( ((i%2 === 0) && (j%2 !== 0)) || ((i%2 !== 0) && (j%2 === 0)) ) {
					adjoint[i][j] *= -1;
				} else {
					adjoint[i][j] *= 1;
				}
			}
		}
		return adjoint;
	}	

var calcInverse = function(matrix){

	if(!squareMatrix(matrix) || (calcDeterminant(matrix) === 0)){
		return [NaN];
	}

	var adjoint = calcAdjoint(matrix);
	var determinant = calcDeterminant(matrix);
	var inverse = [];
	for(var i = 0; i < adjoint.length; i++ ){
		var temp = [];
		for(var j = 0; j < adjoint[i].length; j++ ){
			temp.push(Math.round((adjoint[i][j]/determinant)*1000)/1000);
		}
		inverse.push(temp);
	}
	return inverse;
}

var stringer = function(matrix) {
	var str = "";
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

/* -----------------------------------------------------------------
	This function generates the minors of an element of a matrix
	Arguments : 
		1. Matrix. 
		2. Index of the element for which the minors are required.
 ----------------------------------------------------------------- */
var matrixGenerator = function (matrix, row, col) {
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
	size and strictSize provide the order for a matrix.
	size is faster at the cost of unreliability.
	 - strictSize checks rows and coloumns of a matrix.
	 - size checks rows but only the first column. 
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
 
	Checks if a given matrix is a square matrix.

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

/*  --------------------------------------------------------------------
 
	Matrix constructor:
		1 first argument for number of rows of the new matrix.
		2 second argument for number of coloumns of the new matrix
		3 third argument [is optional]: can be set as true or false. 
			- set third argument to true for creating identity matrix.
			- not setting as true creates null matrix.

		4 properties :
			a. val : The matrix bound to the Matrix object instance. 
			b. determinant: The magnitude of the Matrix.
			c. adjoint : The matrix formed by taking transpose of 
						cofactor-matrix of the original matrix.
			d. inverse : if [A][B] = [I], then [B] is inverse of [A].
						this property pertains only to square matrices, 
						having |A| != 0.						
						For non-square matrix, say A the property 
						is set as [NaN] also for |A| = 0 matrices.


 ---------------------------------------------------------------------- */

var Matrix = function(rows, cols, identity){
	this.val = [];
	identity = identity === false? false : true;
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
	this.inverse = (identity === true)?this.val:[NaN];
	this.stringify();
}

/*  -----------------------------------------------------------------
 
	Matrix setter:
		- first argument is an array to be converted to a matrix.
		- second argument for number of rows of the new matrix.
		- third argument for number of coloumns of the new matrix.
	@isChainable: True
 ----------------------------------------------------------------- */

Matrix.prototype.set = function(input, rows, cols) {
	var pos = 0;
	var matrix = [];
	for( var i = 0; i < rows; i++ ) {
		var temp = [];
		for( var j = pos; j < cols + pos; j++ ) {
			temp.push(input[j]);
		}
		pos += cols;
		matrix.push(temp);
	}
	this.val = matrix;
	this.det();
	this.adj();
	this.inv();		
	this.stringify();
	return this;
}

/*  --------------------------------------------------------------------------
 
	Matrix transpose:
		- 	Transposes an NxM matrix:
			the resultant matrix appears as if rotated 90 anti-clockwise.
	@isChainable: True
 --------------------------------------------------------------------------- */


Matrix.prototype.transpose = function() {
	var matrix = this.val;
	var adjoint = this.adjoint; 
	 var inverse = this.inverse;

	this.val = xPose(this.val);
	this.adjoint = xPose(this.adjoint);
	this.inverse = xPose(this.inverse);
	this.stringify();
	return this;
}

/*  -----------------------------------------------------------------
 
	Matrix determinant:
		-	Calculates determinant of a matrix 
	@isChainable: True
 ----------------------------------------------------------------- */

Matrix.prototype.det = function() {
	this.determinant = calcDeterminant(this.val);
	return this;
}

/*  -----------------------------------------------------------------
 
	Matrix Adjoint:
		-	Calculates adjoint of a matrix 
	@isChainable: True
 ----------------------------------------------------------------- */

Matrix.prototype.adj = function(){
	this.adjoint = calcAdjoint(this.val);	
	this.stringify();
	return this;	
}

/*  -----------------------------------------------------------------
 
	Matrix Inverse:
		-	Calculates inverse of a matrix 
	@isChainable: True
 ----------------------------------------------------------------- */


Matrix.prototype.inv = function(){

	this.inverse = calcInverse(this.val);
	this.stringify();
	return this;
}

/*  -----------------------------------------------------------------
 
	Matrix Stringify:
		-	Provides a string representation of the matrix 
	@isChainable: true
 ----------------------------------------------------------------- */


Matrix.prototype.stringify = function(){
	this.valString = stringer(this.val);
	this.adjointString = stringer(this.adjoint);
	this.inverseString = stringer(this.inverse);
	return this;
}

/*  -----------------------------------------------------------------
 
	Matrix Add([A], [B], [C],........[N]):
		-	Adds all the matrices given as argument to the function
			to the object.val matrix.
		-	recalculates the inverse, adjoint
			and determinant of the resultant matrix.
	@isChainable: true
 ----------------------------------------------------------------- */


Matrix.prototype.add = function(){
	var newMatrices = [];
	var current = this.val;
	var argumentLength = arguments.length;
	var rows = size(current)[0];
	var cols = size(current)[1];
	for(var i = 0; i < argumentLength; i++) {
		if(size(arguments[i])[0] !== rows || size(arguments[i])[1] !== cols ) {
			
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
	this.det();
	this.adj();
	this.inv();
	this.stringify();
	return this;
}

/*  -----------------------------------------------------------------
 
	Matrix Subtract([A], [B], [C],........[N]):
		-	Subtracts all the matrices given as argument to the 
			function from the object.val matrix.
		-	recalculates the inverse, adjoint
			and determinant of the resultant matrix.
	@isChainable: true
 ----------------------------------------------------------------- */

Matrix.prototype.sub = function(){
	var newMatrices = [];
	var current = this.val;
	var argumentLength = arguments.length;
	var rows = size(current)[0];
	var cols = size(current)[1];
	for(var i = 0; i < argumentLength; i++) {
		if(size(arguments[i])[0] !== size(current)[0] || size(arguments[i])[1] !== size(current)[1] ) {
				
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
	this.det();
	this.adj();
	this.inv();
	this.stringify();
	return this;
}

/*  -----------------------------------------------------------------
 
	Matrix multiply([A], [B], [C],........[N]):
		-	Multiplies the matrices given as argument to the function
			with the object.val matrix.
		-	recalculates the inverse, adjoint
			and determinant of the resultant matrix. 
	@isChainable: true
 ----------------------------------------------------------------- */

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
	this.det();
	this.adj();
	this.inv();
	this.stringify();
	return this;
}

/*  -----------------------------------------------------------------
 
	Matrix scale(A, B, C,........N):
		-	Multiplies the numbers given as argument to the function
			with the object.val matrix.
		-	recalculates the inverse, adjoint
			and determinant of the resultant matrix. 
	@isChainable: true
 ----------------------------------------------------------------- */

Matrix.prototype.scale = function() {
	var matrix = this.val;
	var product = 1;
	var rows = size(matrix)[0];
	var cols = size(matrix)[1];
	var argumentLength = arguments.length;	

	for(var i = 0; i < argumentLength; i++) {
		product *= arguments[i];
	}
	for(var i = 0; i < rows; i++) {
		for(var j = 0; j < cols; j++) {
			matrix[i][j] *= product;
		}
	}
	this.val = matrix;
	this.det();
	this.adj();
	this.inv();	
	return this;
}

/*  -----------------------------------------------------------------
 
	Matrix isEqual(A):
		-	Returns True 
				if the argument matrix is same as 
				object.val  matrix.
				Else returns False
	@isChainable: False
 ----------------------------------------------------------------- */

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

module.exports = Matrix;