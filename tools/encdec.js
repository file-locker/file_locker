var crypto = require('crypto');
var zlib = require('zlib');
var fs = require('fs');

var file = process.argv[2];
var enc = (process.argv[3].slice(0,1) === 'e' ? true : false);
var pass = process.argv[4];

var r = fs.createReadStream(file);

var zip = zlib.createGzip();
var unzip = zlib.createGunzip();

var encrypt = crypto.createCipher('aes-256-ctr', pass);
var decrypt = crypto.createDecipher('aes-256-ctr', pass);

var fileNameParts = file.split('.');
var newFile = '';

if (enc){
  newFile = file + '.enc';
  var w = fs.createWriteStream(newFile);
  r.pipe(zip).pipe(encrypt).pipe(w);
} else {
  fileNameParts.length = fileNameParts.length - 1;
  newFile = fileNameParts.join('.') + '.dec';
  var w = fs.createWriteStream(newFile);
  r.pipe(decrypt).pipe(unzip).pipe(w);
}

unzip.on('error', function(err){
  console.log('incorrect password');
  fs.unlinkSync(newFile);
  return false;
});
