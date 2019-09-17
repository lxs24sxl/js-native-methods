if (!Function.prototype.apply) {
  Function.prototype.apply = function (context = window) {
    context.fn = this;
    let secondArg = arguments[1];
    let result;
    let isArray = (value) => Object.prototype.toString.call(value) === '[object Array]';
    
    if (isArray(secondArg)) {
      result = context.fn(...arguments[1]);
    } else {
      throw Error('VM413:1 Uncaught TypeError: CreateListFromArrayLike called on non-object')
    }
    delete context.fn;

    return result
  }
}