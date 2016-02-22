'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function calcDiff(initial, current) {
  if (initial && current) {
    return {
      x: current.x - initial.x,
      y: current.y - initial.y
    };
  } else {
    return { x: 0, y: 0 };
  }
}

var Preview = (_dec = (0, _reactDnd.DragLayer)(function (monitor) {
  var initial = monitor.getInitialSourceClientOffset();
  var current = monitor.getSourceClientOffset();
  return {
    diff: calcDiff(initial, current),
    isDragging: monitor.isDragging()
  };
}), _dec(_class = (_temp = _class2 = function (_Component) {
  _inherits(Preview, _Component);

  function Preview() {
    _classCallCheck(this, Preview);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Preview).apply(this, arguments));
  }

  _createClass(Preview, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.refs.preview) {
        this.size = (0, _utils.getSize)(this.refs.preview);
      }
    }
  }, {
    key: 'calcOffset',
    value: function calcOffset() {
      var _props = this.props;
      var base = _props.offset;
      var diff = _props.diff;
      var crop = _props.crop;

      if (!crop || !this.size) {
        return { x: 0, y: 0 };
      }
      var offset = {
        x: base.x + diff.x,
        y: base.y + diff.y
      };
      return (0, _utils.amend)(offset, crop, this.size);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var name = _props2.name;
      var diff = _props2.diff;
      var isDragging = _props2.isDragging;
      var children = _props2.children;
      var debug = _props2.debug;


      var offset = this.calcOffset();
      var style = {
        position: 'absolute',
        opacity: isDragging ? 1 : 0,
        left: offset.x + 'px',
        top: offset.y + 'px',
        zIndex: 2
      };
      var preview = _react2.default.createElement(
        'div',
        { ref: 'preview', style: style },
        children
      );

      var info = undefined;
      if (debug) {
        info = _react2.default.createElement(
          'div',
          { style: { position: 'absolute', left: 0, top: 0, zIndex: 3 } },
          'name: ',
          name || '?',
          _react2.default.createElement('br', null),
          'dragging: ',
          isDragging ? 'YES' : 'NO',
          _react2.default.createElement('br', null),
          'diff: ',
          'x: ' + (diff && diff.x) + ', y: ' + (diff && diff.y),
          _react2.default.createElement('br', null),
          'size: ',
          (this.size && this.size.width) + 'x' + (this.size && this.size.height)
        );
      }

      return _react2.default.createElement(
        'div',
        { style: { position: 'relative', pointerEvents: 'none' } },
        info,
        preview
      );
    }
  }]);

  return Preview;
}(_react.Component), _class2.displayName = 'Preview', _class2.propTypes = {
  name: _react.PropTypes.string,
  offset: _react.PropTypes.object.isRequired,
  crop: _react.PropTypes.object.isRequired,
  children: _react.PropTypes.any.isRequired,
  debug: _react.PropTypes.bool.isRequired,

  // Props from DragLayer
  diff: _react.PropTypes.object.isRequired,
  isDragging: _react.PropTypes.bool.isRequired
}, _temp)) || _class);
exports.default = Preview;