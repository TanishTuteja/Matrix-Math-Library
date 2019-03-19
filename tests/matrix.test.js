const Matrix = require('../src/Matrix');

test('constructor test', () => {

  let m = new Matrix(3, 2);

  expect(m).toEqual({
    rows: 3,
    cols: 2,
    matrix: [
      [0, 0],
      [0, 0],
      [0, 0]
    ]
  });

});

test('display test', () => {

  global.console.table = jest.fn();

  let m = new Matrix(3, 2);
  m.display();

  expect(global.console.table).toHaveBeenCalledWith(m.matrix)

});

test('randomize test with min and max', () => {

  let m = new Matrix(3, 2);
  m.randomize(25, 32)

  for (let i = 0; i < m.rows; i++) {
    for (let j = 0; j < m.cols; j++) {

      expect(m.matrix[i][j]).toBeGreaterThanOrEqual(25);
      expect(m.matrix[i][j]).toBeLessThan(32);

    }
  }

});

test('randomize test with only max', () => {

  let m = new Matrix(3, 2);
  m.randomize(45);

  for (let i = 0; i < m.rows; i++) {
    for (let j = 0; j < m.cols; j++) {

      expect(m.matrix[i][j]).toBeGreaterThanOrEqual(0);
      expect(m.matrix[i][j]).toBeLessThan(45);

    }
  }

});

test('randomize test with no arguements', () => {

  let m = new Matrix(3, 2);
  m.randomize();

  for (let i = 0; i < m.rows; i++) {
    for (let j = 0; j < m.cols; j++) {

      expect(m.matrix[i][j]).toBeGreaterThanOrEqual(0);
      expect(m.matrix[i][j]).toBeLessThan(1);

    }
  }

});

test('non-static map test', () => {

  let m = new Matrix(3, 2);
  m.matrix = [
    [1, 2],
    [3, 4],
    [5, 6]
  ];

  m.map(x => x * 5);

  expect(m).toEqual({
    rows: 3,
    cols: 2,
    matrix: [
      [5, 10],
      [15, 20],
      [25, 30]
    ]
  });

});

test('static map test', () => {

  let m = new Matrix(3, 2);
  m.matrix = [
    [1, 2],
    [3, 4],
    [5, 6]
  ];

  let m2 = Matrix.map(m, x => x * 5);

  expect(m2).toEqual({
    rows: 3,
    cols: 2,
    matrix: [
      [5, 10],
      [15, 20],
      [25, 30]
    ]
  });

});

test('non-static toArray test', () => {

  let m = new Matrix(3, 2);
  m.matrix = [
    [1, 2],
    [3, 4],
    [5, 6]
  ];

  let array = m.toArray();

  expect(array).toEqual(
    [1, 2, 3, 4, 5, 6]
  );

});

test('static toArray test', () => {

  let m = new Matrix(3, 2);
  m.matrix = [
    [1, 2],
    [3, 4],
    [5, 6]
  ];

  let array = Matrix.toArray(m);

  expect(array).toEqual(
    [1, 2, 3, 4, 5, 6]
  );

});

test('static fromArray test', () => {

  let array = [12, 10, 5, 4, 3]
  let m = Matrix.fromArray(array);

  expect(m).toEqual({
    rows: 5,
    cols: 1,
    matrix: [
      [12],
      [10],
      [5],
      [4],
      [3]
    ]
  });

});

test('static transpose test', () => {

  let m = new Matrix(3, 2);
  m.matrix = [
    [1, 5],
    [2, 0.5],
    [0.01, 100]
  ]

  let mt = Matrix.transpose(m);

  expect(mt).toEqual({
    rows: 2,
    cols: 3,
    matrix: [
      [1, 2, 0.01],
      [5, 0.5, 100]
    ]
  });

});