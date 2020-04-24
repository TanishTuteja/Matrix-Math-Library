const Matrix = require("../src/Matrix");

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

test("display test", () => {
  global.console.table = jest.fn();

  let m = new Matrix(3, 2);
  m.display();

  expect(global.console.table).toHaveBeenCalledWith(m.matrix);
});

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

test("non-static map test", () => {
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

test("non-static toArray test", () => {
  let m = new Matrix(3, 2);
  m.matrix = [
    [1, 2],
    [3, 4],
    [5, 6],
  ];

  let array = m.toArray();

  expect(array).toEqual([1, 2, 3, 4, 5, 6]);
});

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

test("static map test", () => {
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

test("static fromArray test", () => {
  let array = [12, 10, 5, 4, 3];
  let m = Matrix.fromArray(array);

  expect(m).toEqual({
    rows: 5,
    cols: 1,
    matrix: [[12], [10], [5], [4], [3]],
  });
});

test("static toArray test", () => {
  let m = new Matrix(3, 2);
  m.matrix = [
    [1, 2],
    [3, 4],
    [5, 6],
  ];

  let array = Matrix.toArray(m);

  expect(array).toEqual([1, 2, 3, 4, 5, 6]);
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
