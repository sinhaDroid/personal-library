import React, { Component } from 'react';
import axios from 'axios';

import mapDispatchToProps from '../HOC/mapDispatchToProps';
import { getBooks } from '../actions';

class AddNewBook extends Component {
  state = {
    title: '',
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/books', { title: this.state.title });
      getBooks(this.props.dispatch);
      this.setState({ title: '' });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <h6>
          <b>Add a new book to your library!</b>
        </h6>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
            name="title"
          />
          <button type="submit" className="btn waves-effect waves-light">
            Add Book
          </button>
        </form>
      </div>
    );
  }
}

export default mapDispatchToProps(AddNewBook);
