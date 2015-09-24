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
        element(by.css('.btn-success')).click();
        element(by.id('updfilename')).sendKeys('test.file');
        element(by.id('updtags')).sendKeys('test tags');
        element(by.id('upddesc')).sendKeys('a test file');
        element(by.id('updatebtn')).click();
        /*        element(by.id('wrongkey')).isDisplayed()
         .then(function () {
         expect(false).to.eql(true);
         done();
         }, function () {
         expect(true).to.eql(false);
         });*/
    });

});

