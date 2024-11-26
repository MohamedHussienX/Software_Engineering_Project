const express = require('express');
const app = express()
const bodyParser = require("body-parser");
const {handlePrivateBackendApi} = require('./routes/private/api');
const {handlePublicBackendApi} = require('./routes/public/api');
const {authMiddleware} = require('./middleware/auth');
// ./ means look inside the parent folder of your current file 
// by using ./ in this server.js 
// we are looking for files and folders inside 
// DB-Tutorial-Backend (the parent folder of server.js)


// Handle post, delete and put request
// whenever you are using thunderclient extension 
// you send the data in request body then select json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// public links that doesn't require authentication
handlePublicBackendApi(app);
// decides which based on checks whatever
// user can proceed to private links 
app.use(authMiddleware);
// private links that require authentication
handlePrivateBackendApi(app);

// different projects requires different port numbers
// to distinguish between projects
app.listen(3000, () => {
    console.log("Server is now listening at port 3000 on http://localhost:3000/");
});







