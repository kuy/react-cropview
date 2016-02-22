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
  render() {
    return (
      <div>
        <h1>react-cropview</h1>

        <CropView name="cv1" width={400} height={200}>
          <img src="/placeholder.png" alt="placeholder" />
        </CropView>

        <CropView name="cv2" width={400} height={200}>
          <Tree />
        </CropView>
      </div>
    );
  }
}
