const Matrix = require("../src/Matrix");
const errors = require("../src/Errors.js");
const MatrixTypeError = errors.MatrixTypeError;
const DimensionError = errors.DimensionError;

describe("Constructor Tests", () => {
  test("constructor test normal", () => {
    let m = new Matrix(3, 2);

    expect(m).toEqual({
      rows: 3,
      cols: 2,
      matrix: [
        [0, 0],
        [0, 0],
        [0, 0],
      ],
    });
  });

  test("constructor test decimal", () => {
    let m = new Matrix(2.1, 4.2);

    expect(m).toEqual({
      rows: 2,
      cols: 4,
      matrix: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    });
  });

  test("constructor test 0<r<1", () => {
    expect.assertions(2);
    try {
      let m = new Matrix(0.1, 4.2);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty("message", "Invalid values in Matrix constructor, rows and cols must be greater than or equal to 1");
    }
  });

  test("constructor test negative c", () => {
    expect.assertions(2);
    try {
      let m = new Matrix(3.2, -1.2);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty("message", "Invalid values in Matrix constructor, rows and cols must be greater than or equal to 1");
    }
  });

  test("constructor test argument type", () => {
    expect.assertions(2);
    try {
      let m = new Matrix(10, "check");
    } catch (error) {
      expect(error).toBeInstanceOf(MatrixTypeError);
      expect(error).toHaveProperty("message", "Invalid types in constructor, Number and Number expected");
    }
  });
});

describe("Randomize Tests", () => {
  test("randomize test with min and max", () => {
    let m = new Matrix(3, 2);
    m.randomize(25, 32);

    for (let i = 0; i < m.rows; i++) {
      for (let j = 0; j < m.cols; j++) {
        expect(m.matrix[i][j]).toBeGreaterThanOrEqual(25);
        expect(m.matrix[i][j]).toBeLessThan(32);
      }
    }
  });

  test("randomize test with only max", () => {
    let m = new Matrix(3, 2);
    m.randomize(45);

    for (let i = 0; i < m.rows; i++) {
      for (let j = 0; j < m.cols; j++) {
        expect(m.matrix[i][j]).toBeGreaterThanOrEqual(0);
        expect(m.matrix[i][j]).toBeLessThan(45);
      }
    }
  });

  test("randomize test with no arguements", () => {
    let m = new Matrix(3, 2);
    m.randomize();

    for (let i = 0; i < m.rows; i++) {
      for (let j = 0; j < m.cols; j++) {
        expect(m.matrix[i][j]).toBeGreaterThanOrEqual(0);
        expect(m.matrix[i][j]).toBeLessThan(1);
      }
    }
  });
});

describe("Map Function to Matrix Test", () => {
  test("non-static map test normal", () => {
    let m = new Matrix(3, 2);
    m.matrix = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];

    m.map((x) => x * 5);

    expect(m).toEqual({
      rows: 3,
      cols: 2,
      matrix: [
        [5, 10],
        [15, 20],
        [25, 30],
      ],
    });
  });

  test("static map test normal", () => {
    let m = new Matrix(3, 2);
    m.matrix = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];

    let m2 = Matrix.map(m, (x) => x * 5);

    expect(m2).toEqual({
      rows: 3,
      cols: 2,
      matrix: [
        [5, 10],
        [15, 20],
        [25, 30],
      ],
    });
  });

  test("non-static map test argument non-function", () => {
    expect.assertions(2);

    let m = new Matrix(3, 2);
    m.matrix = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];

    try {
      m.map(new Matrix(2, 4));
    } catch (error) {
      expect(error).toBeInstanceOf(MatrixTypeError);
      expect(error).toHaveProperty("message", "Invalid types in map, function expected");
    }
  });

  test("static map test argument non-function", () => {
    expect.assertions(2);

    let m = new Matrix(3, 2);
    m.matrix = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];

    try {
      Matrix.map(m, new Matrix(2, 4));
    } catch (error) {
      expect(error).toBeInstanceOf(MatrixTypeError);
      expect(error).toHaveProperty("message", "Invalid types in map, Matrix and function expected");
    }
  });

  test("static map test argument non-matrix", () => {
    expect.assertions(2);

    try {
      Matrix.map("Test", (x) => x * 10);
    } catch (error) {
      expect(error).toBeInstanceOf(MatrixTypeError);
      expect(error).toHaveProperty("message", "Invalid types in map, Matrix and function expected");
    }
  });
});

