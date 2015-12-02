/*----------------------------------	
	Matrix operations :
		1. Add
		2. Subtract
		3. Multiply
		4. Inversion
		5. Transpose
		6. Adjoint
-----------------------------------*/

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

/*-------------------------------------------------
	strictSize(matrix): 	Recommended when the matrix dimensions are
							unpredictable. 
-------------------------------------------------*/

module.exports = {

	size: function(matrix) {
		return [matrix.length, matrix[0].length];	
	},

	squareMatrix: function(matrix) {
		(strictSize(matrix)[0] === strictSize(matrix)[1])?true:false;
	},

	strictSize: function(inputMatrix) {
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

	},

	transpose: function(matrix) {
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
	},

	det: function(matrix){

		if(!squareMatrix(matrix)){
			return "not a square matrix";
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
	},

	adj: function(matrix){

		if(!squareMatrix(matrix)){
			return "Not a square matrix";
		}

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
	},

	inv: function(matrix){
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
	},

};


