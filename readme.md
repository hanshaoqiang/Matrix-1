Installation
============
```shell
$ npm install matrixsoup
```

Matrix constructor
==================
1. First argument for number of rows of the new matrix.
2. Second argument for number of columns of the new matrix
3. Third argument [is optional]: can be set as true or false. 
	- set third argument to true for creating identity matrix.
	- not setting as true creates null matrix.
4. Properties :
	- val 			: The matrix bound to the Matrix object instance. 
	- determinant	: The magnitude of the Matrix.
	- adjoint 		: The matrix formed by taking transpose of 
						cofactor-matrix of the original matrix.
	- inverse 		: if [A][B] = [I], where [A] and [B] are matrices of same order, 
						then [B] is inverse of [A]. This property holds true only 
						for square matrices having |A| != 0.						
						For non-square matrix, say A, the property 
						is set as [NaN] also for |A| = 0 matrices.
5. String representations :
	-valString
	-adjointString
	-inverseString

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
	inverse: [ [ 1, 0 ], [ 0, 1 ] ],
	valString: '\n\t|\t1\t0\t|\n\t|\t0\t1\t|',
	adjointString: '\n\t|\t1\t0\t|\n\t|\t0\t1\t|',
	inverseString: '\n\t|\t1\t0\t|\n\t|\t0\t1\t|'
}

```

Methods
========
#1. Matrix setter: _isChainable: True_
```javascript
_2DMatrix.set([1,2,3,4],2,2);
```
gives output:-
```shell
{ val: [ [ 1, 2 ], [ 3, 4 ] ],
  determinant: -2,
  adjoint: [ [ 4, 2 ], [ -3, -1 ] ],
  inverse: [ [ -2, -1 ], [ 1.5, 0.5 ] ],
  valString: '\n\t|\t1\t2\t|\n\t|\t3\t4\t|',
  adjointString: '\n\t|\t4\t2\t|\n\t|\t-3\t-1\t|',
  inverseString: '\n\t|\t-2\t-1\t|\n\t|\t1.5\t0.5\t|' }
```

```javascript
console.log(_2DMatrix.valString);
console.log(_2DMatrix.adjointString);
console.log(_2DMatrix.inverseString);
```

```shell
        |       1       2       |
        |       3       4       |

        |       4       2       |
        |       -3      -1      |

        |       -2      -1      |
        |       1.5     0.5     |

```
1. First argument is an array to be converted to a matrix.
2. Second argument for number of rows of the new matrix.
3. Third argument for number of coloumns of the new matrix.

This method will update the determinant, adjoint, inverse and string properties
each time it is called.



#2. Matrix transpose: _isChainable: True_

