import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import connect from './common/decorators/connect';
import { setInitialState } from './common/store/actions/main';
import Header from './common/components/header';
import Footer from './common/components/footer';
import NotificationsList from './features/notifications-list';

@connect({
  state: (state) => ({
    nickname: state.main.nickname,
    notifications: state.main.notifications
  }),
  actions: (dispatch) => ({
    setInitialState: (newState) => dispatch(setInitialState(newState))
  })
})
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
              <NotificationsList notifications={notifications}/>
              {children}
            </>
          )}
        </main>
        <Footer />
      </>
    );
  }
}

export default withTranslation()(App);
