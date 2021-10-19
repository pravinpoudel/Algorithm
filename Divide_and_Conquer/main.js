const Perf = require("performance-node");
const timeline = new Perf();

let A = [1, 2, 3, 4];
let B = [1, 2, 3, 4];

function schoolBack(A, B) {
  let solution = [];

  for (let i = 0; i < A.length + B.length - 1; i++) {
    solution[i] = 0;
  }

  // ierate through all the element of arrays and add the multiplied value to solution
  for (let i = 0; i < A.length; i++) {
    for (j = 0; j < B.length; j++) {
      solution[i + j] += A[i] * B[j];
    }
  }
  return solution;
}

// generate random number from -1 to 1
function getRandomDouble(n) {
  let randomDoubles = [];
  let max = 1;
  let min = -1;
  for (let i = 0; i < n; i++) {
    randomDoubles.push(Math.random() * (max - min + 1) + min);
  }
  return randomDoubles;
}

//divide array into two halves
function divideIntoHalf(A) {
  let half = Math.ceil(A.length / 2);
  let UpperHalf = A.slice(0, half);
  let lowerHalf = A.slice(-half);
  return [UpperHalf, lowerHalf];
}

// returned the sum of two array
function sumArray(A, B) {
  let sum = [];
  for (let i = 0; i < A.length; i++) {
    sum[i] = A[i] + B[i];
  }
  return sum;
}

// return the substracted result of B and C substracted from A
function substractArray(A, B, C) {
  let difference = [];
  for (let i = 0; i < A.length; i++) {
    difference[i] = A[i] - B[i] - C[i];
  }
  return difference;
}

// four subproblem Divide and Conquer strategy
function CAD4(A, B) {
  let A0, A1, B0, B1;
  let p0 = [];
  let p1 = [];
  let p2 = [];
  let p3 = [];
  let p4 = [];
  let solution = [];

  for (let i = 0; i < A.length + B.length - 1; i++) {
    solution[i] = 0;
  }

  if (A.length == 1) {
    return [A[0] * B[0], 0];
  }

  [A0, A1] = divideIntoHalf(A);
  [B0, B1] = divideIntoHalf(B);

  p0 = CAD4(A0, B0);
  p1 = CAD4(A0, B1);
  p2 = CAD4(A1, B0);
  p3 = CAD4(A1, B1);

  //   add two array p1 and p2
  for (let i = 0; i < p1.length; i++) {
    p4.push(p1[i] + p2[i]);
  }

  for (let i = 0, n = A.length; i < n; i++) {
    solution[i] += p0[i];
    solution[i + n / 2] += p1[i];
    solution[i + n / 2] += p2[i];
    solution[i + n] = p3[i];
  }
  return solution;
}

// three subproblem Divide and Conquer strategy
function CAD3(A, B) {
  let A0, A1, B0, B1;
  let p0 = [];
  let p1 = [];
  let p2 = [];
  let p3 = [];
  let p4 = [];
  let solution = [];

  for (let i = 0; i < A.length + B.length - 1; i++) {
    solution[i] = 0;
  }

  if (A.length == 1) {
    return [A[0] * B[0], 0];
  }

  [A0, A1] = divideIntoHalf(A);
  [B0, B1] = divideIntoHalf(B);

  //here isntead of four recursion we only have to do three recursion
  p0 = CAD3(A0, B0);
  p3 = CAD3(A1, B1);

  p1 = CAD3(sumArray(A0, A1), sumArray(B0, B1));

  p4 = substractArray(p1, p0, p3);

  for (let i = 0, n = A.length; i < n; i++) {
    solution[i] += p0[i];
    solution[i + n / 2] += p4[i];
    solution[i + n] = p3[i];
  }
  return solution;
}

for (i = 32; i < 1048576 * 32; i = 2 * i) {
  let data1 = getRandomDouble(i);
  let data2 = getRandomDouble(i);

  var start = timeline.now();
  let result1 = schoolBack(data1, data2);
  var end = timeline.now();
  console.log("school time for " + i + " elements " + (end - start));

  var start2 = timeline.now();
  let result2 = CAD4(data1, data2);
  var end2 = timeline.now();
  console.log("DAC 4 subprob time for " + i + " elements " + (end2 - start2));

  var start2 = timeline.now();
  let result3 = CAD3(data1, data2);
  var end2 = timeline.now();
  console.log("DAC 3 subprob time for  " + i + " elements " + (end2 - start2));
}
