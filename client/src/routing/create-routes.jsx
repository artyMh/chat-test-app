import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Routes from './routes';
import Main from '../components/main';
import Auth from '../components/auth/main';
import Chat from '../components/chat/main';

const routes = (
  <BrowserRouter>
    <Main>
      <Switch>
        <Route exact path={Routes.HOME} component={Auth} />
        <Route exact path={Routes.CHAT} component={Chat} />
      </Switch>
    </Main>
  </BrowserRouter>
);

export default routes;
