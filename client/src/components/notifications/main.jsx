import React from 'react';
import PropTypes from 'prop-types';
import connect from '../../decorators/connect';
import Notification from './notification';

@connect({
  state: (state) => ({
    notifications: state.main.notifications
  }),
})
class Notifications extends React.PureComponent {
  
  static propTypes = {
    notifications: PropTypes.array.isRequired
  };

  render() {
    const { notifications } = this.props;

    return (
      <section id="notifications">
        <div className="row justify-content-md-center">
          <div className="col-md-4">
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
  }
}

export default Notifications;
