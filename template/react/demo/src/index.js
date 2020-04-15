import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from '../Component';

class Demo extends Component {
  render() {
    return (
      <Hello className="nu_hello">
        <h1>NU-system</h1>
        <p>No UI can be any UI! <a href="https://nu-system.github.io/" title="More"> More 👉</a></p>
      </Hello>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
