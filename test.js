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

/*-------------------------------------------------
	strictSize(matrix): 	Recommended when the matrix dimensions are
							unpredictable. 
-------------------------------------------------*/

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

var transpose = function(matrix) {
	var transposed = [];
	for(var i = 0; i < matrix.length; i++ ) {
		var temp = [];
		for (var j = 0; j < matrix[i].length; j++) {
			temp.push(matrix[j][i]);			
		}
		transposed.push(temp);
		temp = [];
	}
	return transposed;
}

var det = function(matrix){
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

var adj = function(matrix){
	var adjoint = [], negative = -1;
	for( var i = 0; i < matrix.length; i++ ) {
		var temp = [];
		for( var j = 0; j < matrix[i].length; j++ ) {
			negative *= -1;
			temp.push( det(matrixGenerator(matrix, i, j)) * negative );
		}
		adjoint.push(temp);
	}
	return transpose(adjoint);
}

var inv = function(matrix){
	var adjoint = adj(matrix);
	var determinant = det(matrix);
	var inverse = [];
	for(var i = 0; i < adjoint.length; i++ ){
		var temp = [];
		for(var j = 0; j < adjoint[i].length; j++ ){
			temp.push(adjoint[i][j]/determinant);
		}
		inverse.push(temp);
	}
	return inverse;
}

var displayMatrix = function(matrix){
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

/*=============================================================================================
testing the above functions; 
=============================================================================================*/

var myMatrix = [
				[1, 2,  3],
				[0, -4, 1],
				[0, 3, -1]
			];

var secondOrder = [
				[4, 3],
				[1, 2]
			];

var secondMatrix = [
				[2, 5, -3, -2],
				[-2, -3, 2, -5],
				[1, 3, -2, 0],
				[-1, -6, 4, 0]
			];
var thirdMatrix = [
				[1, 3, 0, 0, 0],
				[1, 2, 3, 4, 5],
				[1, 2, 3, 4, 5],
				[1, 2, 3, 4, 5],
				[1, 2, 3, 4, 5],
			];

var toAdjoint = [
					[1, 2, 3],
					[0, 1, 4],
					[5, 6, 0]
			];
/*console.log("===================================================");
console.log("1. size(myMatrix) = " + size(myMatrix));
console.log("===================================================");
console.log("2. strictSize(myMatrix) = " + strictSize(myMatrix));
console.log("===================================================");
console.log("3. transpose(matrix) = ");
console.log("for input =\n");
console.log(myMatrix);
console.log("\ngives output =\n");
console.log(transpose(myMatrix));
console.log("===================================================");
console.log("4. det(matrix) = ");
console.log("for input =\n");
console.log(myMatrix);
console.log("\ngives output =\n");*/
console.log(displayMatrix(myMatrix));