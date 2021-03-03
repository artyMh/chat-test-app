import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Notification from '../notification';

const Notifications = ({ notifications = [] }) => (
    <section id="notifications">
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          {notifications.map((notification, index) => 
            <Notification 
              key={index}
              type={notification.type}
              message={notification.message}
            />
          )}
        </div>
      </div>
    </section>
);

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired
};

export default memo(Notifications);
