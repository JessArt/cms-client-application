import React from 'react';
import styles from './style.sass';

function scrollToTop() {
  window.scrollTo(0, 0);
}

const ScrollTop = () => (
  <div onClick={scrollToTop} className={styles.container}>
    <span className={styles.elem}>
      {'⊼'}
    </span>
  </div>
);

export default ScrollTop;
