import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ChatMessageForm = ({ submitMessage }) => {
  const [ message, setMessage ] = useState('');
  const { t } = useTranslation();

  const submit = (e) => {
    e.preventDefault();
    submitMessage(message);
    setMessage('');
  };

  const setFormMessage = (e) => {
    setMessage(e.target.value)
  }

  return (
    <form onSubmit={submit}>
      <div className="input-group input-group-sm">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-sm">{t('chat.form.inputName')}</span>
        </div>
        <input id="message" type="text" value={message} onChange={setFormMessage} className="form-control" aria-describedby="inputGroup-sizing-sm" />
        <div className="input-group-append">
          <button className="btn btn-primary" id="button-addon2" type="submit" disabled={message.length < 1}>{t('chat.form.buttonText')}</button>
        </div>
      </div>
    </form>
  );
};

export default ChatMessageForm;
