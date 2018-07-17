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

class CPAutoScale extends Component {
  state = {
    childWidth: null,
    childHeight: null,
    parentWidth: null,
    parentHeight: null
  };

  componentDidMount() {
    this.autoScale(this.props.refId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      // refId has dynamic suffix logic in parent to trigger autoScale when child dims change
      prevProps.refId !== this.props.refId
    ) {
      this.autoScale(this.props.refId);
    }
  }

  autoScale = refId => {
    const parentRef = ReactDOM.findDOMNode(this.refs[refId]).parentNode;
    const childRef = ReactDOM.findDOMNode(this.refs[refId]).childNodes[0];

    const childWidth = childRef.clientWidth;
    const childHeight = childRef.clientHeight;
    const parentWidth = parentRef.clientWidth;
    const parentHeight = parentRef.clientHeight;

    this.setState({
      childWidth,
      childHeight,
      parentWidth,
      parentHeight
    });
  };

  static calculateScale = (childValue, parentValue) => {
    // toFixed sets result to 3 decimal places (max amount for transform scale)
    return (parentValue / childValue).toFixed(3);
  };

  render() {
    const { childWidth, childHeight, parentWidth, parentHeight } = this.state;

    let cpScale;
    // if child container is bigger than parent container scale down
    if (childWidth > parentWidth || childHeight > parentHeight) {
      let widthScale = CPAutoScale.calculateScale(childWidth, parentWidth);
      let heightScale = CPAutoScale.calculateScale(childHeight, parentHeight);

      // set cpScale to the lowest scale value
      widthScale < heightScale
        ? (cpScale = widthScale)
        : (cpScale = heightScale);
    }

    return (
      <AutoScale ref={this.props.refId} scale={cpScale}>
        {this.props.children}
      </AutoScale>
    );
  }
}

export default CPAutoScale;
