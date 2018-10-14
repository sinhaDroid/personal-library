import React, { Component } from 'react';

import { getBooks, addComment } from '../actions';
import mapDispatchToProps from '../HOC/mapDispatchToProps';

class AddComment extends Component {
  state = {
    comment: '',
  };

  handleChange = e => {
    this.setState({ comment: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { id, dispatch } = this.props;
    try {
      addComment(dispatch, this.state.comment, id);
      getBooks(dispatch);
      this.setState({ comment: '' });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="card-action">
        <form onSubmit={this.handleSubmit}>
          <input
            name="title"
            onChange={this.handleChange}
            placeholder="Add a comment..."
            type="text"
            value={this.state.comment}
          />
          <button type="submit" className="btn waves-effect waves-light">
            Add Comment
          </button>
        </form>
      </div>
    );
  }
}

export default mapDispatchToProps(AddComment);
