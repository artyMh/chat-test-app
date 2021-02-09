import React from 'react';
import PropTypes from 'prop-types';
import translate from '../../decorators/translate';
import connect from '../../decorators/connect';
import { setNickname, clearNotifications, connectToChatWebSocket } from '../../redux/actions/main';
import Routes from '../../routing/routes';
import NicknameForm from './nickname-form';

@translate()
@connect({
  state: (state) => ({
    nickname: state.main.nickname,
    chatWebSocket: state.main.chatWebSocket
  }),
  actions: (dispatch) => ({
    setNickname: (nickname) => dispatch(setNickname(nickname)),
    clearNotifications: () => dispatch(clearNotifications()),
    connectToChatWebSocket: () => dispatch(connectToChatWebSocket()),
  })
})
class Auth extends React.PureComponent {

  static propTypes = {
    history: PropTypes.object.isRequired,
    nickname: PropTypes.string,
    setNickname: PropTypes.func.isRequired,
    clearNotifications: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    const { chatWebSocket: { connectionState }, history } = this.props

    if (connectionState === 'CONNECTED') {
      history.push(Routes.CHAT)
    }
  }

  submitNickname = (nickname) => {
    const { clearNotifications, setNickname } = this.props;

    setNickname(nickname);
    clearNotifications(); // Clearing notifications for better UI experienc

    this.props.connectToChatWebSocket()
  }

  render() {
    const { t, chatWebSocket: { connectionState } } = this.props;

    return (
      <div className="row justify-content-md-center mb-3">
        {connectionState === 'CONNECTING'
          ?
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          :
          <div className="col-sm-12 col-md-6">
            <h1 className="h3 mb-3 font-weight-normal text-center mt-4">{t('auth.title')}</h1>
            <NicknameForm submitNickname={this.submitNickname} />
          </div>
        }
      </div>
    );
  }
}

export default Auth;
