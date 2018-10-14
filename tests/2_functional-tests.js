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
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', done => {
     chai.request(server)
      .get('/api/books')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', () => {
    let _id;

    suite('POST /api/books with title => create book object/expect book object', () => {
      
      test('Test POST /api/books with title', done => {
        chai.request(server)
        .post('/api/books')
        .send({title: 'Title'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.title, 'Title');
          assert.property(res.body, '_id');
          _id = res.body._id;
          done();
        });
      });
      
      test('Test POST /api/books with no title given', done => {
        chai.request(server)
        .post('/api/books')
        .send({title: ''})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'missing title');
          done();
        });
      });
      
    });

    suite('GET /api/books => array of books', () => {
      
      test('Test GET /api/books',  done => {
        chai.request(server)
        .get('/api/books')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'commentcount');
          assert.property(res.body[0], 'title');
          assert.property(res.body[0], '_id');
          done();
        });
      });      
      
    });

    suite('GET /api/books/[id] => book object with [id]', () => {
      
      test('Test GET /api/books/[id] with id not in db',  done => {
        chai.request(server)
        .get('/api/books/12345678')
        .end((err, res) => {
          assert.equal(res.status, 200);
          console.log(res.text);
          assert.equal(res.text, 'no book exists');
          done();
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  done => {
        chai.request(server)
        .get('/api/books/' + _id)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body._id, _id);
          assert.equal(res.body.title, 'Title');
          assert.isArray(res.body.comments);
          done();
        });
      });
      
    });

    suite('POST /api/books/[id] => add comment/expect book object with id', () => {
      
      test('Test POST /api/books/[id] with comment', done => {
        chai.request(server)
        .post('/api/books/' + _id)
        .send({comment: 'test comment'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body._id, _id);
          assert.equal(res.body.title, 'Title');
          assert.equal(res.body.comments[0], 'test comment');
          done();
        });
      });
      
    });

  });

});
