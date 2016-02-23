import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { CONTENT } from './types';

const boxSource = {
  beginDrag() {
    return {};
  },
  endDrag(props) {
    props.onEndDrag();
  }
};

@DragSource(CONTENT, boxSource, (connect, monitor) => {
  return {
    isDragging: monitor.isDragging(),
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
  };
})
export default class Content extends Component {
  static displayName = 'Content';
  static propTypes = {
    name: PropTypes.string,
    offset: PropTypes.object.isRequired,
    onEndDrag: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
    debug: PropTypes.bool.isRequired,

    // Props from DragSource
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
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
