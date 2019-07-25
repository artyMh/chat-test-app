import React, { memo } from 'react';

const Notification = memo(function Notification({ type = 'info', message = '' }) {
  return (
    <div className={`alert alert-${type} alert-dismissible fade show mt-3`} role="alert">
      {message}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
});

export default Notification;
