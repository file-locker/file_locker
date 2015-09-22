'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/user_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');
var host = 'localhost:3000/fl';

describe('creating new user', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should create a new user', function(done) {
    chai.request(host)
      .post('/signup')
      .send({username: 'test', password: 'user', email: 'testemail'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body.msg).to.eql('string');
        done();
      });
  });

  it('should log into an existing user', function(done) {
    chai.request(host)
      .get('/signin')
      .auth('test', 'user')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.token).to.be.a('string');
        done();
      });
  });
});

