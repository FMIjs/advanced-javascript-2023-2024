const express = require('express');
const bodyParser = require('body-parser');
const port = 8080;
const apiRouter = require('./api');

const app = express();

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.post('/', function (req, res) {
  res.send(req.body);
});

app.listen(port, function () {
  console.log(`Server is listening on :${port}`)
});