import React, { Component, PropTypes } from 'react';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Content from './content';
import Preview from './preview';
import { CONTENT } from './types';

const boxTarget = {
  drop(props, monitor, component) {
    const { x: dx, y: dy } = monitor.getDifferenceFromInitialOffset();
    const { x, y } = component.state.offset;
    component.setState({ offset: { x: x + dx, y: y + dy } });
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
    children: PropTypes.any.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
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
    if (this.preview) {
      const { x, y } = this.state.offset;
      const { x: dx, y: dy } = this.preview.props.diff;
      this.setState({
        offset: { x: x + dx, y: y + dy }
      });
    }
  }

  render() {
    const { connectDropTarget, width, height } = this.props;
    const { offset } = this.state;
    const style = {
      position: 'relative',
      width: `${width}px`,
      height: `${height}px`,
      overflow: 'hidden',
    };
    return connectDropTarget(
      <div>
        <div style={style}>
          <Preview ref={::this.savePreview} base={offset}>
            {this.props.children}
          </Preview>
          <Content offset={offset} onEndDrag={::this.handleEndDrag}>
            {this.props.children}
          </Content>
        </div>
        <p>
          offset: {`x: ${offset && offset.x}, y: ${offset && offset.y}`}
        </p>
      </div>
    );
  }
}
