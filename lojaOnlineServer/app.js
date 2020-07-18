const express = require('express');
const app = express();
const path = require('path');
const db = require('./mysql/db');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials: true, origin: 'http://localhost:3030'}));
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

app.listen(3333, () => {
  console.log('servidor ok');
  db.authenticate().then(() =>{
      console.log('Conectou no MYSQL')
  }).catch(() =>{
      console.log('Erro ao se conectar no MYSQL')
  })
});
