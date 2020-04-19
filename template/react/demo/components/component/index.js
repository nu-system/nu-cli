<% var componentNameC=componentName.charAt(0).toUpperCase() + componentName.slice(1);  %>
import <%= componentNameC %> from '../../../src/index';
import './index.css';

// 自定义class
<%= componentNameC %>.defaultProps.classNameDefault = '';

export default <%= componentNameC %>;
