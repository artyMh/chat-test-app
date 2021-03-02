import React from 'react';
import PropTypes from 'prop-types';
import translate from '../decorators/translate';
import connect from '../decorators/connect';
import { setInitialState } from '../redux/actions/main';
import Header from './common/components/header';
import Footer from './common/components/footer';
import Notifications from './common/components/notifications';

@connect({
  state: (state) => ({
    nickname: state.main.nickname,
    notifications: state.main.notifications
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
    i18n: PropTypes.object.isRequired,
    notifications: PropTypes.array.isRequired
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
    const { children, t, notifications } = this.props;
    const { hasError } = this.state;

    return (
      <>
        <Header />
        <main role="main" className="container mt-2 mb-5">
          {hasError ? (
            <h1 className="h3 mb-3 font-weight-normal text-center mt-4">{t('errors.mainApp')}</h1>
          ) : (
            <>
              <Notifications notifications={notifications}/>
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
