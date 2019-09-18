function deepClone(obj) {
  let result;
  if (typeof obj === 'object') {
    result = obj.constructor == Array ? []: {};
    for (let i in obj) {
      result[i] = typeof obj[i] === 'object'? deepClone(obj[i]): obj[i];
    }
  } else {
    result = obj;
  }
  return result;
}