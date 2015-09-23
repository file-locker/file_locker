# file_locker

This is our group project for week 4 of the JavaScript Full-Stack Development Accelerator.
The file locker acts as a personal cloud. First, a user must be created by POSTing to the /api/signup route. Once a user is created and authenticated, the file locker is ready for use. 

### Functions that need a file id:

Download a file:

```GET /download/:id```

Update a file: (metadata)

```PATCH /updateFile/:id```

Remove a file:

```DELETE /removeFile/:id```


### Functions that do not need a file id:

Upload a file:

```POST /upload```

Get a list of current user's files:

```GET /userFiles```

Get metadata for stored files:

```GET /dataStats```
