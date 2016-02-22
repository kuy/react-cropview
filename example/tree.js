import React, { Component, PropTypes } from 'react';
import d3 from 'd3';
import Sizer from './sizer';
import DATA from './data';

const NODE_SIZE = [30, 100];

export default class Tree extends Component {
  static displayName = 'Tree';
  static defaultProps = { show: true };

  componentDidMount() {
    this.diagonal = d3.svg.diagonal().projection(d => [d.y, d.x]);
    this.listen = sel => {
      sel.on('click', d => {
        console.log('click', d.name);
      });
    }
    this.tree = d3.layout.tree()
      .nodeSize(NODE_SIZE)
      .children(d => d.children);
    this.svg = d3.select(this.refs.content)
      .append('svg');

    const { show } = this.props;
    if (show) {
      this.renderTree();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.show && this.props.show !== prevProps.show) {
      this.renderTree();
    } else {
      this.clearTree();
    }
  }

  clearTree() {
    this.svg.select('g').remove();
  }

  renderTree() {
    const sizer = new Sizer();
    const nodes = this.tree.nodes(DATA).reverse();
    const links = this.tree.links(nodes);

    this.clearTree();

    // Render tree
    const layer = this.svg.append('g');

    const node = layer.selectAll('circle')
        .data(nodes)
      .enter().append('circle')
        .attr('fill', 'black')
        .attr('cx', ::sizer.x)
        .attr('cy', ::sizer.y)
        .attr('r', 6)
        .style('cursor', 'pointer')
        .call(this.listen);

    const link = layer.selectAll('path')
        .data(links)
      .enter().append('path')
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('d', this.diagonal);

    // Adjust position
    const bound = sizer.bound;

    this.svg
      .attr('width', bound.width)
      .attr('height', bound.height);

    layer
      .attr('transform', `translate(${Math.abs(bound.x[0])},${Math.abs(bound.y[0])})`);
  }

  render() {
    return <div ref="content" />;
  }
}
