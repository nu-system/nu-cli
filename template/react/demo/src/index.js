<% var componentNameC=componentName.charAt(0).toUpperCase() + componentName.slice(1);  %>
import React from 'react';
import { render } from 'react-dom';
import <%= componentNameC %> from '../components/component';

function Demo(){
  return (
    <<%= componentNameC %>>
      hello world
    </<%= componentNameC %>>
  );
}

render(<Demo />, document.querySelector('#demo'));
