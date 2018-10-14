/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

module.exports = app => {
  MongoClient.connect(process.env.DB, (err, db) => {
    if(err) {
      console.log(err);
    } else {
      app.route('/api/books')
      .get((req, res) => {
        //response will be array of book objects
        //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
        db.collection("books").find({}).toArray((err, result) => {
          if(err) {
            console.log(err);
          } else {
            result.forEach(book => {
              book.commentcount = book.comments.length;
              delete book.comments;
            });
            res.send(result);
          }
        });
      })
      .post((req, res) => {
        //response will contain new book object including atleast _id and title
        if(req.body.title === '') {
          res.send('missing title');
        } else {
          db.collection("books").insertOne({title: req.body.title, comments: []}, (err, result) => {
            if(err) {
              console.log(err);
            } else {
              res.send(result.ops[0]);
            }
          });
        }
      })
      .delete((req, res) => {
        //if successful response will be 'complete delete successful'
        db.collection("books").deleteMany({}, (err, result) => {
          if(err) {
            console.log(err);
          } else {
            res.send('complete delete successful');
          }
        });
      });

      app.route('/api/books/:id')
      .get((req, res) => {
        //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
        if(ObjectId.isValid(req.params.id)){
          db.collection('books').findOne({_id: new ObjectId(req.params.id)}, (err, result) => {
            if(err) {
              console.log(err);
            } else {
              if(result) res.send(result);
              else res.send('no book exists');
            }
          });
        } else {
          res.send('no book exists');
        }
      })
      .post((req, res) => {
        //json res format same as .get
        db.collection('books').findOneAndUpdate({_id: new ObjectId(req.params.id)}, 
        {$push: {comments: req.body.comment}}, 
        {returnOriginal: false}, 
        (err, result) => {
          if(err) {
            console.log(err);
          } else {
            res.send(result.value);
          }
        });
      })
      .delete((req, res) => {
        //if successful response will be 'delete successful'
        db.collection('books').deleteOne({_id: req.params.id}, (err, result) => {
          if(err) {
            console.log(err);
          } else {
            res.send('delete successful');
          }
        });
      });
    
      //404 Not Found Middleware
      app.use((req, res, next) => {
        res.status(404)
        .type('text')
        .send('Not Found');
      });
    }  
  });
};
