import React, { Component, PropTypes } from 'react';
import { DragLayer } from 'react-dnd';
import { amend, getSize } from './utils';

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

  componentDidUpdate() {
    if (this.refs.preview) {
      this.size = getSize(this.refs.preview);
    }
  }

  calcOffset() {
    const { base, diff, crop } = this.props;
    if (!crop || !this.size) {
      return { x: 0, y: 0 };
    }
    const offset = {
      x: base.x + diff.x,
      y: base.y + diff.y,
    };
    return amend(offset, crop, this.size);
  }

  render() {
    const {
      name, diff, isDragging, children
    } = this.props;

    const offset = this.calcOffset();
    const style = {
      position: 'absolute',
      opacity: isDragging ? 1 : 0,
      left: `${offset.x}px`,
      top: `${offset.y}px`,
      zIndex: 2,
    };
    const preview = <div ref="preview" style={style}>
      {children}
    </div>;

    let debug;
    if (debug) {
      debug = <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 3 }}>
        name: {name || 'Unknown'}<br />
        dragging: {isDragging ? 'YES' : 'NO'}<br />
        diff: {`x: ${diff && diff.x}, y: ${diff && diff.y}`}<br />
        size: {`width: ${this.size && this.size.width}, height: ${this.size && this.size.height}`}
      </div>;
    }

    return (
      <div style={{ position: 'relative', pointerEvents: 'none' }}>
        {debug}
        {preview}
      </div>
    );
  }
}
