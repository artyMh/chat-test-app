import React from 'react';
import PropTypes from 'prop-types';
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
class App extends React.PureComponent {

  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const { children } = this.props;

    return (
      <>
        <Header />
        <main role="main" className="container">
          <Notifications />
          {children}
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
