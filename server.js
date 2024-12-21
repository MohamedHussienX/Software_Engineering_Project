const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const {handlePrivateBackendApi} = require('./routes/private/api');
const {handlePublicBackendApi} = require('./routes/public/api');
const {handlePublicFrontEndView} = require('./routes/public/view');
const {handlePrivateFrontEndView} = require('./routes/private/view');
const multer = require('multer');
const path = require('path');


const {authMiddleware} = require('./middleware/auth');

// view engine setup
app.set('views', './views');
app.set('view engine', 'hjs');
app.use(express.static('./public'));

// Handle post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

handlePublicFrontEndView(app);
handlePublicBackendApi(app);
app.use(authMiddleware);
handlePrivateFrontEndView(app);
handlePrivateBackendApi(app);

const uploadPath = path.join('./public', 'images'); // Replace with your desired directory

// Configure multer to store files with specific names
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original name or customize it as needed
  }
});

const upload = multer({ storage });

// Endpoint to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  res.send({ message: 'File uploaded successfully', file: req.file });
});


app.listen(3000,'192.168.1.36', () => {
    console.log("Server is now listening at port 3000 on http://localhost:3000/");
});







