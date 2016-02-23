import React, { Component, PropTypes } from 'react';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Content from './content';
import Preview from './preview';
import { CONTENT } from './types';
import { amend, getSize } from './utils';

const boxTarget = {
  drop(props, monitor, component) {
    const CropViewClass = CropView.DecoratedComponent.DecoratedComponent;
    CropViewClass.prototype.updateOffset.call(component, monitor.getDifferenceFromInitialOffset());
  }
};

@DragDropContext(HTML5Backend)
@DropTarget(CONTENT, boxTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
export default class CropView extends Component {
  static displayName = 'CropView';
  static propTypes = {
    name: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    constraint: PropTypes.bool,
    centering: PropTypes.bool,
    measureOn: PropTypes.oneOf(['hover', 'mount']),
    children: PropTypes.any.isRequired,
    debug: PropTypes.bool,

    // Props from DropTarget
    connectDropTarget: PropTypes.func.isRequired,
  };
  static defaultProps = {
    constraint: true,
    centering: true,
    measureOn: 'mount',
    debug: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      offset: { x: 0, y: 0 },
      size: null,
    };
  }

  savePreview(ref) {
    if (ref) {
      this.preview = ref.getDecoratedComponentInstance();
    }
  }

  handleEndDrag() {
    this.updateOffset();
  }

  updateOffset(diff = null) {
    if (this.preview && this.preview.size) {
      const { width, height } = this.props;
      const { x, y } = this.state.offset;
      if (diff === null) {
        diff = this.preview.props.diff;
      }
      const { x: dx, y: dy } = diff;
      const offset = { x: x + dx, y: y + dy };
      this.setState({
        ...this.state,
        offset: amend(offset, { width, height }, this.preview.size)
      });
    }
  }

  componentDidMount() {
    if (this.props.measureOn === 'mount') {
      this.updateSize();
    }
  }

  handleMouseEnter() {
    if (this.props.measureOn === 'hover') {
      this.updateSize();
    }
  }

  updateSize() {
    if (this.refs.inner) {
      const size = getSize(this.refs.inner);
      const { width, height, centering } = this.props;
      const offset = { ...this.state.offset };
      if (centering && width < size.width) {
        offset.x = (width - size.width) / 2;
      }
      if (centering && height < size.height) {
        offset.y = (height - size.height) / 2;
      }
      this.setState({ offset, size });
    }
  }

  render() {
    const { connectDropTarget, width, height, name, centering, debug } = this.props;
    const { offset, size } = this.state;
    const style = {
      position: 'relative',
      width: `${width}px`,
      height: `${height}px`,
      overflow: 'hidden',
      cursor: 'move',
    };

    // TODO: Make sure 'children' has a single element.

    let ostyle = { position: 'relative' },
        istyle = {};
    if (size) {
      ostyle = {
        ...ostyle,
        width: `${Math.max(width, size.width)}px`,
        height: `${Math.max(height, size.height)}px`,
      };
      istyle = {
        ...istyle,
        position: 'absolute',
      };
      if (size.width < width) {
        istyle.left = `${(width - size.width) / 2}px`;
      }
      if (size.height < height) {
        istyle.top = `${(height - size.height) / 2}px`;
      }
    } else {
      ostyle = { ...ostyle };
      istyle = { ...istyle };
    }

    const content = <div ref="outer" style={ostyle}>
      <div ref="inner" style={istyle}>
        {this.props.children}
      </div>
    </div>;

    const inherit = { name, debug, offset };
    return connectDropTarget(
      <div style={style} onMouseEnter={::this.handleMouseEnter}>
        <Preview {...inherit} ref={::this.savePreview} crop={{ width, height }}>
          {content}
        </Preview>
        <Content {...inherit} onEndDrag={::this.handleEndDrag}>
          {content}
        </Content>
      </div>
    );
  }
}
