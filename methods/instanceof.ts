function instanceOf(Child, Parent) {
  let proto = Child.__proto__;
  let prototype = Parent.prototype;
  while (true) {
    if (proto === null) return false
    if (proto === prototype) return true
    proto = proto.__proto__;
  }
}