'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _content = require('./content');

var _content2 = _interopRequireDefault(_content);

var _preview = require('./preview');

var _preview2 = _interopRequireDefault(_preview);

var _types = require('./types');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var boxTarget = {
  drop: function drop(props, monitor, component) {
    var CropViewClass = CropView.DecoratedComponent.DecoratedComponent;
    CropViewClass.prototype.updateOffset.call(component, monitor.getDifferenceFromInitialOffset());
  }
};

var CropView = (_dec = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default), _dec2 = (0, _reactDnd.DropTarget)(_types.CONTENT, boxTarget, function (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}), _dec(_class = _dec2(_class = (_temp = _class2 = function (_Component) {
  _inherits(CropView, _Component);

  function CropView(props) {
    _classCallCheck(this, CropView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CropView).call(this, props));

    _this.state = {
      offset: { x: 0, y: 0 },
      size: null
    };
    return _this;
  }

  _createClass(CropView, [{
    key: 'savePreview',
    value: function savePreview(ref) {
      if (ref) {
        this.preview = ref.getDecoratedComponentInstance();
      }
    }
  }, {
    key: 'handleEndDrag',
    value: function handleEndDrag() {
      this.updateOffset();
    }
  }, {
    key: 'updateOffset',
    value: function updateOffset() {
      var diff = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (this.preview && this.preview.size) {
        var _props = this.props;
        var width = _props.width;
        var height = _props.height;
        var _state$offset = this.state.offset;
        var x = _state$offset.x;
        var y = _state$offset.y;

        if (diff === null) {
          diff = this.preview.props.diff;
        }
        var _diff = diff;
        var dx = _diff.x;
        var dy = _diff.y;

        var offset = { x: x + dx, y: y + dy };
        this.setState(_extends({}, this.state, {
          offset: (0, _utils.amend)(offset, { width: width, height: height }, this.preview.size)
        }));
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.measureOn === 'mount') {
        this.updateSize();
      }
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      if (this.props.measureOn === 'hover') {
        this.updateSize();
      }
    }
  }, {
    key: 'updateSize',
    value: function updateSize() {
      if (this.refs.inner) {
        var size = (0, _utils.getSize)(this.refs.inner);
        var _props2 = this.props;
        var width = _props2.width;
        var height = _props2.height;
        var centering = _props2.centering;

        var offset = _extends({}, this.state.offset);
        if (centering && width < size.width) {
          offset.x = (width - size.width) / 2;
        }
        if (centering && height < size.height) {
          offset.y = (height - size.height) / 2;
        }
        this.setState({ offset: offset, size: size });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var connectDropTarget = _props3.connectDropTarget;
      var width = _props3.width;
      var height = _props3.height;
      var name = _props3.name;
      var centering = _props3.centering;
      var debug = _props3.debug;
      var _state = this.state;
      var offset = _state.offset;
      var size = _state.size;

      var style = {
        position: 'relative',
        width: width + 'px',
        height: height + 'px',
        overflow: 'hidden',
        cursor: 'move'
      };

      // TODO: Make sure 'children' has a single element.

      var ostyle = { position: 'relative' },
          istyle = {};
      if (size) {
        ostyle = _extends({}, ostyle, {
          width: Math.max(width, size.width) + 'px',
          height: Math.max(height, size.height) + 'px'
        });
        istyle = _extends({}, istyle, {
          position: 'absolute'
        });
        if (size.width < width) {
          istyle.left = (width - size.width) / 2 + 'px';
        }
        if (size.height < height) {
          istyle.top = (height - size.height) / 2 + 'px';
        }
      } else {
        ostyle = _extends({}, ostyle);
        istyle = _extends({}, istyle);
      }

      var content = _react2.default.createElement(
        'div',
        { ref: 'outer', style: ostyle },
        _react2.default.createElement(
          'div',
          { ref: 'inner', style: istyle },
          this.props.children
        )
      );

      var inherit = { name: name, debug: debug, offset: offset };
      return connectDropTarget(_react2.default.createElement(
        'div',
        { style: style, onMouseEnter: this.handleMouseEnter.bind(this) },
        _react2.default.createElement(
          _preview2.default,
          _extends({}, inherit, { ref: this.savePreview.bind(this), crop: { width: width, height: height } }),
          content
        ),
        _react2.default.createElement(
          _content2.default,
          _extends({}, inherit, { onEndDrag: this.handleEndDrag.bind(this) }),
          content
        )
      ));
    }
  }]);

  return CropView;
}(_react.Component), _class2.displayName = 'CropView', _class2.propTypes = {
  name: _react.PropTypes.string,
  width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  constraint: _react.PropTypes.bool,
  centering: _react.PropTypes.bool,
  measureOn: _react.PropTypes.oneOf(['hover', 'mount']),
  children: _react.PropTypes.any.isRequired,
  debug: _react.PropTypes.bool,

  // Props from DropTarget
  connectDropTarget: _react.PropTypes.func.isRequired
}, _class2.defaultProps = {
  constraint: true,
  centering: true,
  measureOn: 'mount',
  debug: false
}, _temp)) || _class) || _class);
exports.default = CropView;