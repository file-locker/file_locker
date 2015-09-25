# file_locker

[![Build Status](https://travis-ci.org/file-locker/file_locker.svg?branch=master)](https://travis-ci.org/file-locker/file_locker)

This is our group project for week 4 of the JavaScript Full-Stack Development Accelerator.
The file locker acts as a personal cloud, keeping your files secure from anyone and everyone but yourself. Your files are encrypted before they are uploaded to our server, meaning that no one other than you has the ability to decrypt your files. As such, we offer no support for lost or forgotten passwords.

### Getting started:

First, create a new account using using your invitation code. Once your account has been created and authenticated, the file locker is ready for use. Feel free to sign in and store your private documents for later access.

### File management routes:

Download a file:
```GET /files/:id```

Upload a file:
```POST /files```

Update a file: (metadata)
```PATCH /files/:id```

Remove a file:
```DELETE /files/:id```

### User routes:

Create a new user:
```POST /signup```

Sign in to File Locker:
```GET /signin```

Sign out of File Locker:
```GET /signout```

Get a list of current user's files:
```GET /userFiles```

Get show stats for all stored files:
```GET /dataStats```
