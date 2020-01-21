import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Routes from './routes';
import App from '../components/app';
import Auth from '../components/auth/main';
import Chat from '../components/chat/main';

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
