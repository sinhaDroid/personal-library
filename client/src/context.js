import React, { Component } from 'react';

import { getBooks } from './actions';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_BOOKS':
      return {
        ...state,
        books: action.payload,
      };
    case 'SELECT_BOOK':
      return {
        ...state,
        selectedBook: action.payload,
      };
    case 'DELETE_ALL_BOOKS':
      return {
        ...state,
        books: [],
        selectedBook: null,
      };
    case 'DELETE_BOOK':
      getBooks(state.dispatch);
      return {
        ...state,
        selectedBook: null,
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    books: [],
    selectedBook: null,
    dispatch: action => this.setState(state => reducer(state, action)),
  };

  componentDidMount = () => {
    getBooks(this.state.dispatch);
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
