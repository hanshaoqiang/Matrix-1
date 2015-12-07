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
console.log(_2DMatrix);
```
This will create a 2x2 matrix object which would appear as:
```javascript
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
#1. Matrix.set([array], rows, cols): 
_isChainable: True_
1. First argument is a 1-D array to be converted to a matrix.
2. Second argument for number of rows of the new matrix.
3. Third argument for number of coloumns of the new matrix.

This method will update the determinant, adjoint, inverse and string properties
each time it is called.

```javascript
console.log(_2DMatrix.set([1,2,3,4],2,2));
```
gives output:-
```javascript
{ val: [ [ 1, 2 ], [ 3, 4 ] ],
  determinant: -2,
  adjoint: [ [ 4, 2 ], [ -3, -1 ] ],
  inverse: [ [ -2, -1 ], [ 1.5, 0.5 ] ],
  valString: '\n\t|\t1\t2\t|\n\t|\t3\t4\t|',
  adjointString: '\n\t|\t4\t2\t|\n\t|\t-3\t-1\t|',
  inverseString: '\n\t|\t-2\t-1\t|\n\t|\t1.5\t0.5\t|' }
```
To understand the string properties, consider the following.
```javascript
console.log(_2DMatrix.valString);
console.log(_2DMatrix.adjointString);
console.log(_2DMatrix.inverseString);
```

```javascript
        |       1       2       | //valString
        |       3       4       |

        |       4       2       | //adjointString
        |       -3      -1      |

        |       -2      -1      | //inverseString
        |       1.5     0.5     |
```

#2. Matrix.transpose(): 
_isChainable: True_
Transposes an NxM matrix: the resultant matrix appears as if rotated 90° anti-clockwise.
The transpose method also updates the adjoint, inverse and the string representations.

```javascript
console.log(_2DMatrix.set([1,2,3,4],2,2));
console.log(_2DMatrix.transpose());
```

```javascript
{ val: [ [ 1, 2 ], [ 3, 4 ] ],							//Notice this...
  determinant: -2,
  adjoint: [ [ 4, 2 ], [ -3, -1 ] ],					//and this...
  inverse: [ [ -2, -1 ], [ 1.5, 0.5 ] ],				//along with this...	
  valString: '\n\t|\t1\t2\t|\n\t|\t3\t4\t|',
  adjointString: '\n\t|\t4\t2\t|\n\t|\t-3\t-1\t|',
  inverseString: '\n\t|\t-2\t-1\t|\n\t|\t1.5\t0.5\t|' } //setter call ending

{ val: [ [ 1, 3 ], [ 2, 4 ] ],							//transpose of the value
  determinant: -2,										// no effect to the determinant
  adjoint: [ [ 4, -3 ], [ 2, -1 ] ],					//transposes the adjoint
  inverse: [ [ -2, 1.5 ], [ -1, 0.5 ] ],				//and the inverse matrices
  valString: '\n\t|\t1\t3\t|\n\t|\t2\t4\t|',			//bound to the matrix object
  adjointString: '\n\t|\t4\t-3\t|\n\t|\t2\t-1\t|',
  inverseString: '\n\t|\t-2\t1.5\t|\n\t|\t-1\t0.5\t|' } //transpose call ending
  														//Cool?!
```
