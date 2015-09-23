// 'use strict';

// var chai = require('chai');
// var chaiHttp = require('chai-http');
// chai.use(chaiHttp);
// var expect = chai.expect;
// process.env.MONGO_URL = 'mongodb://localhost/user_test';
// require(__dirname + '/../server');
// var mongoose = require('mongoose');
// var User = require(__dirname + '/../models/user');
// var host = 'localhost:3000/fl';

// describe('creating new user', function() {
//   var testUser;

//   before(function(done) {
//   var newUser = new User();
//   newUser.username = 'user';
//     newUser.generateHash('testpass', function(err, hash) {
//       if (err) throw err;
//       newUser.generateToken(function(err, token) {
//         if (err) throw err;
//         newUser.token = token;
//         newUser.save(function(err, data) {
//           if (err) throw err;
//           testUser = data;
//           done();
//         });
//       });
//     });
//   });

//   after(function(done) {
//     mongoose.connection.db.dropDatabase(function() {
//       done();
//     });
//   });

//   it('/user/dataStats get test', function(done) {
//     chai.request(host)
//       .get('/dataStats')
//       .set('authorization', 'BEARER ' + testUser.token)
//       .end(function(err, res) {
//         console.log('res body: ', res.body);
//         expect(err).to.eql(null);
//         expect(res.body.msg).to.eql('success');
//         done();
//       });
//   });
// });
