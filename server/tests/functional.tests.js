/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../index');
const { books, populateBooks } = require('./seed-data');

chai.use(chaiHttp);

describe('Functional Tests', function() {
  beforeEach(populateBooks);
  describe('example GET /api/books', function() {
    /*
    * ----[EXAMPLE TEST]----
    * Each test should completely test the response of the API end-point including response status code!
    */
    it('should receive array of books', function(done) {
      chai
        .request(server)
        .get('/api/books')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body, 'response should be an array');
          assert.property(
            res.body[0],
            'commentcount',
            'Books in array should contain commentcount'
          );
          assert.property(
            res.body[0],
            'title',
            'Books in array should contain title'
          );
          assert.property(
            res.body[0],
            '_id',
            'Books in array should contain _id'
          );
          done();
        });
    });
    /*
    * ----[END of EXAMPLE TEST]----
    */
  });

  describe('Routing tests', function() {
    describe('POST /api/books', function() {
      it('should add new book if provided title', function(done) {
        const title = 'Sharknado Facts';

        chai
          .request(server)
          .post('/api/books')
          .send({ title })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.property(
              res.body,
              '_id',
              'Books in array should contain _id'
            );
            assert.property(
              res.body,
              'title',
              'Books in array should contain title'
            );
            assert.equal(
              res.body.title,
              title,
              'The book title should equal the input'
            );
            done();
          });
      });

      it('should not add new book without providing title', function(done) {
        chai
          .request(server)
          .post('/api/books')
          .send({})
          .end(function(err, res) {
            assert.equal(res.status, 400);
            assert.property(res.body, 'error', 'This should cause an error');
            assert.equal(res.body.error, 'no title was provided');
            done();
          });
      });
    });

    describe('GET /api/books', function() {
      it('should receive array of books', function(done) {
        chai
          .request(server)
          .get('/api/books')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'response should be an array');
            assert.property(
              res.body[0],
              'commentcount',
              'Books in array should contain commentcount'
            );
            assert.property(
              res.body[0],
              'title',
              'Books in array should contain title'
            );
            assert.property(
              res.body[0],
              '_id',
              'Books in array should contain _id'
            );
            done();
          });
      });
    });

    describe('GET /api/books/:id', function() {
      it('should not return book if provided with id not in db', function(done) {
        chai
          .request(server)
          .get('/api/books/123')
          .end(function(err, res) {
            assert.equal(res.status, 400);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'error', 'This should cause an error');
            assert.equal(res.body.error, 'invalid id');
            done();
          });
      });

      it('should return book if provided with valid id in db', function(done) {
        chai
          .request(server)
          .get(`/api/books/${books[0]._id}`)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'title', 'Book should contain title');
            assert.property(res.body, '_id', 'Book should contain _id');
            assert.property(
              res.body,
              'comments',
              'Book should contain an array of comments'
            );
            assert.isArray(res.body.comments, 'comments should be an array');
            assert.equal(res.body._id, books[0]._id, 'ids are not equal');
            assert.equal(
              res.body.title,
              books[0].title,
              'titles are not equal'
            );
            assert.deepEqual(
              res.body.comments,
              books[0].comments,
              'arrays do not have same comments'
            );
            done();
          });
      });
    });

    describe('POST /api/books/:id', function() {
      it('should add comment and return book object', function(done) {
        const comment = 'Totally tubular';
        chai
          .request(server)
          .post('/api/books/' + books[1]._id)
          .send({ comment })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'title', 'Book should contain title');
            assert.property(res.body, '_id', 'Book should contain _id');
            assert.property(
              res.body,
              'comments',
              'Book should contain an array of comments'
            );
            assert.isArray(res.body.comments, 'comments should be an array');
            assert.equal(res.body._id, books[1]._id, 'ids are not equal');
            assert.equal(
              res.body.title,
              books[1].title,
              'titles are not equal'
            );
            assert.deepEqual(
              res.body.comments,
              [...books[1].comments, comment],
              'arrays do not have same comments'
            );
            done();
          });
      });
    });
  });
});
