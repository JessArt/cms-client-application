import React from 'react';
import RPT from 'prop-types';
import styles from './style.sass';

const ContainerLayout = ({ children, wide }) => (
  <div className={`${styles.container} ${wide ? styles.wide : ''}`}>
    {children}
  </div>
);

ContainerLayout.propTypes = {
  children: RPT.node,
  wide: RPT.bool,
};

export default ContainerLayout;
