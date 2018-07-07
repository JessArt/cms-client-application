/* eslint-disable react/no-deprecated */
// we use react@15, so we can use `componentWillReceiveProps`

import React from "react";
import RPT from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { selectors, actions } from "../store";

const mapStateToProps = state => ({
  isAuthenticated: selectors.auth.status(state)
});

const mapDispatchToProps = {
  validateToken: actions.auth.validateToken
};

// this component's sole responsibility is to check
// for validity of token every time we change a route.
// this is needed so you are not logged out after you
// try to do any of `post`, `put`, `delete` actions
class TokenValidator extends React.Component {
  static propTypes = {
    validateToken: RPT.func,
    children: RPT.node
  };
  componentDidMount() {
    this.props.validateToken();
  }
  componentWillReceiveProps() {
    this.props.validateToken();
  }
  render() {
    return this.props.children;
  }
}

const ConnectedTokenValidator = connect(
  null,
  mapDispatchToProps
)(TokenValidator);

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <ConnectedTokenValidator>
          <Component {...props} />
        </ConnectedTokenValidator>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: RPT.element,
  isAuthenticated: RPT.bool
};

export default connect(mapStateToProps)(PrivateRoute);
