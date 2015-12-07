Installation
============
```shell
$ npm install matrixsoup
```

Matrix constructor
==================
1. first argument for number of rows of the new matrix.
2. second argument for number of columns of the new matrix
3. third argument [is optional]: can be set as true or false. 
	- set third argument to true for creating identity matrix.
	- not setting as true creates null matrix.
4. properties :
	- val 			: The matrix bound to the Matrix object instance. 
	- determinant	: The magnitude of the Matrix.
	- adjoint 		: The matrix formed by taking transpose of 
						cofactor-matrix of the original matrix.
	- inverse 		: if [A][B] = [I], where [A] and [B] are matrices of same order, 
						then [B] is inverse of [A]. This property holds true only 
						for square matrices having |A| != 0.						
						For non-square matrix, say A, the property 
						is set as [NaN] also for |A| = 0 matrices.

Usage
=====
```javascript
var Matrix = require('matrixsoup');
var _2DMatrix = new Matrix(2,2);
```
This will create a 2x2 matrix object which would appear as:
```shell
{ 
	val: [ [ 1, 0 ], [ 0, 1 ] ],
	determinant: 1,
	adjoint: [ [ 1, 0 ], [ 0, 1 ] ],
	inverse: [ NaN ] 
}

``` 
Methods
========
#1. Matrix setter:
```javascript
_2DMatrix.set([1,2,3,4],2,2);
```
1. First argument is an array to be converted to a matrix.
2. Second argument for number of rows of the new matrix.
3. Third argument for number of coloumns of the new matrix.
_isChainable: True_

