/**
 * Convolution test class
 */


describe("Convolution network", function() {
    beforeEach(function() {
        this.convolution = new Convolution();
    });

    it("raises an exception when the convolution matrix isn't square", function() {
        var convolutionMatrix = [
            [ 1, 0, 1, 1 ],
            [ 0, 2, 0, 2 ],
            [ 1, 0, 1, 3 ]
        ];

        expect(this.convolution.setConvolutionMatrix.bind(this.convolution, convolutionMatrix)).toThrowError(ConvolutionMatrixNotSquareException);
    });

    it("raises an exception when the convolution matrix's length is not odd", function() {
        var convolutionMatrix = [
            [ 1, 0, 1, 1 ],
            [ 0, 2, 0, 2 ],
            [ 1, 0, 1, 3 ],
            [ 1, 0, 1, 3 ]
        ];

        expect(this.convolution.setConvolutionMatrix.bind(this.convolution, convolutionMatrix)).toThrowError(ConvolutionMatrixLengthEvenException);
    });

    it("processes a matrix with a 3x3 convolution matrix", function() {
        var inputMatrix = [
            [ 2, 1, 0, 2, 0, 1 ],
            [ 0, 1, 2, 2, 1, 1 ],
            [ 0, 3, 0, 0, 0, 2 ],
            [ 1, 1, 1, 0, 2, 2 ],
            [ 0, 0, 3, 1, 1, 2 ],
            [ 0, 1, 0, 0, 2, 0 ]
        ];

        var convolutionMatrix = [
            [ 1, 0, 1 ],
            [ 0, 2, 0 ],
            [ 1, 0, 1 ]
        ];

        var expectedOutputMatrix = [
            [ 4 , 10, 4, 7 ],
            [ 10, 4 , 6, 5 ],
            [ 5 , 6 , 4, 9 ],
            [ 2 , 8 , 7, 4 ]
        ];

        this.convolution.setInputMatrix(inputMatrix);
        this.convolution.setConvolutionMatrix(convolutionMatrix);

        var outputMatrix = this.convolution.compute();

        expect(outputMatrix).toEqual(expectedOutputMatrix);
    });
});