import React, { memo } from 'react';

const ChatMessage = ({ type = 'user', nickname = '', date, message, isYourself = false }) => {
  let badgeClass;
  let displayNickname;

  if (isYourself) {
    badgeClass = 'badge-info';
    displayNickname = 'You';
  } else {
    badgeClass = type === 'chat' ? 'badge-dark' : 'badge-primary';
    displayNickname = type === 'chat' ? 'CHAT' : `@${nickname}`;
  }

  return (
    <div className="media pt-3">
      <p className="media-body pb-3 mb-0 lh-125 border-bottom border-gray text-left">
        <span className={`badge badge-pill ${badgeClass}`}>{displayNickname}</span>&nbsp;<small className="text-muted">{date}</small>
        <br />
        {message}
      </p>
    </div>
  );
};

export default memo(ChatMessage);
