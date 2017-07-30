import React from 'react';
import ContainerLayout from '../../layouts/container';
import styles from './style.sass';

const HomePage = () => (
  <ContainerLayout>
    <h1 className={styles.title}>
      {'Hi, Jess!'}
    </h1>
    <p>
      {'Have a nice day! Remember -- long way always starts with a small step :)'}
    </p>
  </ContainerLayout>
);

export default HomePage;
