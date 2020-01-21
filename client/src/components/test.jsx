import React from 'react';

class Foo extends React.Component {
    render() {
      if (!this.props.foo) {
        return null
      }
      return <div>{this.props.foo}</div>;
    }
  }