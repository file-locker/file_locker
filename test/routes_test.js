'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaihttp = require('chai-http');
chai.use(chaihttp);
var handleError = require(__dirname + '/../lib/handle_error');
require(__dirname + '/../server');

describe('files routes', function() {
  it('should return 404 if download id doesn\'t exist', function(done) {
    chai.request('localhost:3000/fl')
    .get('/download/18798') //random id of file
    .end(function(err, res) {
      if (err) handleError.err500(err, res);
      expect(res.status).to.eql(404);
      expect(res.body.msg).to.eql('File Not Found');
      done();
    });
  });

});
