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

describe('user login/signup test', function() {
  var testUser = '';

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should create a new user', function(done) {
    chai.request(host)
      .post('/signup')
      .send({username: 'test', password: 'user', email: 'testemail', invitationCode: process.env.INVITATION_CODE})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.user.password).to.eql(undefined);
        expect(res.body.user.username).to.eql('test');
        expect(typeof res.body.user.token).to.eql('string');
        testUser = res.body.user.token;
        done();
      });
  });

  it('should log the user out', function(done) {
    chai.request(host)
    .get('/signout')
    .set('authorization', 'BEARER ' + testUser)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
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
        expect(res.body.user.username).to.eql('test');
        expect(res.body.user.token).to.be.a('string');
        expect(res.body.user.token).to.not.eql(testUser);
        done();
      });
  });
});

