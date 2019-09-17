function _new (fn) {
  let result = {};

  if (fn.prototype !== null) {
    result['__proto__'] = fn.prototype;
  }
  
  let args = Array.prototype.slice.call(arguments, 1); // [...arguments].slice(1)

  let ret = fn.apply(result, args);

  if (['object', 'function'].includes(typeof ret) && ret !== null) {
    return ret;
  }

  return result;
}

// var obj = New(A, 1, 2);
// // equals to
// var obj = new A(1, 2);