# file_locker

This is our group project for week 4 of the JavaScript Full-Stack Development Accelerator.
The file locker acts as a personal cloud. First, a user must be created by POSTing to the /api/signup route. Once a user is created and authenticated, the file locker is ready for use. 

//end points:

create account/register -/fl/signup post
user login -/fl/login get

upload file /fl/upload post
download file /fl/download get
fetch file list /fl/allFiles get
delete file /fl/removeFile delete
patch meta data (tags) /fl/updateFile patch
secret cow level /fl/moo get
global data /fl/dataStats get

