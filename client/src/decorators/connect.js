import * as React from 'react';
import { connect } from 'react-redux';

export default function connectDecorator({ state = null, actions = null }) {
  return (WrappedComponent) => connect(state, actions)(WrappedComponent);
}
