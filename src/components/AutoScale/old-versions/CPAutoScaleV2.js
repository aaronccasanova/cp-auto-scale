import React, { Component } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

import ResizeObserver from 'react-resize-observer';

const AutoScale = styled.div`
  --scale: ${props =>
    props.scale
      ? `scale(${props.scale}) translate(-50%, -50%)`
      : `scale(1) translate(-50%, -50%)`};
  position: relative;
  width: 100%;
  height: 100%;
  /* overflow: hidden; */

  & > * {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: var(--scale);
    transform-origin: 0% 0%;
  }
`;

const Child = styled.div`
  /* display: inline-block; */
  /* ---------For Editing Layout---------- */
  border: 2px solid pink;
  /* ------------------------------------- */
`;

const calculateScale = (childValue, parentValue) => {
  // toFixed sets result to 3 decimal places (max amount for transform scale)
  return (parentValue / childValue).toFixed(3);
};

class CPAutoScale extends Component {
  state = {
    scale: null,
    childWidth: null,
    childHeight: null,
    parentWidth: null,
    parentHeight: null
  };

  // componentDidMount() {
  //   this.autoScale(this.props.refId);
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.parentWidth !== this.state.parentWidth ||
  //     prevState.parentHeight !== this.state.parentHeight
  //   ) {
  //     this.autoScale(this.props.refId);
  //   }
  // }

  autoScale = refId => {
    const parentRef = ReactDOM.findDOMNode(this.refs[refId]).parentNode;
    const childRef = ReactDOM.findDOMNode(this.refs[refId]).childNodes[0];

    const childWidth = childRef.clientWidth;
    const childHeight = childRef.clientHeight;
    const parentWidth = parentRef.clientWidth;
    const parentHeight = parentRef.clientHeight;

    // if child container is bigger than parent container scale down
    if (childWidth > parentWidth || childHeight > parentHeight) {
      let widthScale;
      let heightScale;

      // calculate the scale based on whatever child container is the largest
      if (childWidth > childHeight) {
        widthScale = calculateScale(childWidth, parentWidth);
      } else {
        heightScale = calculateScale(childHeight, parentHeight);
      }

      this.setState({
        scale: widthScale ? widthScale : heightScale
        // childWidth,
        // childHeight,
        // parentWidth,
        // parentHeight
      });
    }
  };

  render() {
    console.log('parent', this.state.parentWidth, this.state.parentHeight);
    console.log('child', this.state.parentWidth, this.state.parentHeight);
    return (
      <AutoScale ref={this.props.refId} scale={this.state.scale}>
        <ResizeObserver
          onResize={rect => {
            // console.log('Resized. New bounds:', rect.width, 'x', rect.height);
            this.setState({
              parentWidth: Math.floor(rect.width),
              parentHeight: Math.floor(rect.height)
            });
          }}
        />
        <Child>
          <ResizeObserver
            onResize={rect => {
              this.setState({
                childWidth: Math.floor(rect.width),
                childHeight: Math.floor(rect.height)
              });
            }}
          />
          {this.props.children}
        </Child>
      </AutoScale>
    );
  }
}

export default CPAutoScale;
