'use strict';

var chai = require('chai');
var expect = chai.expect;
var handleError = require(__dirname + '/../lib/handle_error');

describe('Error Handling', function() {

  var res;
  function Res() {
    this.statusCode = 0;
    this.jsonMsg = {};
    this.status = function(code) {
      this.statusCode = code;
      return this;
    }.bind(this);
    this.json = function(msg) {
      this.jsonMsg = msg;
    }.bind(this);
  }

  before(function() {
    res = new Res();
  });

  it('should handle a 401 error', function() {
    handleError.err401(null, res);
    expect(res.statusCode).to.eql(401);
    expect(res.jsonMsg.msg).to.eql('Forbidden');
  });

  it('should handle a 404 error', function() {
    handleError.err404(null, res);
    expect(res.statusCode).to.eql(404);
    expect(res.jsonMsg.msg).to.eql('File Not Found');
  });

  it('should handle a 500 error', function() {
    handleError.err500(null, res);
    expect(res.statusCode).to.eql(500);
    expect(res.jsonMsg.msg).to.eql('Internal Server Error');
  });

});
