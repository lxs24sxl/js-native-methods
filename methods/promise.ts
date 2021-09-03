function Promise1(fn) {
  let state = 'pending'; // fulfilled | rejected
  let value = null;
  const callbacks = [];

  function resolve(newValue) {
    const fn = () => {
      if (state !== 'pending') return;

      if (newValue && ['function', 'object'].includes(typeof newValue)) {
        const { then } = newValue;
        if (typeof then === 'function') {
          then.call(newValue, resolve);
          return
        }
      }

      state = 'fulfilled';
      value = newValue;

      handleCb();
    }

    setTimeout(fn, 0);
  }

  function reject(error) {
    const fn = () => {
      if (state !== 'pending') return;

      if (error && ['function', 'object'].includes(typeof error)) {
        const { then } = error;
        if (typeof then === 'function') {
          then.call(error, resolve, reject);
          return
        }
      }

      state = 'rejected';
      value = error;
      handleCb();
    }

    setTimeout(fn, 0);
  }

  function handleCb() {
    while (callbacks.length) {
      const fulfilled = callbacks.shift();
      handle(fulfilled);
    }
  }

  function handle(callback) {
    if (state === 'pending') {
      callbacks.push(callback);
      return;
    }
    try {
      if (state === 'fulfilled') {
        if (!callback.onFulfilled) {
          callback.resolve(value);
          return;
        }

        const ret = callback.onFulfilled(value);
        callback.resolve(ret); // 处理下一个promise的resolve
      }


      if (state === 'rejected') {
        if (!callback.onRejected) {
          callback.reject(value);
          return;
        }

        const ret = callback.onRejected(value);
        callback.reject(ret);
      }
    } catch (error) {
      callback.reject(error);
    }
  }

  this.then = function (onFulfilled, onRejected) {
    return new Promise1((resolve, reject) => {
      handle({
        onFulfilled,
        resolve,
        onRejected,
        reject
      })
    })
  }

  this.catch = function (onError) {
    this.then(null, onError);
  }

  this.finally = function (onDone) {
    this.then(onDone, onDone)
  }

  this.resolve = function (value) {
    if (value && value instanceof Promise1) {
      return value;
    } else if (value && typeof value === 'object' && typeof value.then === 'function') {
      let { then } = value
      return new Promise1(resolve => {
        then(resolve);
      })
    } else if (value) {
      return new Promise1(resolve => resolve(value));
    } else {
      return new Promise1(resolve => resolve());
    }
  }

  this.reject = function (value) {
    return new Promise1((resolve, reject) => {
      reject(value);
    });
  }

  this.all = function (arr) {
    let args = Array.prototype.slice.call(arr);

    return new Promise1((resolve, reject) => {
      if (args.length === 0) return resolve([]);

      let remaining = args.length;

      function res(i, value) {
        try {
          if (value && ['object', 'function'].includes(typeof value)) {
            const { then } = value
            if (typeof then === 'function') {
              then.call(value, function (val) {
                res(i, val)
              }, reject);

              return
            }
          }
          args[i] = value;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (error) {
          reject(error)
        }
      }

      for (let i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    })
  }

  this.race = function (values) {
    return new Promise1((resolve, reject) => {
      for (let i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    })
  }

  fn(resolve, reject);
}



// new Promise1((resolve, reject) => {
//   setTimeout(() => {
//     resolve({ test: 1 })
//   }, 1000)
// }).then((data) => {
//   console.log('result1', data)
//   // dosomething
//   console.log('result3')
//   return new Promise1(resolve => resolve(1))
// }).then(data => {
//   console.log('promise2', data)
//   return test()
// }).catch(error => {
//   console.log('error', error)
// })
//result1 { test: 1 }
//result3

new Promise1(() => { }).all([new Promise1(resolve => resolve('2')), new Promise1(resolve => test())]).then(res => {
  console.log('res', res)
}).catch(error => {
  console.log('all', error)
})
