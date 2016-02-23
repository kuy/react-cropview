import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import EventEmitter from 'eventemitter2';
import CropView from '../src/index';
import Tree from './tree';

function select(state) {
  const { app } = state;
  return { app };
}

@connect(select)
export default class App extends Component {
  static displayName = 'App';

  constructor(props) {
    super(props);
    this.state = { show: false };
    this.event = new EventEmitter();
  }

  handleToggle() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { show } = this.state;
    return (
      <div>
        <h1>react-cropview</h1>

        <h2>Large image</h2>
        <CropView name="cv1" width={400} height={200} measureOn={this.event}>
          <img src="/large.png" alt="large" onLoad={e => this.event.emit('cv1.update')} />
        </CropView>

        <h2>Small image</h2>
        <CropView name="cv2" width={400} height={200} measureOn={this.event}>
          <img src="/small.png" alt="small" onLoad={e => this.event.emit('cv2.update')} />
        </CropView>

        <h2>Vertical image (with debug mode)</h2>
        <CropView name="cv3" width={400} height={200} measureOn={this.event} debug={true}>
          <img src="/vert.png" alt="vertical" onLoad={e => this.event.emit('cv3.update')} />
        </CropView>

        <h2>Horizontal image</h2>
        <CropView name="cv4" width={400} height={200} measureOn={this.event}>
          <img src="/hori.png" alt="horizontal" onLoad={e => this.event.emit('cv4.update')} />
        </CropView>

        <h2>SVG</h2>
        <CropView name="cv5" width={400} height={200}>
          <Tree />
        </CropView>

        <h2>Lazy SVG</h2>
        <CropView name="cv6" width={400} height={200}>
          <Tree show={show} />
        </CropView>
        <button onClick={::this.handleToggle}>{show ? 'Hide' : 'Show'}</button>
      </div>
    );
  }
}
