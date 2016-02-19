import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { LAYER } from './types';

const boxSource = {
  beginDrag(props) {
    console.log('drag:source', props);
    return { name: 'image' };
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }
    const item = monitor.getItem();
    console.log('drop:source', item);
  }
};

@DragSource(LAYER, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class Layer extends Component {
  static displayName = 'Layer';
  static propTypes = {
    offset: PropTypes.object,
    children: PropTypes.any.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  };
  static defaultProps = {
    offset: { x: 0, y: 0 },
  };

  render() {
    const { offset: { x, y }, connectDragSource, children } = this.props;
    return connectDragSource(
      <div style={{ position: 'absolute', left: `${x}px`, top: `${y}px` }}>
        {children}
      </div>
    );
  }
}
