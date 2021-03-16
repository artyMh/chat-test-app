import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { setInitialState } from './common/store/actions/main';
import Header from './common/components/header';
import Footer from './common/components/footer';
import NotificationsList from './features/notifications-list';

class App extends React.PureComponent {

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

const mapStateToProps = (state) => ({
  nickname: state.main.nickname,
  notifications: state.main.notifications
});

const mapDispatchToProps = (dispatch) => ({
  setInitialState: (newState) => dispatch(setInitialState(newState))
});

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
