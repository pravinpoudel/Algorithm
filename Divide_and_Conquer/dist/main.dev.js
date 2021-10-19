"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Perf = require("performance-node");

var timeline = new Perf();
var A = [1, 2, 3, 4];
var B = [1, 2, 3, 4];

function schoolBack(A, B) {
  var solution = [];

  for (var _i = 0; _i < A.length + B.length - 1; _i++) {
    solution[_i] = 0;
  } // ierate through all the element of arrays and add the multiplied value to solution


  for (var _i2 = 0; _i2 < A.length; _i2++) {
    for (j = 0; j < B.length; j++) {
      solution[_i2 + j] += A[_i2] * B[j];
    }
  }

  return solution;
} // generate random number from -1 to 1


function getRandomDouble(n) {
  var randomDoubles = [];
  var max = 1;
  var min = -1;

  for (var _i3 = 0; _i3 < n; _i3++) {
    randomDoubles.push(Math.random() * (max - min + 1) + min);
  }

  return randomDoubles;
} //divide array into two halves


function divideIntoHalf(A) {
  var half = Math.ceil(A.length / 2);
  var UpperHalf = A.slice(0, half);
  var lowerHalf = A.slice(-half);
  return [UpperHalf, lowerHalf];
} // returned the sum of two array


function sumArray(A, B) {
  var sum = [];

  for (var _i4 = 0; _i4 < A.length; _i4++) {
    sum[_i4] = A[_i4] + B[_i4];
  }

  return sum;
} // return the substracted result of B and C substracted from A


function substractArray(A, B, C) {
  var difference = [];

  for (var _i5 = 0; _i5 < A.length; _i5++) {
    difference[_i5] = A[_i5] - B[_i5] - C[_i5];
  }

  return difference;
} // four subproblem Divide and Conquer strategy


function CAD4(A, B) {
  var A0, A1, B0, B1;
  var p0 = [];
  var p1 = [];
  var p2 = [];
  var p3 = [];
  var p4 = [];
  var solution = [];

  for (var _i6 = 0; _i6 < A.length + B.length - 1; _i6++) {
    solution[_i6] = 0;
  }

  if (A.length == 1) {
    return [A[0] * B[0], 0];
  }

  var _divideIntoHalf = divideIntoHalf(A);

  var _divideIntoHalf2 = _slicedToArray(_divideIntoHalf, 2);

  A0 = _divideIntoHalf2[0];
  A1 = _divideIntoHalf2[1];

  var _divideIntoHalf3 = divideIntoHalf(B);

  var _divideIntoHalf4 = _slicedToArray(_divideIntoHalf3, 2);

  B0 = _divideIntoHalf4[0];
  B1 = _divideIntoHalf4[1];
  p0 = CAD4(A0, B0);
  p1 = CAD4(A0, B1);
  p2 = CAD4(A1, B0);
  p3 = CAD4(A1, B1); //   add two array p1 and p2

  for (var _i7 = 0; _i7 < p1.length; _i7++) {
    p4.push(p1[_i7] + p2[_i7]);
  }

  for (var _i8 = 0, n = A.length; _i8 < n; _i8++) {
    solution[_i8] += p0[_i8];
    solution[_i8 + n / 2] += p1[_i8];
    solution[_i8 + n / 2] += p2[_i8];
    solution[_i8 + n] = p3[_i8];
  }

  return solution;
} // three subproblem Divide and Conquer strategy


function CAD3(A, B) {
  var A0, A1, B0, B1;
  var p0 = [];
  var p1 = [];
  var p2 = [];
  var p3 = [];
  var p4 = [];
  var solution = [];

  for (var _i9 = 0; _i9 < A.length + B.length - 1; _i9++) {
    solution[_i9] = 0;
  }

  if (A.length == 1) {
    return [A[0] * B[0], 0];
  }

  var _divideIntoHalf5 = divideIntoHalf(A);

  var _divideIntoHalf6 = _slicedToArray(_divideIntoHalf5, 2);

  A0 = _divideIntoHalf6[0];
  A1 = _divideIntoHalf6[1];

  var _divideIntoHalf7 = divideIntoHalf(B);

  var _divideIntoHalf8 = _slicedToArray(_divideIntoHalf7, 2);

  B0 = _divideIntoHalf8[0];
  B1 = _divideIntoHalf8[1];
  //here isntead of four recursion we only have to do three recursion
  p0 = CAD3(A0, B0);
  p3 = CAD3(A1, B1);
  p1 = CAD3(sumArray(A0, A1), sumArray(B0, B1));
  p4 = substractArray(p1, p0, p3);

  for (var _i10 = 0, n = A.length; _i10 < n; _i10++) {
    solution[_i10] += p0[_i10];
    solution[_i10 + n / 2] += p4[_i10];
    solution[_i10 + n] = p3[_i10];
  }

  return solution;
}

for (i = 32; i < 1048576 * 32; i = 2 * i) {
  var data1 = getRandomDouble(i);
  var data2 = getRandomDouble(i);
  var start = timeline.now();
  var result1 = schoolBack(data1, data2);
  var end = timeline.now();
  console.log("school time for " + i + " elements " + (end - start));
  var start2 = timeline.now();
  var result2 = CAD4(data1, data2);
  var end2 = timeline.now();
  console.log("DAC 4 subprob time for " + i + " elements " + (end2 - start2));
  var start2 = timeline.now();
  var result3 = CAD3(data1, data2);
  var end2 = timeline.now();
  console.log("DAC 3 subprob time for  " + i + " elements " + (end2 - start2));
}
//# sourceMappingURL=main.dev.js.map
