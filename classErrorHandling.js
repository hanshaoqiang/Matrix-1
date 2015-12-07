function dimensionError(){
	this.message = "Method is applicable for square matrices";
	this.name = "Dimension Error";
}

function inverseError(){
	this.message = "The determinant of the matrix is = 0.\nMatrix has no inverse";
	this.name = "Inversion Error";
}

function notMatrixError(){
	this.message = "Matrix should have been passed";
	this.name = "Matrix not found error";
}

dimensionError.prototype = new Error();
inverseError.prototype = new Error();
notMatrixError.prototype = new Error();

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

	try{ 
		var sizeError = new notMatrixError();
		if( matrix === undefined || matrix[0] === undefined) {
			throw sizeError;
		}

		return [matrix.length, matrix[0].length];	
	} catch (e) {
		console.log("================================================================================");
		console.log(e.name + " : "+ e.message);
		console.log(e.stack);
		console.log("\n================================================================================");
	}
}

var squareMatrix = function(matrix) {
	try{
		var squareError = new dimensionError();
		if(strictSize(matrix)[0] === strictSize(matrix)[1]) {
			throw squareError;
		}
		return (strictSize(matrix)[0] === strictSize(matrix)[1])?true:false;		 
	} catch (e) {
		console.log("================================================================================");
		console.log(e.name + " : "+ e.message);
		console.log(e.stack);
		console.log("\n==============================================================================");
	}
}

var strictSize = function(inputMatrix) {
	var cols = [];
	
	for(var i = 0; i < inputMatrix.length; i++ ) {
		cols.push(inputMatrix[i].length);
	}

	cols = cols.filter( function(val, index){
		return cols.indexOf(val) === index;
	});

	try{ 
		var sizeError = new notMatrixError();
		if( matrix === undefined || matrix[0] === undefined) {
			throw sizeError;
		}
		return [inputMatrix.length, inputMatrix[0].length];			
	} catch (e) {
		console.log("================================================================================");
		console.log(e.name + " : "+ e.message);
		console.log(e.stack);
		console.log("\n==============================================================================");
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

	var ans = 0;
	for (var i = 0; i < matrix[0].length; i++) {

		var subMatrixVal = matrixGenerator(matrix, 0, i);
		var subMatrixRows = size(subMatrixVal)[0];
		var subMatrixCols = size(subMatrixVal)[1];
		var subMatrix = new Matrix(subMatrixRows, subMatrixCols);
			subMatrix.set(serialize(subMatrixVal), subMatrixRows, subMatrixCols);

		if( size(subMatrix.val)[0] === 0) {
			ans = matrix[0];
		} else if( size(subMatrix.val)[0] === 1 ){
			
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
	return ans;
}

Matrix.prototype.adj = function(){
	var matrix = this.val;
	var adjoint = [], negative = -1;
	for( var i = 0; i < matrix.length; i++ ) {
		var temp = [];
		for( var j = 0; j < matrix[i].length; j++ ) {
			
			negative *= -1;

			var subMatrixVal = matrixGenerator(matrix, i, j);
			var subMatrixRows = size(subMatrixVal)[0];
			var subMatrixCols = size(subMatrixVal)[1];

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

	if(!squareMatrix(matrix)){
		return "Not a square matrix";
	}

	try {
		var det = this.det();
		var invError = new inverseError();
		throw invError;		
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
	} catch (e) {
		console.log("================================================================================");
		console.log(e.name + " : "+ e.message);
		console.log(e.stack);
		console.log("\n==============================================================================");
	}


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
				[4, 3],
				[1, 2]
			];

var matrix = new Matrix(3,3,true);
console.log(matrix.set(serialize(_5dMatrix),5,5).inv());
// console.log(matrixGenerator(_2dMatrix,0,0));