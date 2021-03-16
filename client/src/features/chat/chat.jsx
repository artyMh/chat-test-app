import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import ChatMessage from './components/chat-message';
import ChatMessageForm from './components/chat-message-form';

const Chat = ({ userNickname, chatMessages, submitMessage, disconnectFromChat }) => {
    const { t } = useTranslation();
    return (
      <>
        <h1 className="h3 mb-3 font-weight-normal mt-4">{t('chat.title')} <span className="badge badge-dark">@{userNickname}</span></h1>
        <button type="button" className="btn btn-danger" onClick={disconnectFromChat}>{t('chat.disconnectButton')}</button>
        <div className="my-3 p-3 bg-white rounded shadow-sm">
          <h6 className="border-bottom border-gray pb-2 mb-0">{t('chat.messagesTitle')}</h6>
          {chatMessages.map((msg, index) => 
            <ChatMessage
              key={index}
              type={msg.type}
              nickname={msg.nickname}
              message={msg.message}
              date={moment(msg.timestamp).format('YYYY-MM-DD HH:mm:ss')}
              isYourself={msg.nickname === userNickname}
            />
          )}
        </div>
        <div className="my-3 p-3 bg-white rounded shadow-sm">
          <ChatMessageForm submitMessage={submitMessage}/>
        </div>
      </>
    );
}

export default memo(Chat);
