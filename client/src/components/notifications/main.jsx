import React from 'react';
import connect from '../../decorators/connect';
import Notification from './notification';

@connect({
  state: (state) => ({
    notifications: state.main.notifications
  }),
})
export default class Notifications extends React.PureComponent {
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