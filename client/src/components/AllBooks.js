import React from 'react';

import AddNewBook from './AddNewBook';
import DeleteAllButton from './DeleteAllButton';

import { selectBook } from '../actions';

const AllBooks = ({ values: { books, dispatch } }) => {
  return (
    <div className="col s12 m6">
      <ul className="collection with-header">
        <li className="collection-header">
          <DeleteAllButton />
          <AddNewBook />
        </li>
        {books.map(book => (
          <li
            key={book._id}
            className="collection-item"
            onClick={() => selectBook(dispatch, book._id)}
          >
            {book.title}
            <span className="right">{book.commentcount} comments</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllBooks;
