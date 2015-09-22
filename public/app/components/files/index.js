var app = require('angular-bsfy').module('main');

app.factory('fileCryptService', require('./fileCryptService'));
app.factory('fileTransferService', require('./fileTransferService'));
app.directive('fileDialog', require('./fileDialogDirective'));
app.controller('fileController', require('./fileController'));
