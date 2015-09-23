var chai = require('chai');
var expect = chai.expect;

var decoder = function () {
    this.decode = function (data) {
        return data;
    };
};

var cryptoLib = {
    key: null,
    data: null,
    AES: {
        encrypt: function (data, pass) {
            return '' + pass + ':::' + data;
        },
        decrypt: function (data, pass) {
            data = '666c6c6f636b' + data;
            data = data.replace(':::', '');
            data = data.replace(pass, '');
            return data;
        }
    },
    enc: {
        hex: function () {

        }
    }
};

var Blob = function (val) {
    this.value = val;
};

var crypto = require(__dirname + '/../public/app/components/files/fileCryptService')(decoder, cryptoLib, Blob);

describe('Encryption/Decryption Service', function () {
    var testContent = 'This is a simple piece of text\n\nWith linebreaks.';
    var testPass = 'test2';

    it('should encrypt a file', function () {
        var encrypted = crypto.encrypt(null, testContent, testPass);

        expect(encrypted).to.eql(testPass + ':::' + 'fllock' + testContent);
    });
    it('should decrypt a file', function () {
        var decrypted = crypto.decrypt(null, testContent, testPass);

        expect(decrypted.value[0]).to.eql({
            '0': 0, '1': 0, '2': 0, '3': 0, '4': 10, '5': 0, '6': 0, '7': 0, '8': 0,
            '9': 0, '10': 206, '11': 0, '12': 15, '13': 0, '14': 0, '15': 0,
            '16': 0, '17': 0, '18': 0, '19': 0, '20': 235, '21': 0, '22': 10, '23': 0
        });
    });
    it('should fail on bad password', function (done) {
        cryptoLib.AES.decrypt = function (data, pass){
            return data;
        };
        var newCrypto = require(__dirname + '/../public/app/components/files/fileCryptService')(decoder, cryptoLib, Blob);
        try {
            var decrypted = newCrypto.decrypt(null, testContent, 'wrongpass');
        } catch (err) {
            expect(err).to.not.eql(null);
            done();
        }
    });
});

