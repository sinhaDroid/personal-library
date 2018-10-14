import React from 'react';
import mapDispatchToProps from '../HOC/mapDispatchToProps';

import { deleteAllBooks } from '../actions';

const DeleteAllButton = ({ dispatch }) => {
  return (
    <div className="col s12 mb-2">
      <button
        className="waves-effect waves-light btn-large red accent-4"
        onClick={() => deleteAllBooks(dispatch)}
      >
        <i className="material-icons right">warning</i>
        DELETE ALL BOOKS
      </button>
    </div>
  );
};

export default mapDispatchToProps(DeleteAllButton);
