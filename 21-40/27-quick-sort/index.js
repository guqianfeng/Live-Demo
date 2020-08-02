let arr = [2, 79, 65, 68, 64, 35, 40, 45, 43, 72];
// let arr = [2, 79, 65, 68, 64, 35, 40, 45, 43];

const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  let midIndex = Math.floor(arr.length / 2);
  let midNum = arr.splice(midIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= midNum) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  // console.log(arr)
  // console.log(left, right)
  return [...quickSort(right), midNum, ...quickSort(left)]
}

console.log(quickSort(arr))