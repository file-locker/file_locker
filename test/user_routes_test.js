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

describe('user login/signup test', function(done) {
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
        expect(res.body.user.username).to.eql('test');
        done();
      });
  });

  it('should log into an existing user', function(done) {
    chai.request(host)
      .get('/signin')
      .auth('test', 'user')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.user.token).to.be.a('string');
        done();
      });
  });
});

