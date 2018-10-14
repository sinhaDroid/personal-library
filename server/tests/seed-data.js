const mongoose = require('mongoose');

const Book = require('../models/book');

const bookOneId = mongoose.Types.ObjectId();
const bookTwoId = mongoose.Types.ObjectId();

const books = [
  {
    _id: bookOneId,
    title: 'Book 1',
    commentcount: 2,
    comments: ['This is a good book', 'Book is awful'],
  },
  {
    _id: bookTwoId,
    title: 'Book 2',
    commentcount: 0,
    comments: [],
  },
];

const populateBooks = done => {
  Book.deleteMany({})
    .then(() => {
      const bookOne = new Book(books[0]).save();
      const bookTwo = new Book(books[1]).save();

      return Promise.all([bookOne, bookTwo]);
    })
    .then(() => done());
};

module.exports = { books, populateBooks };
