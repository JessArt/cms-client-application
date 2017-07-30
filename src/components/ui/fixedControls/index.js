import React from 'react';
import RPT from 'prop-types';
import ContainerLayout from '../../layouts/container';
import styles from './style.sass';

const FixedControls = ({ children }) => (
  <div className={styles.container}>
    <ContainerLayout>
      <div className={styles.content}>
        <div className={styles.offset}>
          {children}
        </div>
      </div>
    </ContainerLayout>
  </div>
);

FixedControls.propTypes = {
  children: RPT.node,
};

export default FixedControls;
