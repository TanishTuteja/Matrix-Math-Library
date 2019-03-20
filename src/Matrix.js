class Matrix {

  /**
   * Creates a new Matrix object to store data.
   * @constructor
   * @param {Number} rows - The number of rows in the matrix.
   * @param {Number} cols - The number of columns in the matrix.
   */

  constructor(rows, cols) {

    this.rows = rows;
    this.cols = cols;
    this.matrix = [];

    for (let i = 0; i < rows; i++) {

      this.matrix[i] = [];

      for (let j = 0; j < cols; j++) {

        this.matrix[i][j] = 0;

      }

    }

  }

  /**
   * Displays the matrix in the console.
   */
  display() {

    console.table(this.matrix);

  }

  /**
   * Randomizes the elements of the matrix with floating point numbers ranging from min to max.
   * @param {Number} [min=0] - The minimum value of elements (inclusive).
   * @param {Number} [max=1] - The maximum value of elements (exclusive).
   */
  randomize(min, max) {

    if (typeof min === "undefined") {
      min = 0;
      max = 1;
    } else if (typeof max === "undefined") {
      max = min;
      min = 0;
    }

    for (let i = 0; i < this.rows; i++) {

      for (let j = 0; j < this.cols; j++) {

        this.matrix[i][j] = Math.random() * (max - min) + min;

      }

    }

  }

  //This method uses p5.js, to be implemented independently
  /*randomizeGaussian() {
      for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
              this.matrix[i][j] = randomGaussian();
          }
      }
  }*/

  /**
   * Applies a function to all elements of the matrix.
   * @param {function} func - The function to be applied to the elements.
   */
  map(func) {

    for (let i = 0; i < this.rows; i++) {

      for (let j = 0; j < this.cols; j++) {

        let val = this.matrix[i][j];
        this.matrix[i][j] = func(val, i, j);

      }

    }

  }

  /**
   * Converts this matrix to a 1-D array by going from left to right for each row.
   * @returns {Number[]} result - A 1-D array containing the elements of the matrix.
   */
  toArray() {

    var result = [];

    for (var i = 0; i < this.rows; i++) {

      for (var j = 0; j < this.cols; j++) {

        result.push(this.matrix[i][j]);

      }
    }

    return result;

  }

  addElementwise(m) {

    if (m instanceof Matrix) {

      for (let i = 0; i < m.rows; i++) {

        for (let j = 0; j < m.cols; j++) {

          let value = this.matrix[i][j] + m.matrix[i][j];
          this.matrix[i][j] = value;

        }

      }

    } else {

      console.log("Invalid types in addElementWise, Matrix expected");

    }

  }

  addScalar(scalar) {

    for (let i = 0; i < this.rows; i++) {

      for (let j = 0; j < this.cols; j++) {

        let value = this.matrix[i][j] + scalar
        this.matrix[i][j] = value;

      }

    }

  }

  subtractElementwise(m) {

    if (m instanceof Matrix) {

      for (let i = 0; i < m.rows; i++) {

        for (let j = 0; j < m.cols; j++) {

          let value = this.matrix[i][j] - m.matrix[i][j];
          this.matrix[i][j] = value;

        }

      }

    } else {

      console.log("Invalid types in addElementWise, Matrix expected");

    }

  }

  subtractScalar(scalar) {

    for (let i = 0; i < this.rows; i++) {

      for (let j = 0; j < this.cols; j++) {

        let value = this.matrix[i][j] - scalar
        this.matrix[i][j] = value;

      }

    }

  }

  multiplyElementwise(m) {

    if (m instanceof Matrix) {

      for (let i = 0; i < m.rows; i++) {

        for (let j = 0; j < m.cols; j++) {

          let value = this.matrix[i][j] * m.matrix[i][j];
          this.matrix[i][j] = value;

        }

      }

    } else {

      console.log("Invalid types in addElementWise, Matrix expected");

    }

  }

  multiplyScalar(scalar) {

    for (let i = 0; i < this.rows; i++) {

      for (let j = 0; j < this.cols; j++) {

        let value = this.matrix[i][j] * scalar
        this.matrix[i][j] = value;

      }

    }

  }

  static map(m, func) {

    var result = new Matrix(m.rows, m.cols);

    for (let i = 0; i < m.rows; i++) {

      for (let j = 0; j < m.cols; j++) {

        let val = m.matrix[i][j];
        result.matrix[i][j] = func(val, i, j);

      }

    }

    return result;

  }

  static fromArray(array) {

    var result = new Matrix(array.length, 1);

    for (var i = 0; i < array.length; i++) {

      result.matrix[i][0] = array[i];

    }

    return result;

  }

  /**
   * Converts the specified matrix to a 1-D array by going from left to right for each row of the matrix.
   * @param {Matrix} m - The matrix object to be converted to array.
   * @returns {Number[]} result - A 1-D array containing the elements of the matrix m.
   * @static
   */
  static toArray(m) {

    var result = [];

    for (var i = 0; i < m.rows; i++) {

      for (var j = 0; j < m.cols; j++) {

        result.push(m.matrix[i][j]);

      }

    }

    return result;

  }

  static addElementwise(a, b) {

    if (a instanceof Matrix && b instanceof Matrix) {

      let result = new Matrix(a.rows, a.cols);

      for (let i = 0; i < a.rows; i++) {

        for (let j = 0; j < a.cols; j++) {

          result.matrix[i][j] = a.matrix[i][j] + b.matrix[i][j];

        }

      }

      return result;

    } else {

      console.log("Invalid types in addElementWise, Matrix expected");
      return null;

    }

  }

  static addScalar(matrix, scalar) {

    if (matrix instanceof Matrix) {

      let result = new Matrix(matrix.rows, matrix.cols);

      for (let i = 0; i < matrix.rows; i++) {

        for (let j = 0; j < matrix.cols; j++) {

          result.matrix[i][j] = matrix.matrix[i][j] + scalar;

        }

      }

      return result;

    } else {

      console.log("Invalid types in addScalar, Matrix expected");
      return null;

    }

  }

  static subtractElementwise(a, b) {

    if (a instanceof Matrix && b instanceof Matrix) {

      let result = new Matrix(a.rows, a.cols);

      for (let i = 0; i < a.rows; i++) {

        for (let j = 0; j < a.cols; j++) {

          result.matrix[i][j] = a.matrix[i][j] - b.matrix[i][j];

        }

      }

      return result;

    } else {

      console.log("Invalid types in subtractElementWise, Matrix expected");
      return null;

    }

  }

  static subtractScalar(matrix, scalar) {

    if (matrix instanceof Matrix) {

      let result = new Matrix(matrix.rows, matrix.cols);

      for (let i = 0; i < matrix.rows; i++) {

        for (let j = 0; j < matrix.cols; j++) {

          result.matrix[i][j] = matrix.matrix[i][j] - scalar;

        }

      }

      return result;

    } else {

      console.log("Invalid types in subtractScalar, Matrix expected");
      return null;

    }

  }

  static multiplyElementwise(a, b) {

    if (a instanceof Matrix && b instanceof Matrix) {

      let result = new Matrix(a.rows, a.cols);

      for (let i = 0; i < a.rows; i++) {

        for (let j = 0; j < a.cols; j++) {

          result.matrix[i][j] = a.matrix[i][j] * b.matrix[i][j];

        }

      }

      return result;

    } else {

      console.log("Invalid types in multiplyElementWise, Matrix expected");
      return null;

    }

  }

  static multiplyScalar(matrix, scalar) {

    if (matrix instanceof Matrix) {

      let result = new Matrix(matrix.rows, matrix.cols);

      for (let i = 0; i < matrix.rows; i++) {

        for (let j = 0; j < matrix.cols; j++) {

          result.matrix[i][j] = matrix.matrix[i][j] * scalar;

        }

      }

      return result;

    } else {

      console.log("Invalid types in multiplyScalar, Matrix expected");
      return null;

    }

  }

  /**
   * Multiplies two matrices according to the rules of matrix product. The number of columns of a must be equal to the number of rows of b.
   * @param {Matrix} a - First matrix object.
   * @param {Matrix} b - Second matrix object.
   * @returns {Matrix} result - The resultant matrix having number of rows equal to a and number of columns equal to b.
   * @static
   */
  static matrixProduct(a, b) {

    if (a instanceof Matrix && b instanceof Matrix && a.cols === b.rows) {

      let result = new Matrix(a.rows, b.cols);

      for (let i = 0; i < result.rows; i++) {

        for (let j = 0; j < result.cols; j++) {

          let sum = 0;

          for (let k = 0; k < a.cols; k++) {

            sum += a.matrix[i][k] * b.matrix[k][j];

          }

          result.matrix[i][j] = sum;

        }

      }

      return result;

    } else {

      console.log("Invalid types in matrixProduct, cols of matrix a should be equal to rows of matrix b expected");
      return null;

    }

  }

  static transpose(matrix) {

    if (matrix instanceof Matrix) {

      let result = new Matrix(matrix.cols, matrix.rows);

      for (let i = 0; i < matrix.rows; i++) {

        for (let j = 0; j < matrix.cols; j++) {

          result.matrix[j][i] = matrix.matrix[i][j];

        }

      }

      return result;

    } else {

      console.log("Invalid types in transpose, Matrix expected");
      return null;

    }

  }
}

if (typeof module !== "undefined") {

  module.exports = Matrix;

}