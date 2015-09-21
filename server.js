'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/users_dev');
//one db, two collections

var fileRouter = require(__dirname + '/routes/files_routes');
var userRouter = require(__dirname + '/routes/users_routes');

app.use('/fl/', fileRouter);
app.use('/fl/', userRouter);

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('server is running on ' + port);
});
