const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const users = ['Gosho', 'Pesho', 'Ivan'];
  res.render('home', { message: "Hello from EJS user list!", users });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.post('/form', (req, res) => {
  console.log(req.body);
  // ...
  res.redirect('/');
});
app.get('/form', (req, res) => {
  res.render('form');
});

app.listen(8080, () => {
  console.log('Server is listening on :8080');
});