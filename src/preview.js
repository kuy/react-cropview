import React, { Component, PropTypes } from 'react';
import { DragLayer } from 'react-dnd';

function calcDiff(initial, current) {
  if (initial && current) {
    return {
      x: current.x - initial.x,
      y: current.y - initial.y,
    };
  } else {
    return { x: 0, y: 0 };
  }
}

function calcOffset(base, offset) {
  return {
    x: base.x + offset.x,
    y: base.y + offset.y,
  };
}

@DragLayer(monitor => {
  const initial = monitor.getInitialSourceClientOffset();
  const current = monitor.getSourceClientOffset();
  return {
    diff: calcDiff(initial, current),
    isDragging: monitor.isDragging(),
  };
})
export default class Preview extends Component {
  static displayName = 'Preview';

  render() {
    const {
      base, diff, isDragging, children
    } = this.props;

    let preview;
    if (isDragging) {
      const offset = calcOffset(base, diff);
      const style = {
        position: 'absolute',
        left: `${offset.x}px`,
        top: `${offset.y}px`,
        zIndex: 2,
      };
      preview = <div style={style}>
        {children}
      </div>;
    }

    return (
      <div style={{ position: 'relative', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 3 }}>
          dragging: {isDragging ? 'YES' : 'NO'}<br />
          diff: {`x: ${diff && diff.x}, y: ${diff && diff.y}`}
        </div>
        {preview}
      </div>
    );
  }
}
