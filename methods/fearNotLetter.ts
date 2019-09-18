console.log('====== fearNotLetter =======');
function fearNotLetter (str) {
  let arr = [];
  for (let i = 0, len = str.length; i < len; i++) {
    arr.push(str.charCodeAt(i));
  }

  for (let j = 1, len = arr.length; j < len; j++) {
    let num = arr[j] - arr[j - 1];
    
    if (num != 1) {
      return String.fromCharCode(arr[j] - 1);
    }
  }

  return undefined;
}

console.log(fearNotLetter('abce'))