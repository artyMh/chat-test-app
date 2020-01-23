import React from 'react';
import PropTypes from 'prop-types';
import translate from '../decorators/translate';
import connect from '../decorators/connect';
import { setInitialState } from '../redux/actions/main';
import Header from './header';
import Notifications from './notifications/main';
import Footer from './footer';

@connect({
  state: (state) => ({
    nickname: state.main.nickname
  }),
  actions: (dispatch) => ({
    setInitialState: (newState) => dispatch(setInitialState(newState))
  })
})
@translate()
class App extends React.PureComponent {

  static propTypes = {
    children: PropTypes.node,
    t: PropTypes.func.isRequired,
    i18n: PropTypes.object.isRequired
  };

  state = {
    hasError: false
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error('Error in application!', error, errorInfo);
  }

  render() {
    const { children, t } = this.props;
    const { hasError } = this.state;

    return (
      <>
        <Header />
        <main role="main" className="container">
          {hasError ? (
            <h1 className="h3 mb-3 font-weight-normal text-center mt-4">{t('errors.mainApp')}</h1>
          ) : (
            <>
              <Notifications />
              {children}
            </>
          )}
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
