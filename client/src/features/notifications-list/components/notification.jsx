import React, { memo } from 'react';

const Notification = ({ type = 'info', message = '' }) => (
  <div className={`alert alert-${type} alert-dismissible fade show mt-3`} role="alert">
    {message}
    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

export default memo(Notification);
