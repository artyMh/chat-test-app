import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Notification from './components/notification';

const NotificationsList = ({ notifications = [] }) => (
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

NotificationsList.propTypes = {
  notifications: PropTypes.array.isRequired
};

export default memo(NotificationsList);
