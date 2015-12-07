Installation
============
```shell
$ npm install matrixsoup
```
Installs a 19.8KB package 

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
##1. Matrix.set([array], rows, cols): 
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

##2. Matrix.transpose(): 
_isChainable: True_

Transposes an NxM matrix: the resultant matrix appears as if rotated 90° anti-clockwise.
The transpose method also updates the adjoint, inverse and the string representations.

```javascript
console.log(_3DMatrix.set([1,2,3,4,4,6,5,3,2],3,3));
console.log(_3DMatrix.transpose());
```

```javascript
{ val: [ [ 1, 2, 3 ], [ 4, 4, 6 ], [ 5, 3, 2 ] ],									//Notice this...
  determinant: 10,
  adjoint: [ [ -10, 5, 0 ], [ 22, -13, 6 ], [ -8, 7, -4 ] ],						//and this...
  inverse: [ [ -1, 0.5, 0 ], [ 2.2, -1.3, 0.6 ], [ -0.8, 0.7, -0.4 ] ],				//this as well...
  valString: '\n\t|\t1\t2\t3\t|\n\t|\t4\t4\t6\t|\n\t|\t5\t3\t2\t|',
  adjointString: '\n\t|\t-10\t5\t0\t|\n\t|\t22\t-13\t6\t|\n\t|\t-8\t7\t-4\t|',
  inverseString: '\n\t|\t-1\t0.5\t0\t|\n\t|\t2.2\t-1.3\t0.6\t|\n\t|\t-0.8\t0.7\t-0.4\t|' }

{ val: [ [ 1, 4, 5 ], [ 2, 4, 3 ], [ 3, 6, 2 ] ],											//the value transposed
  determinant: 10,																			//determinant stays the same
  adjoint: [ [ -10, 22, -8 ], [ 5, -13, 7 ], [ 0, 6, -4 ] ],								//adjoing is transposed
  inverse: [ [ -1, 2.2, -0.8 ], [ 0.5, -1.3, 0.7 ], [ 0, 0.6, -0.4 ] ],						//and so is the inverse!
  valString: '\n\t|\t1\t4\t5\t|\n\t|\t2\t4\t3\t|\n\t|\t3\t6\t2\t|',
  adjointString: '\n\t|\t-10\t22\t-8\t|\n\t|\t5\t-13\t7\t|\n\t|\t0\t6\t-4\t|',				//this has impacted the
  inverseString: '\n\t|\t-1\t2.2\t-0.8\t|\n\t|\t0.5\t-1.3\t0.7\t|\n\t|\t0\t0.6\t-0.4\t|'	//string representations
}  																		//Cool! right?
```

##3. Matrix.add([A],([B],...)):
@isChainable: true

The add method allows variable number of matrices to be sent as arguments to be added with the matrix.
This updates the determinant, adjoint, inverse and string representations.

```javascript
var _3DMatrix1 = [
					[-1, -2, -1],
					[-1, 0,  -2],
					[-2, -3,  0]
];
var _3DMatrix2 = [
					[1, 0, 2],
					[4, 3, 3],
					[2, -3,4]
];
var _3DMatrix = new Matrix(2,2,true);	
_3DMatrix.set([1,2,3,4,4,6,5,3,2],3,3);
console.log(_3DMatrix.add(_3DMatrix1, _3DMatrix2));
```
The output
```javascript
{ val: [ [ 1, 0, 4 ], [ 7, 7, 7 ], [ 5, -3, 6 ] ],
  determinant: -161,
  adjoint: [ [ 63, -12, -28 ], [ -7, -14, 21 ], [ -56, 3, 7 ] ],
  inverse:
   [ [ -0.391, 0.075, 0.174 ],
     [ 0.043, 0.087, -0.13 ],
     [ 0.348, -0.019, -0.043 ] ],
  valString: '\n\t|\t1\t0\t4\t|\n\t|\t7\t7\t7\t|\n\t|\t5\t-3\t6\t|',
  adjointString: '\n\t|\t63\t-12\t-28\t|\n\t|\t-7\t-14\t21\t|\n\t|\t-56\t3\t7\t|',
  inverseString: '\n\t|\t-0.391\t0.075\t0.174\t|\n\t|\t0.043\t0.087\t-0.13\t|\n\t|\t0.348\t-0.019\t-0.043\t|' }
```

##4. Matrix.sub([A],([B],...)):
@isChainable: true

The sub method allows variable number of matrices to be sent as arguments to be subtracted from the matrix.
This updates the determinant, adjoint, inverse and string representations.

