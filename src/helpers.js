export function checkUniformClass(arr) {
  let firstClass = -1;
  for(let i=0; i < arr.length; ++i) {
    if (firstClass === -1) {
      firstClass = arr[i].class;
    } else if (arr[i].class !== firstClass) {
      return false;
    }
  }
  return true;
}