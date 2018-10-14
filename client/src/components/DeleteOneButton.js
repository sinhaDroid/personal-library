import React from 'react';
import mapDispatchToProps from '../HOC/mapDispatchToProps';

import { deleteBook } from '../actions';

const DeleteOneButton = ({ dispatch, id }) => {
  return (
    <button
      className="waves-effect waves-light btn-small red accent-4"
      onClick={() => deleteBook(dispatch, id)}
    >
      <i className="material-icons right">warning</i>
      Delete this book
    </button>
  );
};

export default mapDispatchToProps(DeleteOneButton);
