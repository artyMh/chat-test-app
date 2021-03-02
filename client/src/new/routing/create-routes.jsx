import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Routes from './routes';
import App from '../app';
import Auth from '../pages/auth/main';
import Chat from '../pages/chat/main';

const routes = (
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path={Routes.HOME} component={Auth} />
        <Route exact path={Routes.CHAT} component={Chat} />
      </Switch>
    </App>
  </BrowserRouter>
);

export default routes;
