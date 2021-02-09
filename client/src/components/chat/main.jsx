import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import translate from '../../decorators/translate';
import connect from '../../decorators/connect';
import { addNotification, connectToChatWebSocket, disconnectFromChatWebSocket, sendMessageToChatWebSocket } from '../../redux/actions/main';
import Routes from '../../routing/routes';
import WsMessageCode from '../../types/websocket-messages-codes';
import ChatMessage from './message';
import ChatMessageForm from './chat-message-form';

@translate()
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
class Chat extends React.PureComponent {

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
    const { nickname, sendMessageToChatWebSocket } = this.props

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

  _renderChat() {
    const { nickname, t, chatWebSocket: { chatMessages } } = this.props

    return (
      <>
        <h1 className="h3 mb-3 font-weight-normal mt-4">{t('chat.title')} <span className="badge badge-dark">@{nickname}</span></h1>
        <button type="button" className="btn btn-danger" onClick={this.disconnectWs}>{t('chat.disconnectButton')}</button>
        <div className="my-3 p-3 bg-white rounded shadow-sm">
          <h6 className="border-bottom border-gray pb-2 mb-0">{t('chat.messagesTitle')}</h6>
          {chatMessages.map((msg, index) => 
            <ChatMessage
              key={index}
              type={msg.type}
              nickname={msg.nickname}
              message={msg.message}
              date={moment(msg.timestamp).format('YYYY-MM-DD HH:mm:ss')}
              isYourself={msg.nickname === nickname}
            />
          )}
        </div>
        <div className="my-3 p-3 bg-white rounded shadow-sm">
          <ChatMessageForm submitMessage={this.submitMessage}/>
        </div>
      </>
    );
  }

  render() {
    const { chatWebSocket: { connectionState } } = this.props

    return (
      <div className="row justify-content-sm-center">
        <div className="col-sm-12 col-md-9 text-center mt-3 mb-3">
          {connectionState === 'CONNECTED' ? this._renderChat() : <div className="spinner-border text-primary" role="status" />}
        </div>
      </div>
    );
  }
}

export default Chat;
