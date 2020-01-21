import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Notification = ({ type = 'info', message = '' }) => (
  <div className={`alert alert-${type} alert-dismissible fade show mt-3`} role="alert">
    {message}
    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

Notification.propTypes = {
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ]).isRequired,
  message: PropTypes.string
};

export default memo(Notification);
