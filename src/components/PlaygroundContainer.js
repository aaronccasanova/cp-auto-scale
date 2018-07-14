import React, { Component } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

const Wrapper = styled.div`
  /* ---------For Editing Layout---------- */
  border: 2px solid red;
  /* ------------------------------------- */
  min-height: 50vh;
  display: flex;
  justify-content: center;
`;

const FixedContainer = styled.div`
  /* ---------For Editing Layout---------- */
  border: 2px solid blue;
  /* ------------------------------------- */
  /* display: flex;
  justify-content: center;
  align-items: center; */
  position: relative;
  margin: 0 auto;
  width: 500px;
  height: 500px;
`;

const DynamicContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  --scale: ${props =>
    props.scale
      ? `scale(${props.scale}) translate(-50%, -50%)`
      : `scale(1) translate(-50%, -50%)`};
  /* ---------For Editing Layout---------- */
  border: 2px solid darkblue;
  /* ------------------------------------- */
  background: lightsteelblue;
  width: 700px;
  height: 758px;

  transform: var(--scale);
  transform-origin: 0% 0%;
  /* transform: scale(0.888); */
`;

const calculateScale = (childValue, parentValue) => {
  return (parentValue / childValue).toFixed(3);
  // console.log(childValue, parentValue);
};

class PlaygroundContainer extends Component {
  state = {
    scale: null
  };

  componentDidMount() {
    const dynamicWidth = ReactDOM.findDOMNode(this.refs.dynamic).clientWidth;
    const dynamicHeight = ReactDOM.findDOMNode(this.refs.dynamic).clientHeight;
    const fixedWidth = ReactDOM.findDOMNode(this.refs.fixed).clientWidth;
    const fixedHeight = ReactDOM.findDOMNode(this.refs.fixed).clientHeight;

    console.log(dynamicWidth);

    // if dynamic container is bigger than fixed container scale down
    if (dynamicWidth > fixedWidth || dynamicHeight > fixedHeight) {
      let widthScale;
      let heightScale;

      // calculate the scale based on whatever child container is the largest
      if (dynamicWidth > dynamicHeight) {
        widthScale = calculateScale(dynamicWidth, fixedWidth);
      } else {
        heightScale = calculateScale(dynamicHeight, fixedHeight);
      }

      this.setState({
        scale: widthScale ? widthScale : heightScale
      });
    }
  }

  render() {
    console.log('state', this.state.scale);
    return (
      <Wrapper>
        <FixedContainer ref="fixed">
          <DynamicContainer scale={this.state.scale} ref="dynamic" />
        </FixedContainer>
      </Wrapper>
    );
  }
}

export default PlaygroundContainer;
