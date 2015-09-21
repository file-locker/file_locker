'use strict';

var chai = require('chai');
var expect = chai.expect;
var resHandler = require(__dirname + '/../lib/response_handler');

describe('response handler', function(){

  var res;

  function Res(){
    this.statusCode = 0;
    this.jsonMsg = {};
    this.status = function(code){
      this.statusCode = code;
      return this;
    }.bind(this);
    this.json = function(msg){
      this.jsonMsg = msg;
    }.bind(this);
  }

  before(function(){
    res = new Res(); 
  });

  it('should send a 200 response', function(){
    resHandler.send200(res, 'testmsg200');
    expect(res.statusCode).to.eql(200);
    expect(res.jsonMsg).to.eql({msg: 'testmsg200'});
  });


  it('should send a 201 response', function(){
    resHandler.send201(res, 'testmsg201');
    expect(res.statusCode).to.eql(201);
    expect(res.jsonMsg).to.eql({msg: 'testmsg201'});
  });


  it('should send a 202 response', function(){
    resHandler.send202(res, 'testmsg202');
    expect(res.statusCode).to.eql(202);
    expect(res.jsonMsg).to.eql({msg: 'testmsg202'});
  });


});
