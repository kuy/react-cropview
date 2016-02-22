import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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
        <CropView name="cv1" width={400} height={200}>
          <img src="/large.png" alt="large" />
        </CropView>

        <h2>Small image</h2>
        <CropView name="cv2" width={400} height={200}>
          <img src="/small.png" alt="small" />
        </CropView>

        <h2>SVG</h2>
        <CropView name="cv3" width={400} height={200}>
          <Tree />
        </CropView>

        <h2>Lazy SVG</h2>
        <CropView name="cv4" width={400} height={200}>
          <Tree show={show} />
        </CropView>
        <button onClick={::this.handleToggle}>{show ? 'Hide' : 'Show'}</button>
      </div>
    );
  }
}
