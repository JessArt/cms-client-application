import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import ApplicationLayout from '../components/layouts/application';
import history from './history';
import routes from './routes';
import PrivateRoute from './auth';

import Home from '../components/pages/home';
import Login from '../components/pages/login';
import Pictures from '../components/pages/images';
import Articles from '../components/pages/articles';
import Article from '../components/pages/article';
import NoMatch from '../components/pages/page404';

export const Component = () => (
  <Router history={history}>
    <ApplicationLayout>
      <Switch>
        <PrivateRoute path={routes.home} exact component={Home} />
        <PrivateRoute path={routes.pictures} exact component={Pictures} />
        <PrivateRoute path={routes.articles} exact component={Articles} />
        <PrivateRoute path={routes.article} exact component={Article} />
        <Route path={routes.login} exact component={Login} />
        <Route component={NoMatch} />
      </Switch>
    </ApplicationLayout>
  </Router>
);
