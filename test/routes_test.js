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
      if (err) return handleError.err500(err, res);
      var testMeta = new Metadata();
      testMeta.fileLink = data._id.toString(); //need toString here to convert.
      testMeta.tags = 'buggy';
      testMeta.save(function(err, data) {
        if (err) return handleError.err500(err, res);
      });
    });
    var testMeta = new Metadata();
//create files to download/update/delete
//use a mongoose check to check existence
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;
      done();
    });
  });

  it('should return 404 if download id doesn\'t exist', function(done) {
    chai.request('localhost:3000/fl')
    .get('/download/18798') //random id of file
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(404);
      expect(res.body.msg).to.eql('File Not Found');
      done();
    });
  });

  it('should be able to download the test file', function(done) {
    File.findOne({}, function(err, data) { //find saved file from Before block
      chai.request('localhost:3000/fl')
      .get('/download/' + data._id.toString())
      .end(function(err, res) {
        expect(err).to.eql(null)
        expect(res.body.msg.fileContents).to.eql('file contents here');
        done();
      });
    }.bind(this));
  });

  it('should be able to upload a file', function(done) {
    chai.request('localhost:3000/fl')
    .post('/upload')
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

});
