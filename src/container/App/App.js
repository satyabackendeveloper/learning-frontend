import React, { Component, Fragment } from 'react';
import axios from 'axios';
import User from './../User/User';

class App extends Component {
  render() {
    return(
      <Fragment>
        <User />
      </Fragment>
    );
  }
}

export default App;