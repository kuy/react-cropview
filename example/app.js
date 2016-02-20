import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CropView from '../src/index';

class App extends Component {
  render() {
    return (
      <div>
        <h1>react-cropview</h1>

        <CropView width={400} height={200}>
          <img src="/placeholder.png" alt="placeholder" />
        </CropView>
      </div>
    );
  }
}

function select(state) {
  const { app } = state;
  return { app };
}

export default connect(select)(App);
