var should 			= require("chai").should(),
	expect			= require("chai").expect,
	Matrix 			= require("../index"),
	matrixObject	= new Matrix(3,3);
	matrix 			= matrixObject.val;
	determinant		= matrixObject.determinant;
	adjoint			= matrixObject.adjoint;
	inverse			= matrixObject.inverse;

expect(matrixObject).to.be.an('object');
expect(matrix).to.be.an('array');
expect(determinant).to.be.a('number');
expect(adjoint).to.be.an('array');
expect(inverse).to.be.an('array');