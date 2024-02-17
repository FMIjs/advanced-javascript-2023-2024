global.__basedir = __dirname;

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const api = require('./api');

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__basedir, 'static')));

api.connect(app, '/api');

app.get('/', (_, res) => res.sendFile(path.join(__basedir, 'index.html')));
app.get('*', (_, res) => res.status(404).send('PAGE NOT FOUND!'));

app.use(function (err, _, res) {
  if (err.message === 'BAD_REQUEST') { res.status(400).send('BAD REQUEST'); return; }
  res.status(500).send('SERVER ERROR');
});

app.listen(port, () => console.log(`Server is listening on :${port}`))