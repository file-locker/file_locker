exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['download.js', 'upload.js', 'login.js', 'update.js', 'delete.js']
};
