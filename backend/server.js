const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const db = require('./utils/db');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 5000;
const { Marker } = require('./models/marker');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({
  storage: storage
});

var dir = path.join(__dirname, '');

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

app.get('/uploads/*', function (req, res) {
    var file = path.join(dir, req.path.replace(/\/$/, '/index.html'));
    if (file.indexOf(dir + path.sep) !== 0) {
        return res.status(403).end('Forbidden');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


app.use(bodyParser.json())

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', (req, res) => {
  res.send(`Listening on ${PORT}`);
})

app.get('/marker', (req, res) => {
  Marker.find().then((markers) => {
    res.send({ markers });
  }, (e) => {
    res.status(400).send(e);
  });
});

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const meta = req.body;

  const item = {
    title: meta.address || '',
    address: meta.address || '',
    lat: meta.lat || 0,
    lng: meta.lng || 0,
    icon: file.path || 'uploads/default.png',
    url: file.path || 'uploads/default.png'
  }
  var markerInstance = new Marker(item);
  markerInstance.save().then((marker) => {
    res.send({marker});
  }, (e) => {
    res.status(400).send(e);
  });
 });