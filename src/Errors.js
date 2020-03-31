class DimensionError extends Error {
  constructor(functionName, m1, m2) {
    super(
      "Different Dimensions in " +
        functionName +
        ". Dimensions of object => " +
        m1.rows +
        "x" +
        m1.cols +
        " while dimensions of passed argument => " +
        m2.rows +
        "x" +
        m2.cols
    );
  }
}

class MatrixTypeError extends Error {
  constructor(functionName) {
    super("Invalid types in " + functionName + ", Matrix expected");
  }
}

exports.MatrixTypeError = MatrixTypeError;
exports.DimensionError = DimensionError;
