if (!Object.create) {
  Object.create = function (proto) {
    function F () {};
    F.prototype = proto;
    return new F();
  }
}

function inheritProtype(Child, Person) {
  let prototype = Object.create(Person.prototype);
  prototype.constuctor = Child;
  Child.prototype = prototype;
}