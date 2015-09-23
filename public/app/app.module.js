var angular = require('angular-bsfy');

var app = angular.module('main', [require('angular-bsfy/route').name]);

require('./components/home/index');
require('./components/waiting/index');
require('./components/register/index');
require('./components/login/index');
require('./components/user/index');
require('./components/dialog/index');
require('./components/files/index');

app.config(require('./app.routes'));