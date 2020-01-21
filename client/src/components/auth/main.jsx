import React from 'react';
import PropTypes from 'prop-types';
import connect from '../../decorators/connect';
import { setNickname, clearNotifications } from '../../redux/actions/main';
import Routes from '../../routing/routes';
import NicknameForm from './nickname-form';

@connect({
  state: (state) => ({
    nickname: state.main.nickname
  }),
  actions: (dispatch) => ({
    setNickname: (nickname) => dispatch(setNickname(nickname)),
    clearNotifications: () => dispatch(clearNotifications())
  })
})
class Auth extends React.PureComponent {

  static propTypes = {
    history: PropTypes.array.isRequired,
    nickname: PropTypes.string,
    setNickname: PropTypes.func.isRequired,
    clearNotifications: PropTypes.func.isRequired
  };

  submitNickname = (nickname) => {
    const { clearNotifications, setNickname, history } = this.props;

    setNickname(nickname);
    clearNotifications(); // Clearing notifications for better UI experience
    history.push(Routes.CHAT);
  }

  render() {
    return (
      <div className="row justify-content-md-center mb-3">
        <div className="col-sm-12 col-md-6">
          <h1 className="h3 mb-3 font-weight-normal text-center mt-4" onClick={this.seeeet}>Enter your nickname</h1>
          <NicknameForm submitNickname={this.submitNickname} />
        </div>
      </div>
    );
  }
}

export default Auth;
