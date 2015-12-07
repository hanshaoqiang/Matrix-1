Matrix constructor:
--------------------
1 first argument for number of rows of the new matrix.
2 second argument for number of coloumns of the new matrix
3 third argument [is optional]: can be set as true or false. 
	- set third argument to true for creating identity matrix.
	- not setting as true creates null matrix.

4 properties :
	- val 			: The matrix bound to the Matrix object instance. 
	- determinant	: The magnitude of the Matrix.
	- adjoint 		: The matrix formed by taking transpose of 
						cofactor-matrix of the original matrix.
	- inverse 		: if [A][B] = [I], then [B] is inverse of [A].
						this property pertains only to square matrices, 
						having |A| != 0.						
						For non-square matrix, say A the property 
						is set as [NaN] also for |A| = 0 matrices.

Usage
-----
```javascript
var Matrix = require('matrixsoup');
var _2DMatrix = new Matrix(2,2);
```

