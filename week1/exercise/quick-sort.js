function swapArrayElements(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

function partition(arr, leftIndex, rightIndex) {
  let pivot = arr[rightIndex];

  let currentStartIndex = leftIndex;
  for (let i = leftIndex; i < rightIndex; i++) {
    if (arr[i] <= pivot) {
      swapArrayElements(arr, currentStartIndex++, i);
    }
  }

  swapArrayElements(arr, currentStartIndex, rightIndex);

  return currentStartIndex;
}

function quickSort(arr, leftIndex, rightIndex) {
  if (leftIndex >= rightIndex) return;

  let pivotIndex = partition(arr, leftIndex, rightIndex);

  quickSort(arr, leftIndex, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, rightIndex);
}

function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

function testQSort() {
  const tests = [
    [],
    [1],
    [1, 2],
    [2, 1],
    [3, 3, 3, 3, 3],
    [5, 2, 7, 5, 2, 1, 7],
    [6, 5, 4, 3, 2, 1],
    [1, 2, 3, 4, 5, 6],
    [6, 2, 9, 4, 1, 8, 3, 7, 5],
    [-3, 5, 0, -1, 4, -2],
  ];
  const expectedResults = [
    [],
    [1],
    [1, 2],
    [1, 2],
    [3, 3, 3, 3, 3],
    [1, 2, 2, 5, 5, 7, 7],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [-3, -2, -1, 0, 4, 5],
  ];

  return tests.every((arr, index) => {
    quickSort(arr, 0, arr.length - 1);
    return compareArrays(arr, expectedResults[index]);
  });
}

console.log(testQSort());
