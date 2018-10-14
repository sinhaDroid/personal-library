const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
    default: [],
  },
  commentcount: {
    type: Number,
    default: 0,
  },
});

const Book = mongoose.model('book', BookSchema);
module.exports = Book;
