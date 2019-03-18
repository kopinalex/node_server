//Imports
let express = require('express');
let app = express();
let mongoose      = require  ('mongoose') ;
let bodyParser    = require  ('body-parser') ;
let cors          = require  ('cors') ;
let corsOptions   = require  ('./config/cors') ;
let config        = require  ('./config/config.json') ;
let server_routes   = require  ('./routes/server_routes') ;
let path = require('path');
let intel = require('intel');
let fs = require('fs');
let morgan =  require('morgan');
let server = require('http').Server(app);
let cookieParser = require('cookie-parser');
// const https = require('https');

// ========= Certificate SSL ===========
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.impltech.com/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/api.impltech.com/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/api.impltech.com/chain.pem', 'utf8');
//
// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca
// };
//=======================================

// виносимо в окремий модуль
app.options('*', cors(corsOptions));

/* логгирование */
intel.addHandler(new intel.handlers.File('./logs/file.log'));

/* логгирование */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/access.log'), {flags: 'a'});
// *** config middleware *** //
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.raw({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :date[clf] :http-version', {stream: accessLogStream}));
app.use(cookieParser());



// app.get('/', (req, res) => {});
app.post('/', (req, res) => {});

app.use(express.static(__dirname, { dotfiles: 'allow' } )); //?

app.use(express.static(path.join(__dirname, "/uploads")));

//allow get index.html (? tempotary)
app.get('/*', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.header('Content-Type', 'text/html');
  res.header('Accept-Ranges', 'bytes');
  res.setHeader('connection', 'keep-alive');
  res.sendFile(path.join(__dirname, 'uploads', 'index.html'))
});

//=== use https server===
// const httpsServer = https.createServer(credentials, app);
// httpsServer.listen(1443, () => {
//   console.log('HTTPS Server running on port 1443')
// });

mongoose.connect(config.db.database, { useNewUrlParser: true },(err, res) => {

  if(err) {
    console.log('Database error: ' + err);
  } else {

    console.log('Connected to database ' + config.db.database);
  }
});

mongoose.Promise = require('bluebird');
app.use('/api',  server_routes);
server.listen(config.serverPort, () => console.log(`API running on localhost:${config.serverPort}`));

