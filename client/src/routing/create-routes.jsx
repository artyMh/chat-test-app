import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Routes from './routes';
import App from '../app';
import AuthPage from '../pages/auth';
import ChatPage from '../pages/chat';

const routes = (
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path={Routes.HOME} component={AuthPage} />
        <Route exact path={Routes.CHAT} component={ChatPage} />
      </Switch>
    </App>
  </BrowserRouter>
);

export default routes;
