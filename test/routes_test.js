'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaihttp = require('chai-http');
chai.use(chaihttp);
var handleError = require(__dirname + '/../lib/handle_error');
require(__dirname + '/../server');
var File = require(__dirname + '/../models/file');
var Metadata = require(__dirname + '/../models/metadata');
var mongoose = require('mongoose');


describe('files routes', function() {
  before(function() {
    var testFile = new File();
    testFile.fileContents = 'file contents here';
    testFile.save(function(err, data) {
      var meta = {};
      meta.fileLink = data._id.toString();
      meta.name = 'ITS A TEST';
      meta.tags = 'buggy';

      var testMeta = new Metadata(meta);
      testMeta.save(function(err, data) {
      });
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
    .end(function(err, res) {
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
      .send({name: 'updated filename', tags: 'you\'re it', description: 'it just sits there'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg.name).to.eql('updated filename');
        done();
      });
    });
  });

  it('should remove a file', function(done) {
    Metadata.findOne({name: 'updated filename'}, function(err, data) {      chai.request('localhost:3000/fl')
      .delete('/files/' + data._id.toString())
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('deleting');
        done();
      });
    });
  });

  //waiting until can pull username from headers
  it('should return a list of current user\'s files');
  // it('should return a list of a users files', function(done) {
  //   chai.request('localhost:3000/fl')
  //   .get('/userFiles')
  //   .end(function(err, res) {
  //     expect(err).to.eql(null);
  //     expect(res.body.msg.length).to.be.above(0);
  //     done();
  //   });
  // });
  
  it('should give stats on all data', function(done) {
    chai.request('localhost:3000/fl')
    .get('/dataStats')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(typeof res.body.msg.fileCount).to.eql('number');
      expect(typeof res.body.msg.diskSize).to.eql('number');
      done();
    });
  });
});
