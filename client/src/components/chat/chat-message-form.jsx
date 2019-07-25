import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';

const ChatMessageForm = memo(function ChatMessageForm({ submitMessage }) {
  const [ message, setMessage ] = useState('');

  const submit = (e) => {
    e.preventDefault();
    submitMessage(message);
    setMessage('');
  };

  return (
    <form onSubmit={submit}>
      <div className="input-group input-group-sm">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-sm">Message</span>
        </div>
        <input id="message" type="text" value={message} onChange={e => setMessage(e.target.value)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" id="button-addon2" type="submit" disabled={message.length < 1}>Send</button>
        </div>
      </div>
    </form>
  );
});

export default ChatMessageForm;
