# File Locker

[![Build Status](https://travis-ci.org/sschadwick/file_locker.svg)](https://travis-ci.org/sschadwick/file_locker)

The app is hosted at https://file-locker.herokuapp.com/

File Locker is a MEAN-stack app that offers a secure personal cloud storage service. The server is written in Node.js and Express.js, with MongoDB database integration and a front-end written in Angular.js. Any files uploaded to File Locker are compressed and encrypted using AES-256-CTR. User authentication is handled by Passport, bcrypt is used to generate hashes, and Encrypted Access Token (EAT) is used to encode user tokens.

Files are encrypted on the client-side, before they are uploaded to the server. This means that only the author of a file with the correct decryption phrase is able to view the files. As such,there is no support offered for lost encryption passwords. Functionality of File Locker is similar to most commercial cloud solutions, however due to the security design and implementation users are not able to share their files with others.

### Getting started:

First, create a new account using using the default invitation code: 'FLInvitationCode'. Once your account has been created and authenticated, File Locker is ready for use.

TODO: Picture of default page and creating a new account.

#### Uploading:
Uploading a file is intuitive and simple. Once a file is chosen to be uploaded, the user is prompted to add tags or a description to the file, as well as creating a passphrase to encrypt that specific file.

TODO: Picture of choosing a file to upload. Possibly creating a simple txt doc to show the progress.

#### Editing a file:
Although the files themselves are stored encrypted in the database, their metadata is not. This means that users are able to rename or edit the description on their files without the passphrase.

TODO: Picture of changing the name of a file. Show how you can upload text.txt and download whatever.txt

#### Downloading:
To download a file, the user simply chooses which file they would like to download, and then enters their passphrase. Only the correct passphrase for that file will initiate the download.

TODO: Picture of downloading a file.
