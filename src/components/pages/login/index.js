import React from 'react';
import LoginForm from '../../forms/login';
import styles from './style.sass';

const LoginPage = ({ state: { from } = {} }) => (
  <div>
    <h1 className={styles.title}>
      {'Hello! Please, log in to the system.'}
    </h1>
    <LoginForm from={from} />
  </div>
);

export default LoginPage;