```javascript
_3DMatrix.set([1,2,3,4,4,6,5,3,2],3,3);
console.log(_3DMatrix.sub(_3DMatrix1, _3DMatrix2));
```
Gives output:
```javascript
{ val: [ [ 1, 4, 2 ], [ 1, 1, 5 ], [ 5, 9, -2 ] ],
  determinant: 69,
  adjoint: [ [ -47, 26, 18 ], [ 27, -12, -3 ], [ 4, 11, -3 ] ],
  inverse:
   [ [ -0.681, 0.377, 0.261 ],
     [ 0.391, -0.174, -0.043 ],
     [ 0.058, 0.159, -0.043 ] ],
  valString: '\n\t|\t1\t4\t2\t|\n\t|\t1\t1\t5\t|\n\t|\t5\t9\t-2\t|',
  adjointString: '\n\t|\t-47\t26\t18\t|\n\t|\t27\t-12\t-3\t|\n\t|\t4\t11\t-3\t|',
  inverseString: '\n\t|\t-0.681\t0.377\t0.261\t|\n\t|\t0.391\t-0.174\t-0.043\t|\n\t|\t0.058\t0.159\t-0.043\t|' 
}
```
##5. Matrix.multiply([A],([B],...)):
@isChainable: true

The multiply method allows variable number of matrices to be sent as arguments to be multiplied to the matrix.
This updates the determinant, adjoint, inverse and string representations.

```javascript
_3DMatrix.set([1,2,3,4,4,6,5,3,2],3,3);
console.log(_3DMatrix.multiply(_3DMatrix1, _3DMatrix2));
```
Gives output:
```javascript
{ val: [ [ -61, -18, -69 ], [ -144, -38, -163 ], [ -96, -18, -111 ] ],
  determinant: 588,
  adjoint: [ [ 1284, -756, 312 ], [ -336, 147, -7 ], [ -1056, 630, -274 ] ],
  inverse:
   [ [ 2.184, -1.286, 0.531 ],
     [ -0.571, 0.25, -0.012 ],
     [ -1.796, 1.071, -0.466 ] ],
  valString: '\n\t|\t-61\t-18\t-69\t|\n\t|\t-144\t-38\t-163\t|\n\t|\t-96\t-18\t-111\t|',
  adjointString: '\n\t|\t1284\t-756\t312\t|\n\t|\t-336\t147\t-7\t|\n\t|\t-1056\t630\t-274\t|',
  inverseString: '\n\t|\t2.184\t-1.286\t0.531\t|\n\t|\t-0.571\t0.25\t-0.012\t|\n\t|\t-1.796\t1.071\t-0.466\t|' }
```
##6. Matrix.scale(A,(B,...)):
@isChainable: true

The scale method allows variable number of numbers to be sent as arguments to be multiplied to the matrix as scalars.
All the arguments get multiplied first and then get multiplied to the matrix.
This updates the determinant, adjoint, inverse and string representations.

```javascript
_3DMatrix.set([1,2,3,4,4,6,5,3,2],3,3);
console.log(_3DMatrix.scale(2,5));
```
Gives output:
```javascript
{ val: [ [ 10, 20, 30 ], [ 40, 40, 60 ], [ 50, 30, 20 ] ],
  determinant: 10000,
  adjoint: [ [ -1000, 500, 0 ], [ 2200, -1300, 600 ], [ -800, 700, -400 ] ],
  inverse:
   [ [ -0.1, 0.05, 0 ],
     [ 0.22, -0.13, 0.06 ],
     [ -0.08, 0.07, -0.04 ] ],
  valString: '\n\t|\t10\t20\t30\t|\n\t|\t40\t40\t60\t|\n\t|\t50\t30\t20\t|',
  adjointString: '\n\t|\t-1000\t500\t0\t|\n\t|\t2200\t-1300\t600\t|\n\t|\t-800\t700\t-400\t|',
  inverseString: '\n\t|\t-0.1\t0.05\t0\t|\n\t|\t0.22\t-0.13\t0.06\t|\n\t|\t-0.08\t0.07\t-0.04\t|' }
```
##7. Matrix.isEqual([A]):
@isChainable: false

The isEqual method checks if the passed argument matrix is equal to the matrix object's val matrix property.
Returns true if equal.

```javascript
var _3DMatrix1 = [
					[-1, -2, -1],
					[-1, 0,  -2],
					[-2, -3,  0]
];
var _3DMatrix = new Matrix(2,2,true);	
_3DMatrix.set([1,2,3,4,4,6,5,3,2],3,3);
console.log(_3DMatrix.isEqual(_3DMatrix1));
``` 
```javascript
false
```
