import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';

import CPAutoScale from './components/AutoScale/CPAutoScale';

const ParentContainter = styled.div`
  /* ---------For Editing Layout---------- */
  border: 2px solid blue;
  /* ------------------------------------- */
  margin: 0 auto;

  width: 33%;
  height: 400px;
`;

const ChildContainer = styled.div`
  /* ---------For Editing Layout---------- */
  border: 2px solid red;
  /* ------------------------------------- */
  background: lightsteelblue;
  width: 400px;
  height: 400px;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ParentContainter>
          <CPAutoScale refId="TestRef">
            <ChildContainer>
              <div>
                <h2>hello</h2>
              </div>
            </ChildContainer>
          </CPAutoScale>
        </ParentContainter>
      </div>
    );
  }
}

export default App;
