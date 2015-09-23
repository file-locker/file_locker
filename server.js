'use strict';

var express = require('express');
var app = express();
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/file_locker');
process.env.APP_SECRET = 'tortilla';
process.env.INVITATION_CODE = 'FLInvitationCode';
//one db, two collections

var fileRouter = require(__dirname + '/routes/files_routes');
var userRouter = require(__dirname + '/routes/users_routes');

app.use(express.static('public'));
app.use(passport.initialize());
app.use('/fl/', fileRouter);
app.use('/fl/', userRouter);

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('server is running on ' + port);
});
