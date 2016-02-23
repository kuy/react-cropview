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
    this.cropviews = {};
  }

  saveCropView(ref) {
    if (ref) {
      const cropview = ref.getDecoratedComponentInstance().getDecoratedComponentInstance();
      const name = cropview.props.name;
      this.cropviews[name] = cropview;
    }
  }

  handleToggle() {
    this.setState({ show: !this.state.show });
  }

  handleLoad(name) {
    return () => {
      if (typeof this.cropviews[name] !== 'undefined') {
        this.cropviews[name].updateSize();
      }
    };
  }

  render() {
    const { show } = this.state;
    return (
      <div>
        <h1>react-cropview</h1>

        <h2>Large image</h2>
        <CropView name="cv1" ref={::this.saveCropView} width={400} height={200}>
          <img src="/large.png" alt="large" onLoad={::this.handleLoad('cv1')} />
        </CropView>

        <h2>Small image</h2>
        <CropView name="cv2" ref={::this.saveCropView} width={400} height={200}>
          <img src="/small.png" alt="small" onLoad={::this.handleLoad('cv2')} />
        </CropView>

        <h2>Vertical image (with debug mode)</h2>
        <CropView name="cv3" ref={::this.saveCropView} width={400} height={200} debug={true}>
          <img src="/vert.png" alt="vertical" onLoad={::this.handleLoad('cv3')} />
        </CropView>

        <h2>Horizontal image</h2>
        <CropView name="cv4" ref={::this.saveCropView} width={400} height={200}>
          <img src="/hori.png" alt="horizontal" onLoad={::this.handleLoad('cv4')} />
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
