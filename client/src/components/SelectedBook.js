import React from 'react';

import AddComment from './AddComment';
import DeleteOneButton from './DeleteOneButton';

export default ({ selectedBook }) => (
  <div className="col s12 m6">
    <div className="card blue-grey darken-1">
      <div className="card-content white-text">
        {!selectedBook ? (
          'No Book Selected'
        ) : (
          <div>
            <span className="card-title">
              <h4>{selectedBook.title}</h4>
              <DeleteOneButton id={selectedBook._id} />
            </span>
            <div className="divider" />
            <h5>Comments</h5>
            {selectedBook.comments.length > 0 ? (
              <ul>
                {selectedBook.comments.map((comment, i) => (
                  <li key={`comment-${i}`}>- {comment}</li>
                ))}
              </ul>
            ) : (
              'No Comments'
            )}
          </div>
        )}
      </div>
      {selectedBook && <AddComment id={selectedBook._id} />}
    </div>
  </div>
);
