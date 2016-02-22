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

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var boxSource = {
  beginDrag: function beginDrag() {
    return {};
  },
  endDrag: function endDrag(props) {
    props.onEndDrag();
  }
};

var Content = (_dec = (0, _reactDnd.DragSource)(_types.CONTENT, boxSource, function (connect, monitor) {
  return {
    isDragging: monitor.isDragging(),
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  };
}), _dec(_class = (_temp = _class2 = function (_Component) {
  _inherits(Content, _Component);

  function Content() {
    _classCallCheck(this, Content);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Content).apply(this, arguments));
  }

  _createClass(Content, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.connectDragPreview((0, _reactDndHtml5Backend.getEmptyImage)(), { captureDraggingState: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var _props$offset = _props.offset;
      var x = _props$offset.x;
      var y = _props$offset.y;
      var isDragging = _props.isDragging;
      var connectDragSource = _props.connectDragSource;
      var children = _props.children;


      var style = {
        position: 'absolute',
        opacity: isDragging ? 0 : 1,
        left: x + 'px',
        top: y + 'px',
        zIndex: 1
      };

      return connectDragSource(_react2.default.createElement(
        'div',
        {
          style: style
        },
        children
      ));
    }
  }]);

  return Content;
}(_react.Component), _class2.displayName = 'Content', _class2.propTypes = {
  name: _react.PropTypes.string,
  offset: _react.PropTypes.object.isRequired,
  onEndDrag: _react.PropTypes.func.isRequired,
  children: _react.PropTypes.any.isRequired,
  debug: _react.PropTypes.bool.isRequired,

  // Props from DragSource
  isDragging: _react.PropTypes.bool.isRequired,
  connectDragSource: _react.PropTypes.func.isRequired,
  connectDragPreview: _react.PropTypes.func.isRequired
}, _temp)) || _class);
exports.default = Content;