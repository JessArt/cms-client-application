import React from 'react';
import RPT from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './style.sass';

const ButtonElement = ({ to, type, children, className, loading, ...props }) => {
  let Element = 'div';
  const buttonProps = {
    ...props,
  };

  if (type === 'button') {
    Element = 'button';
  }

  if (type === 'submit') {
    Element = 'button';
    buttonProps.type = 'submit';
  }

  if (to) {
    Element = Link;
    buttonProps.to = to;
  }

  if (loading) {
    buttonProps.disabled = true;
  }

  return (
    <Element className={`styles.button ${className || ''}`} {...buttonProps}>
      {loading ? 'processing...' : children}
    </Element>
  );
};

ButtonElement.propTypes = {
  children: RPT.node,
  type: RPT.oneOf(['div', 'button', 'submit']),
  props: RPT.any,
  loading: RPT.bool,
  to: RPT.string,
};

ButtonElement.defaultProps = {
  type: 'div',
};

export default ButtonElement;
