import React, { Component, PropTypes } from 'react';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Layer from './layer';
import { LAYER } from './types';

const boxTarget = {
  drop(props, monitor, component) {
    const diff = monitor.getDifferenceFromInitialOffset();
    console.log('drop:target', diff, component);
    const { x, y } = component.state.offset;
    component.setState({ offset: { x: x + diff.x, y: y + diff.y } });
  }
};

@DragDropContext(HTML5Backend)
@DropTarget(LAYER, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
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
    this.state = { offset: { x: 0, y: 0 } };
  }

  render() {
    const { connectDropTarget, width, height } = this.props;
    const { offset } = this.state;
    return connectDropTarget(
      <div style={{ position: 'relative', width: `${width}px`, height: `${height}px`, overflow: 'hidden' }}>
        <Layer offset={offset}>
          {this.props.children}
        </Layer>
      </div>
    );
  }
}
