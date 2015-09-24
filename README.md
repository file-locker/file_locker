# file_locker

[![Build Status](https://travis-ci.org/file-locker/file_locker.svg?branch=master)](https://travis-ci.org/file-locker/file_locker)

This is our group project for week 4 of the JavaScript Full-Stack Development Accelerator.
The file locker acts as a personal cloud. First, a user must be created by sending a POST request to the /ls/signup route. Once a user is created and authenticated, the file locker is ready for use. 

### CRUD functions:

Download a file:
```GET /files/:id```

Upload a file:
```POST /files```

Update a file: (metadata)
```PATCH /files/:id```

Remove a file:
```DELETE /files/:id```

### non-CRUD :

Get a list of current user's files:
```GET /userFiles```

Get metadata for stored files:
```GET /dataStats```
