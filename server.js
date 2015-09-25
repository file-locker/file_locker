'use strict';

var express = require('express');
var app = express();
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/file_locker');
process.env.INVITATION_CODE = process.env.INVITATION_CODE || 'FLInvitationCode';
process.env.APP_SECRET = process.env.APP_SECRET || 'tortilla';
//one db, two collections

var fileRouter = require(__dirname + '/routes/files_routes');
var userRouter = require(__dirname + '/routes/users_routes');

app.use(express.static('public'));
app.use(passport.initialize());
app.use('/fl/', fileRouter);
app.use('/fl/', userRouter);

app.use(function(req, res) {
  res.status(404).send('Page not found');
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('server is running on ' + port);
});
