module.exports = function() {
    return {
        replace: true,
        templateUrl: 'app/components/files/fileDialogView.html',
        link: function (scope, element, attrs){
            function validateUpload(){
                if (!($('#uploadfile').files) && $('passphraseup').value.length){
                    return false;
                }
                return false;
            }
        }
    };
};