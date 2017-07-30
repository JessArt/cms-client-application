import React from 'react';
import RPT from 'prop-types';
import { connect } from 'react-redux';
import Form from '../../elements/form';
import Input from '../../elements/input';
import Button from '../../elements/button';
import { actions, selectors } from '../../../store';
import styles from './style.sass';

const mapStateToProps = (state) => {
  const { isPending, error } = selectors.auth.authorize(state);

  return {
    isPending,
    error,
  };
};

const mapDispatchToProps = {
  authorize: actions.auth.authorize,
};

const LoginForm = ({ isPending, error, authorize, from }) => {
  const errorMarkup = error && (
    <div className={styles.error}>
      {'Login or password is incorrect'}
    </div>
  );

  return (
    <Form onSubmit={form => authorize({ form, from })} className={styles.container}>
      <Input label={'Name'} name="login" type="text" />
      <Input label={'Password'} name="password" type="password" />
      <Button loading={isPending} type={'submit'}>
        {'Log in'}
      </Button>
      {errorMarkup}
    </Form>
  );
};

LoginForm.propTypes = {
  isPending: RPT.bool,
  error: RPT.any,
  authorize: RPT.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
