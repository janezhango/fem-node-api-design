var app     = require('./server');
var request = require('supertest');
var expect  = require('chai').expect;

// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, POST, GET
// to run the test type mocha server/specs.js







//TODO: create describe blocks for each HTTP Verb
describe('[-----------LIONS API-----------]', function() {
  var lion;
  //runs before each describe
  before(function() {
    lion = {
      name: "testLion",
      gender: 'male',
      pride: 'pride1',
      id: 1,
      age: 1
    };
  })

  describe('----GET REQUESTS----', function() {
    it('should get all lions', function(done) {
      request(app)
        .get('/lions')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('array');
          done();
        })
    });


    it('should return a particular lion', function(done) {
      request(app)
        .get('/lions/:id')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('object');
          done();
        })
    });
  });



  describe('----POST REQUESTS----', function() {
    it('should create a lion', function(done) {
      request(app)
        .post('/lions')
        .send(lion)
        .set('Accept', 'application/json')
        .expect(201)
        .end(function(err, res) {
          var requestLion = res.body;
          expect(requestLion).to.be.an('object')
          expect(requestLion).to.eql(lion)
          done()
        })
    });
  });




  describe('----DELETE REQUESTS----', function() {
    //Before each it send a lion
    beforeEach(function() {
      request(app)
        .post('/lions')
        .send(lion)
        .set('Accept', 'application/json')
        .expect(201)
    });

    it('should delete a lion', function() {
      request(app)
        .post('/lions')
        .send(lion)
        .set('Accept', "application/json")
        .expect(200)
        .end(function(err, res) {
          var deletedLion = res.body;
          request(app)
            .delete('/lions/' + lion.id)
            .end(function(err, res) {
              expect(res.body).to.eql(lion);
              done();
            })
        })
    });
  });



  describe('----PUT REQUESTS----', function() {
    it('should update a lion', function() {
      request(app)
        .post('/lions')
        .send(lion)
        .set('Accept', "application/json")
        .expect(200)
        .end(function(err, res) {
          var update = res.body;
          request(app)
            .put('/lions/' + lion.id)
            .send({
              name: "new name"
            })
            .end(function(err, res) {
              expect(res.body.name).to.equal('new name');
              done();
            })
        })
    });

  });


});
