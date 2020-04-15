import React from 'react';
import PropTypes from 'prop-types';

const Hello = ({ className, children, ...otherProps }) => {
  return (
    <div className={`${className}`} {...otherProps}>{children}</div>
  );
};

Hello.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

Hello.defaultProps = {
  className: '',
  children: null
};

export default Hello;