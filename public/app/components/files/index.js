var app = require('angular-bsfy').module('main');

app.directive('fileDialog', require('./fileDialogDirective'));
app.controller('fileController', require('./fileController'));
app.factory('fileCryptService', require('./fileCryptService'));
app.factory('fileTransferService', require('./fileTransferService'));