/**
 * var foo = {
 *  value: 1,
 *  bar: function () {
 *    console.log(this.value);
 *  }
 * }
 * 
 * foo.bar();
 */

 if (!Function.prototype.call) {
   Function.prototype.call = function (content = window) {
     content.fn = this;
     let args = [...arguments].slice(1);
     let result = content.fn(...args);
     delete content.fn;
     return result;
   }
 }


let foo = {
  value: 1
}
function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value);
}
bar.call(foo, 'black', '18') // black 18 1