describe("toArray Tests", () => {
  test("non-static toArray test normal", () => {
    let m = new Matrix(3, 2);
    m.matrix = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];

    let array = m.toArray();

    expect(array).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("static toArray test normal", () => {
    let m = new Matrix(3, 2);
    m.matrix = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];

    let array = Matrix.toArray(m);

    expect(array).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("static toArray test argument non-Matrix", () => {
    expect.assertions(2);

    try {
      Matrix.toArray(20);
    } catch (error) {
      expect(error).toBeInstanceOf(MatrixTypeError);
      expect(error).toHaveProperty("message", "Invalid types in toArray, Matrix expected");
    }
  });
});

describe("fromArray Tests", () => {
  test("static fromArray test normal", () => {
    let array = [12, 10, 5, 4, 3];
    let m = Matrix.fromArray(array);

    expect(m).toEqual({
      rows: 5,
      cols: 1,
      matrix: [[12], [10], [5], [4], [3]],
    });
  });

  test("static fromArray test argument non-array", () => {
    expect.assertions(2);
    try {
      let m = Matrix.fromArray(2);
    } catch (error) {
      expect(error).toBeInstanceOf(MatrixTypeError);
      expect(error).toHaveProperty("message", "Invalid types in fromArray, array expected");
    }
  });
});

describe("Addition Tests", () => {
  test("non-static addElementwise test", () => {
    let m1 = new Matrix(3, 2);
    m1.matrix = [
      [10, -15],
      [12, 0.5],
      [5, 16],
    ];

    let m2 = new Matrix(3, 2);
    m2.matrix = [
      [12, 0.9],
      [500, 43],
      [-1, -0.5],
    ];

    m1.addElementwise(m2);

    expect(m1).toEqual({
      rows: 3,
      cols: 2,
      matrix: [
        [22, -14.1],
        [512, 43.5],
        [4, 15.5],
      ],
    });
  });

  test("non-static addScalar test", () => {
    let m = new Matrix(3, 2);
    m.matrix = [
      [10, -15],
      [12, 0.5],
      [5, 16],
    ];

    let scalar = -9;

    m.addScalar(scalar);

    expect(m).toEqual({
      rows: 3,
      cols: 2,
      matrix: [
        [1, -24],
        [3, -8.5],
        [-4, 7],
      ],
    });
  });

  test("static addElementwise test", () => {
    let m1 = new Matrix(3, 2);
    m1.matrix = [
      [10, -15],
      [12, 0.5],
      [5, 16],
    ];

    let m2 = new Matrix(3, 2);
    m2.matrix = [
      [12, 0.9],
      [500, 43],
      [-1, -0.5],
    ];

    let result = Matrix.addElementwise(m1, m2);

    expect(result).toEqual({
      rows: 3,
      cols: 2,
      matrix: [
        [22, -14.1],
        [512, 43.5],
        [4, 15.5],
      ],
    });
  });

  test("static addScalar test", () => {
    let m = new Matrix(3, 2);
    m.matrix = [
      [10, -15],
      [12, 0.5],
      [5, 16],
    ];

    let scalar = -9;

    let result = Matrix.addScalar(m, scalar);

    expect(result).toEqual({
      rows: 3,
      cols: 2,
      matrix: [
        [1, -24],
        [3, -8.5],
        [-4, 7],
      ],
    });
  });
});

describe("Subtration Tests", () => {
  test("non-static subtractElementwise test", () => {
    let m1 = new Matrix(3, 2);
    m1.matrix = [
      [10, -15],
      [12, 0.5],
      [5, 16],
    ];

    let m2 = new Matrix(3, 2);
    m2.matrix = [
      [-12, -0.9],
      [-500, -43],
      [1, 0.5],
    ];

    m1.subtractElementwise(m2);

    expect(m1).toEqual({
      rows: 3,
      cols: 2,
      matrix: [
        [22, -14.1],
        [512, 43.5],
        [4, 15.5],
      ],
    });
  });

  test("non-static subtractScalar test", () => {
    let m = new Matrix(3, 2);
    m.matrix = [
      [10, -15],
      [12, 0.5],
      [5, 16],
    ];

    let scalar = 9;

    m.subtractScalar(scalar);

    expect(m).toEqual({
      rows: 3,
      cols: 2,
      matrix: [
        [1, -24],
        [3, -8.5],
        [-4, 7],
      ],
    });
  });

  test("static subtractElementwise test", () => {
    let m1 = new Matrix(3, 2);
    m1.matrix = [
      [10, -15],
      [12, 0.5],
      [5, 16],
    ];

    let m2 = new Matrix(3, 2);
    m2.matrix = [
      [-12, -0.9],
      [-500, -43],
      [1, 0.5],
    ];

    let result = Matrix.subtractElementwise(m1, m2);

    expect(result).toEqual({
      rows: 3,
      cols: 2,
      matrix: [
        [22, -14.1],
        [512, 43.5],
        [4, 15.5],
      ],
    });
  });

  test("static subtractScalar test", () => {
    let m = new Matrix(3, 2);
    m.matrix = [
      [10, -15],
      [12, 0.5],
      [5, 16],
    ];

    let scalar = 9;

    let result = Matrix.subtractScalar(m, scalar);

    expect(result).toEqual({
      rows: 3,
      cols: 2,
      matrix: [
        [1, -24],
        [3, -8.5],
        [-4, 7],
      ],
    });
  });
});

describe("Multiplication Tests", () => {
  test("non-static multiplyElementwise test", () => {
    let m1 = new Matrix(3, 2);
    m1.matrix = [
      [10, -15],
      [12, 0.5],
      [5, 16],
    ];

    let m2 = new Matrix(3, 2);
    m2.matrix = [
      [-12, -0.9],
      [-500, -43],
      [1, 0.5],
    ];

    m1.multiplyElementwise(m2);

    expect(m1).toEqual({
      rows: 3,
      cols: 2,
      matrix: [
        [-120, 13.5],
        [-6000, -21.5],
        [5, 8],
      ],
    });
  });

  test("non-static multiplyScalar test", () => {
    let m = new Matrix(3, 2);
    m.matrix = [
      [10, -15],
      [12, 0.5],
      [5, 16],
    ];

    let scalar = -2;

    m.multiplyScalar(scalar);

    expect(m).toEqual({
      rows: 3,
      cols: 2,
      matrix: [
        [-20, 30],
        [-24, -1],
        [-10, -32],
      ],
    });
  });

  test("static multiplyElementwise test", () => {
    let m1 = new Matrix(3, 2);
    m1.matrix = [
      [10, -15],
      [12, 0.5],
      [5, 16],
    ];

    let m2 = new Matrix(3, 2);
    m2.matrix = [
      [-12, -0.9],
      [-500, -43],
      [1, 0.5],
    ];

    let result = Matrix.multiplyElementwise(m1, m2);

    expect(result).toEqual({
      rows: 3,
      cols: 2,
      matrix: [
        [-120, 13.5],
        [-6000, -21.5],
        [5, 8],
      ],
    });
  });

  test("static multiplyScalar test", () => {
    let m = new Matrix(3, 2);
    m.matrix = [
      [10, -15],
      [12, 0.5],
      [5, 16],
    ];

    let scalar = -2;

    let result = Matrix.multiplyScalar(m, scalar);

    expect(result).toEqual({
      rows: 3,
      cols: 2,
      matrix: [
        [-20, 30],
        [-24, -1],
        [-10, -32],
      ],
    });
  });
});

describe("Matrix Product Tests", () => {
  test("static matrixProduct test", () => {
    let m1 = new Matrix(3, 2);
    m1.matrix = [
      [10, -15],
      [12, 0.5],
      [5, 16],
    ];

    let m2 = new Matrix(2, 4);
    m2.matrix = [
      [12, 9, 0.2, 0.01],
      [500, 43, 9, -10],
    ];

    let result = Matrix.matrixProduct(m1, m2);

    expect(result).toEqual({
      rows: 3,
      cols: 4,
      matrix: [
        [-7380, -555, -133, 150.1],
        [394, 129.5, 6.9, -4.88],
        [8060, 733, 145, -159.95],
      ],
    });
  });
});

describe("Transpose Matrix Tests", () => {
  test("static transpose test", () => {
    let m = new Matrix(3, 2);
    m.matrix = [
      [1, 5],
      [2, 0.5],
      [0.01, 100],
    ];

    let mt = Matrix.transpose(m);

    expect(mt).toEqual({
      rows: 2,
      cols: 3,
      matrix: [
        [1, 2, 0.01],
        [5, 0.5, 100],
      ],
    });
  });
});

describe("Row Column Removal Tests", () => {
  test("Row Removal normal", () => {
    let m = new Matrix(3, 2);
    m.matrix = [
      [1, 2],
      [4, 2],
      [3, 6],
    ];
    let m2 = Matrix.removeRow(m, 2);
    expect(m2).toEqual({
      rows: 2,
      cols: 2,
      matrix: [
        [1, 2],
        [4, 2],
      ],
    });
  });

  test("Column Removal normal", () => {
    let m = new Matrix(4, 3);
    m.matrix = [
      [2, 1, 3],
      [2, 5, 6],
      [10, 8, 6],
      [27, 45, 3],
    ];
    let m2 = Matrix.removeCol(m, 1);
    expect(m2).toEqual({
      rows: 4,
      cols: 2,
      matrix: [
        [2, 3],
        [2, 6],
        [10, 6],
        [27, 3],
      ],
    });
  });
});

describe("Determinant Tests", () => {
  test("Base case non-static determinant test", () => {
    let m = new Matrix(1, 1);
    m.matrix = [[2]];
    let det = m.determinant();

    expect(det).toEqual(2);
  });

  test("Normal non-static determinant test", () => {
    let m = new Matrix(3, 3);
    m.matrix = [
      [2, 3, 1],
      [-4, 2, -1],
      [10, 1, 5],
    ];
    let det = m.determinant();
    expect(det).toEqual(28);
  });

  test("Base case static determinant test", () => {
    let m = new Matrix(1, 1);
    m.matrix = [[2]];
    let det = Matrix.determinant(m);

    expect(det).toEqual(2);
  });

  test("Normal static determinant test", () => {
    let m = new Matrix(3, 3);
    m.matrix = [
      [2, 3, 1],
      [-4, 2, -1],
      [10, 1, 5],
    ];
    let det = Matrix.determinant(m);
    expect(det).toEqual(28);
  });
});
