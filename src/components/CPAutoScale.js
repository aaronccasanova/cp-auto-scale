import React, { Component } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

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

const calculateScale = (childValue, parentValue) => {
  // toFixed sets result to 3 decimal places (max amount for transform scale)
  return (parentValue / childValue).toFixed(3);
};

class CPAutoScale extends Component {
  state = {
    scale: null
  };

  componentDidMount() {
    const parentRef = ReactDOM.findDOMNode(this.refs[this.props.refId])
      .parentNode;
    const childRef = ReactDOM.findDOMNode(this.refs[this.props.refId])
      .childNodes[0];

    parentRef.addEventListener('resize', this.autoScale);

    childRef.addEventListener('resize', this.autoScale);

    this.autoScale();
  }

  autoScale = () => {
    const parentRef = ReactDOM.findDOMNode(this.refs[this.props.refId])
      .parentNode;
    const childRef = ReactDOM.findDOMNode(this.refs[this.props.refId])
      .childNodes[0];

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
      });
    }
  };

  render() {
    console.log('stateScale', this.state.scale);
    console.log(this.props.refId);
    return (
      <AutoScale ref={this.props.refId} scale={this.state.scale}>
        {this.props.children}
      </AutoScale>
    );
  }
}

export default CPAutoScale;
