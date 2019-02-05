let some = {
  _private: {
    nz: 3
  },
  min: 1,
  max: 10
};

Object.defineProperty(some, "cnt", {
  // obj.cnt
  get() {
    console.log("getter");
    return this._private.nz;
  },
  // obj.cnt = n
  set(value) {
    console.log("setter", value);

    if (value < this.min) {
      value = 1;
    } else if (value >= this.max) {
      value = this.max;
    }

    this._private.nz = value;
  }
});

export default some;
