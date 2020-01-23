import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import routes from './routing/create-routes';

import './localization/i18n';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('test-app')
);
