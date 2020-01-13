import React, { Fragment } from 'react';
import connect from '../decorators/connect';
import { setInitialState, clearStoreData } from '../redux/actions/main';
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
class Main extends React.PureComponent {
  render() {
    const { nickname, children } = this.props;

    return (
      <Fragment>
        <Header />
        <main role="main" className="container">
          <Notifications />
          {children}
        </main>
        <Footer />
      </Fragment>
    );
  }
}

export default Main;
