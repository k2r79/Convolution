/**
 * Convolution main class
 */

var Convolution = function() {
    this.inputMatrix = [];
    this.convolutionMatrix = [];
};

Convolution.prototype.compute = function() {
    var outputMatrix = [];
    var matrixOffset = Math.floor(this.convolutionMatrix.length / 2);

    for (var y = matrixOffset; y < this.inputMatrix.length - matrixOffset; y++) {
        outputMatrix[y - matrixOffset] = [];
        for (var x = matrixOffset; x < this.inputMatrix[y].length - matrixOffset; x++) {
            outputMatrix[y - matrixOffset].push(this.convolveCell(y, x));
        }
    }

    return outputMatrix;
};

Convolution.prototype.convolveCell = function(inputMatrixY, inputMatrixX) {
    var value = 0;
    var matrixOffset = Math.floor(this.convolutionMatrix.length / 2);

    for (var y = 0; y < this.convolutionMatrix.length; y++) {
        for (var x = 0; x < this.convolutionMatrix[y].length; x++) {
            value += this.inputMatrix[inputMatrixY + y - matrixOffset][inputMatrixX + x - matrixOffset] * this.convolutionMatrix[y][x];
        }
    }

    return value;
};

Convolution.prototype.setInputMatrix = function(inputMatrix) {
    this.inputMatrix = inputMatrix;
};

Convolution.prototype.setConvolutionMatrix = function(convolutionMatrix) {
    this.isSquareMatrix(convolutionMatrix);

    if (convolutionMatrix.length % 2 != 1) {
        throw new ConvolutionMatrixLengthEvenException();
    }

    this.convolutionMatrix = convolutionMatrix;
};

Convolution.prototype.isSquareMatrix = function(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        if (matrix.length != matrix[y].length) {
            throw new ConvolutionMatrixNotSquareException();
        }
    }
};

/**
 * Convolution exceptions
 */

function ConvolutionMatrixNotSquareException(message) {
    this.name = "ConvolutionMatrixNotSquareException";
    this.message = message || "The convolution matrix isn't square";
};

ConvolutionMatrixNotSquareException.prototype = new Error();
ConvolutionMatrixNotSquareException.prototype.constructor = ConvolutionMatrixNotSquareException;

function ConvolutionMatrixLengthEvenException(message) {
    this.name = "ConvolutionMatrixLengthEvenException";
    this.message = message || "The convolution matrix's length cannot be even";

};
ConvolutionMatrixLengthEvenException.prototype = new Error();
ConvolutionMatrixLengthEvenException.prototype.constructor = ConvolutionMatrixLengthEvenException;

