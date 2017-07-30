import React from 'react';
import RPT from 'prop-types';
import styles from './style.sass';

const InputElement = ({ label, hint, ...props }) => (
  <label className={styles.container}>
    {label &&
      <div className={styles.label}>
        {label}
      </div>
    }
    <div>
      <input className={styles.input} {...props} />
    </div>
    {hint &&
      <div className={styles.hint}>
        {hint}
      </div>
    }
  </label>
);

InputElement.propTypes = {
  label: RPT.node,
  hint: RPT.node,
};

export default InputElement;
