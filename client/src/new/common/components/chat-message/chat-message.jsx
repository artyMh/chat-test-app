import React, { memo } from 'react';
import PropTypes from 'prop-types';

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

ChatMessage.propTypes = {
  type: PropTypes.oneOf(['chat', 'user']).isRequired,
  nickname: PropTypes.string,
  date: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isYourself: PropTypes.bool
};

export default memo(ChatMessage);
