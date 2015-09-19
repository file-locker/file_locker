app.factory('fileCryptService', function () {
    var fileCryptService = {};

    fileCryptService.encrypt = function ($scope, blob, pass) {

        var data = lzw_encode(blob);
        return CryptoJS.AES.encrypt(data, pass).toString();

    };

    fileCryptService.decrypt = function ($scope, cipher, pass) {

        var decrypted = CryptoJS.AES.decrypt(cipher.toString(),
            pass).toString(CryptoJS.enc.Base64);
        return lzw_decode(atob(decrypted));
    };

    return fileCryptService;
});