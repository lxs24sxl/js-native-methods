console.log('=====bind函数实现======');

if (!Function.prototype.bind) {
  Function.prototype.bind = function (self) {
    if (typeof this !== 'function') {
      throw Error('not a function');
    }

    let fn = this;

    let args = [...arguments].slice(1);

    let resFn = function () {
      return fn.apply(
        this instanceof resFn? this: self,
        args.concat(...arguments)
      )
    }
    // 拷贝

    function Temp () {};
    Temp.prototype = this.prototype;
    resFn.prototype = new Temp();
    
    return resFn;
  }
}

// let obj = {
//   name: 'lxs',
//   from: 'gz'
// }
// function nFunc (age, from) {
//   console.log('this.name', this.name, 'age', age, 'from', from);
// }