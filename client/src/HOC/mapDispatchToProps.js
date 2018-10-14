import React, { Component } from 'react';

import { Consumer } from '../context';

const mapDispatchToProps = WrappededComponent => {
  return class extends Component {
    render() {
      return (
        <Consumer>
          {({ dispatch }) => (
            <WrappededComponent dispatch={dispatch} {...this.props} />
          )}
        </Consumer>
      );
    }
  };
};

export default mapDispatchToProps;
