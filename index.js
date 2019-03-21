let express = require('express');
let app = express();
let server = require('http').Server(app);
const multer = require('multer');
let cors          = require  ('cors') ;
let corsOptions   = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.options('*', cors(corsOptions));
let path = require('path');
let UPLOAD_PATH = './uploads';

let storage = multer.diskStorage({
    destination: UPLOAD_PATH,
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.basename(file.originalname));
    }
});

const upload = multer({
      storage: storage,
      limits: {fileSize: 20 * 1024 * 1024}
});

// Expose the /upload endpoint
const http = require('http').Server(app);

app.post('/upload', upload.single('photo'), (req, res, next) => {
    console.log('req get');
  res.json(req.file)
});

app.post('/file_upload', upload.single('document'), (req, res, next) => {
    console.log('req get');
  res.json(req.file)
});

app.use(express.static(path.join(__dirname, "/")));

let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
