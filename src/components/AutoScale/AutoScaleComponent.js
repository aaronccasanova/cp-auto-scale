{
  // ------------------- usage --------------------
  /* <AutoScaleComponent
  refId={postId}
  component={component}
  usage={usage}
  // only use dynamic state usage if expanding box is open
  dynamicUsage={this.state.expand ? this.state.usage : usage}
/> */
}
import React, { Component } from 'react';
import styled from 'styled-components';
import ResizeObserver from 'react-resize-observer';

import CPAutoScale from './../CPAutoScale';
import MasterCopyPastePreview from './../MasterCopyPastePreview';

const ComponentSpacer = styled.div`
  padding: 15px;
`;

class AutoScaleComponent extends Component {
  state = {
    uniqueRefSuffix: 0
  };

  forceAutoScale = () => {
    // creates a unique suffix for the CPAutoScale to force re-render/auto scale the MasterCopyPastePreview
    this.setState({
      uniqueRefSuffix: this.state.uniqueRefSuffix + 1
    });
  };

  render() {
    const { refId, component, usage, dynamicUsage } = this.props;
    const { uniqueRefSuffix } = this.state;

    return (
      <CPAutoScale refId={`${refId}${uniqueRefSuffix}`}>
        <ComponentSpacer>
          <MasterCopyPastePreview
            component={component}
            usage={usage}
            dynamicUsage={dynamicUsage}
            // forceAutoScale is triggered by a change in child dims caught by the ResizeObserver (refering to child cpcomponent rendered within MCPPreview)
            forceAutoScale={this.forceAutoScale}
          />
        </ComponentSpacer>
        <ResizeObserver
          // force re-render/auto scale process on parent resize
          onResize={() => {
            this.forceAutoScale();
          }}
        />
      </CPAutoScale>
    );
  }
}

export default AutoScaleComponent;
