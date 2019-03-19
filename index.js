const multer = require('multer');
let cors          = require  ('cors') ;
let corsOptions   = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
let path = require('path');
let UPLOAD_PATH = './uploads';

let storage = multer.diskStorage({
    destination: UPLOAD_PATH,
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
      storage: storage,
      limits: {fileSize: 20 * 1024 * 1024}
});

// Expose the /upload endpoint
const app = require('express')();
const http = require('http').Server(app);

app.post('/upload', upload.single('photo'), (req, res, next) => {
    console.log('req get');
  res.json(req.file)
});

let port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
