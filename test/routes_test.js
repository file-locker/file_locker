'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaihttp = require('chai-http');
chai.use(chaihttp);
var handleError = require(__dirname + '/../lib/handle_error');
require(__dirname + '/../server');
var File = require(__dirname + '/../models/file');
var Metadata = require(__dirname + '/../models/metadata');
var User = require(__dirname + '/../models/user');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var mongoose = require('mongoose');

describe('files routes', function() {
  var testUser;

  before(function(done) {
    ee.emit('newUser', done);
  });

  ee.on('newUser', function(done) {
    var newUser = new User();
    newUser.username = 'user';
    newUser.generateHash('test', function(err, hash) {
      if (err) throw err;
      ee.emit('generateToken', newUser, done);
    });
  });

  ee.on('generateToken', function(newUser, done) {
    newUser.generateToken(function(err, token) {
      if (err) throw err;
      newUser.token = token;
      ee.emit('saveNewUser', newUser, done);
    });
  });

  ee.on('saveNewUser', function(newUser, done) {
    newUser.save(function(err, data) {
      if (err) throw err;
      testUser = data;
      ee.emit('createFile', done);
    });
  });

  ee.on('createFile', function(done) {
    var testFile = new File();
    testFile.fileContents = 'file contents here';
    testFile.save(function(err, data) {
      if (err) throw err;
      ee.emit('createMeta', data, done);
    });
  });

  ee.on('createMeta', function(data, done) {
    var meta = {};
    meta.fileLink = data._id.toString();
    meta.name = 'ITS A TEST';
    meta.tags = 'buggy';
    meta.createdBy = 'user';
    var testMeta = new Metadata(meta);
    ee.emit('saveMeta', testMeta, done);
  });

  ee.on('saveMeta', function(testMeta, done) {
    testMeta.save(function(err, data) {
      done();
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;
      done();
    });
  });

  it('should return 404 if download id doesn\'t exist', function(done) {
    chai.request('localhost:3000/fl')
    .get('/files/18798') //random id of non-existent file
    .set('authorization', 'BEARER ' + testUser.token)
    .end(function(err, res) {
      if (err) throw err;
      expect(err).to.eql(null);
      expect(res.status).to.eql(404);
      expect(res.body.msg).to.eql('File Not Found');
      done();
    });
  });

  it('should download the test file', function(done) {
    File.findOne({}, function(err, data) { //find saved file from Before block
      chai.request('localhost:3000/fl')
      .get('/files/' + data._id.toString())
      .set('authorization', 'BEARER ' + testUser.token)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg.fileContents).to.eql('file contents here');
        done();
      });
    }.bind(this));
  });

  it('should upload a file', function(done) {
    chai.request('localhost:3000/fl')
    .post('/files')
    .set('authorization', 'BEARER ' + testUser.token)
    .send({
      name: 'test name',
      tags: 'its okay',
      description: 'this is a test',
      fileContents: 'here are the contents',
      createdBy: 'testuser',
      orgFileSize: 100
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg.fileContents).to.eql('here are the contents');
      done();
    });
  });

  it('should be able to update a file', function(done) {
    Metadata.findOne({name: 'ITS A TEST'}, function(err, data) {
      chai.request('localhost:3000/fl')
      .patch('/files/' + data._id.toString())
      .set('authorization', 'BEARER ' + testUser.token)
      .send({name: 'updated filename', tags: 'you\'re it', description: 'it just sits there'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg.name).to.eql('updated filename');
        done();
      });
    });
  });

  it('should return a list of current user\'s files', function(done) {
    chai.request('localhost:3000/fl')
    .get('/userFiles')
    .set('authorization', 'BEARER ' + testUser.token)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg[0].name).to.eql('updated filename');
      done();
    });
  });

  it('should remove a file', function(done) {
    Metadata.findOne({name: 'updated filename'}, function(err, data) {      
      chai.request('localhost:3000/fl')
      .delete('/files/' + data._id.toString())
      .set('authorization', 'BEARER ' + testUser.token)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('deleting');
        done();
      });
    });
  });

  it('should give stats on all data', function(done) {
    chai.request('localhost:3000/fl')
    .get('/dataStats')
    .set('authorization', 'BEARER ' + testUser.token)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(typeof res.body.msg.fileCount).to.eql('number');
      expect(typeof res.body.msg.diskSize).to.eql('number');
      done();
    });
  });

  it('should log the user out', function(done) {
    chai.request('localhost:3000/fl')
    .get('/signout')
    .set('authorization', 'BEARER ' + testUser.token)
    .end(function(err, res) {
      expect(err).to.eql(null);
      done();
    });
  });
});
