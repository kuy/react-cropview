"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getSize = getSize;
exports.amend = amend;
function getSize(el) {
  var rect = el.getBoundingClientRect();
  return { width: rect.width, height: rect.height };
}

function restrict(a, a1, a2) {
  var range = [a1, a2];
  range.sort();

  if (a < range[0]) {
    a = range[0];
  }

  if (range[1] < a) {
    a = range[1];
  }

  return a;
}

function amend(offset, crop, content) {
  var ret = _extends({}, offset);

  var lx = crop.width - content.width;
  ret.x = restrict(offset.x, 0, lx);

  var ly = crop.height - content.height;
  ret.y = restrict(offset.y, 0, ly);

  return ret;
}