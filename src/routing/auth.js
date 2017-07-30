import React from 'react';
import RPT from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectors } from '../store';

const mapStateToProps = state => ({
  isAuthenticated: selectors.auth.status(state),
});

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  )} />
);

PrivateRoute.propTypes = {
  component: RPT.element,
  isAuthenticated: RPT.bool,
};

export default connect(mapStateToProps)(PrivateRoute);
