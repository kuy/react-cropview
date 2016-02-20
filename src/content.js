import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { CONTENT } from './types';

const boxSource = {
  beginDrag(props, monitor, component) {
    return {};
  },
  endDrag(props, monitor, component) {
    const { onEndDrag } = props;
    onEndDrag();
  }
};

@DragSource(CONTENT, boxSource, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
})
export default class Content extends Component {
  static displayName = 'Content';
  static propTypes = {
    offset: PropTypes.object,
    children: PropTypes.any.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
  };
  static defaultProps = {
    offset: { x: 0, y: 0 },
  };

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), { captureDraggingState: true });
  }

  render() {
    const {
      offset: { x, y }, isDragging,
      connectDragSource, children
    } = this.props;

    const style = {
      position: 'absolute',
      opacity: isDragging ? 0 : 1,
      left: `${x}px`,
      top: `${y}px`,
      zIndex: 1,
    };

    return connectDragSource(
      <div
        style={style}
      >
        {children}
      </div>
    );
  }
}
