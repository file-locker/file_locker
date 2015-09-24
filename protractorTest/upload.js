var chai = require('chai');
var expect = chai.expect;

describe('downloads', function () {
    it('should download specified files', function (done) {
        browser.get('http://localhost:8080/');
        element(by.css('.fa-files-o')).click();
        element(by.id('username')).sendKeys('testuser');
        element(by.id('password')).sendKeys('password');
        element(by.id('login')).click();
        element(by.css('.fa-files-o')).click();
        element(by.css('.btn-primary')).click();
        element(by.id('uploadtags')).sendKeys('test tags');
        element(by.id('uploaddesc')).sendKeys('test desc');
        element(by.id('passphraseup')).sendKeys('test');
        element(by.id('uploadfile')).sendKeys(__dirname + '/protractortests/test.file');
        element(by.id('uploadbtn')).click();
/*        element(by.id('wrongkey')).isDisplayed()
            .then(function () {
                expect(false).to.eql(true);
                done();
            }, function () {
                expect(true).to.eql(false);
            });*/
    });

});

