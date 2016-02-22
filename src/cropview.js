import React, { Component, PropTypes } from 'react';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Content from './content';
import Preview from './preview';
import { CONTENT } from './types';
import { amend } from './utils';

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
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    constraint: PropTypes.bool,
    children: PropTypes.any.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  };
  static defaultProps = {
    constraint: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      offset: { x: 0, y: 0 },
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
        offset: amend(offset, { width, height }, this.preview.size)
      });
    }
  }

  render() {
    const { connectDropTarget, width, height, name } = this.props;
    const { offset } = this.state;
    const style = {
      position: 'relative',
      width: `${width}px`,
      height: `${height}px`,
      overflow: 'hidden',
      cursor: 'move',
    };

    // TODO: Make sure 'children' has a single element.

    return connectDropTarget(
      <div style={style}>
        <Preview name={name} ref={::this.savePreview} base={offset} crop={{ width, height }}>
          {this.props.children}
        </Preview>
        <Content offset={offset} onEndDrag={::this.handleEndDrag}>
          {this.props.children}
        </Content>
      </div>
    );
  }
}
