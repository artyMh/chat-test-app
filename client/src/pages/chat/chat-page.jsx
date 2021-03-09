import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import connect from '../../common/decorators/connect';
import { addNotification, connectToChatWebSocket, disconnectFromChatWebSocket, sendMessageToChatWebSocket } from '../../common/store/actions/main';
import Routes from '../../routing/routes';
import WsMessageCode from '../../common/models/websocket-messages-codes';
import Chat from '../../features/chat'

@connect({
  state: (state) => ({
    nickname: state.main.nickname,
    chatWebSocket: state.main.chatWebSocket
  }),
  actions: (dispatch) => ({
    addNotification: (notification) => dispatch(addNotification(notification)),
    connectToChatWebSocket: () => dispatch(connectToChatWebSocket()),
    disconnectFromChatWebSocket: () => dispatch(disconnectFromChatWebSocket()),
    sendMessageToChatWebSocket: (message) => dispatch(sendMessageToChatWebSocket(message))
  })
})
class ChatPage extends React.PureComponent {

  static propTypes = {
    history: PropTypes.object.isRequired,
    nickname: PropTypes.string.isRequired,
    chatWebSocket: PropTypes.object.isRequired,
    addNotification: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { nickname, addNotification, history, t, chatWebSocket: { connectionState } } = this.props

    if (!nickname) {
      addNotification({
        type: 'danger',
        message: t('errors.emptyNickname')
      });
      history.push(Routes.HOME);
    }
    else if (connectionState !== 'CONNECTED') {
      addNotification({
        type: 'danger',
        message: t('errors.notConnected')
      });
      history.push(Routes.HOME)
    }
  }

  componentDidUpdate(prevProps) {
    const { addNotification, history, t, chatWebSocket: { connectionState } } = this.props

    if (prevProps.chatWebSocket.connectionState === 'CONNECTED' && connectionState !== 'CONNECTED') {
      addNotification({
        type: 'danger',
        message: t('errors.disconnected')
      });
      history.push(Routes.HOME)
    }
  }

  componentWillUnmount() {
    if (this.props.chatWebSocket.connectionStatus === 'CONNECTED') {
      this.props.disconnectFromChatWebSocket()
    }
  }

  submitMessage = (message) => {
    const { sendMessageToChatWebSocket } = this.props

    const msg = {
      code: WsMessageCode.CHAT_MESSAGE,
      data: { message }
    };

    sendMessageToChatWebSocket(msg)
  }

  disconnectWs = () => {
    this.props.disconnectFromChatWebSocket()
    this.props.history.push(Routes.HOME)
  }

  render() {
    const { nickname, chatWebSocket: { connectionState, chatMessages } } = this.props

    return (
      <div className="row justify-content-sm-center">
        <div className="col-sm-12 col-md-9 text-center mt-3 mb-3">
          {
            connectionState === 'CONNECTED' ?
            <Chat
              userNickname={nickname}
              chatMessages={chatMessages}
              submitMessage={this.submitMessage}
              disconnectFromChat={this.disconnectWs}
            /> :
            <div className="spinner-border text-primary" role="status" />}
        </div>
      </div>
    );
  }
}

export default withTranslation()(ChatPage);
