export default class Sizer {
  constructor() {
    this._bound = { x: [0, 0], y: [0, 0] };
  }

  get bound() {
    const b = this._bound;
    return {
      x: b.x.slice(),
      y: b.y.slice(),
      width: b.x[1] - b.x[0],
      height: b.y[1] - b.y[0],
    };
  }

  x(d) {
    return this.extend('x', d.y);
  }

  y(d) {
    return this.extend('y', d.x);
  }

  extend(axis, value) {
    const range = this._bound[axis];

    if (value < range[0]) {
      range[0] = value;
    }

    if (range[1] < value) {
      range[1] = value;
    }

    return value;
  }
}
