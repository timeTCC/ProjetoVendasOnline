const express = require('express');
const app = express();
const path = require('path');
const db = require('./mysql/db');
const cors = require('cors');
const bodyParser = require('body-parser');


var usersRouter = require('./routes/users');
const productRouter = require('./routes/product');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials: true, origin: 'http://localhost:3030'}));
app.use('/users', usersRouter);
app.use('/product', productRouter);

module.exports = app;

app.listen(3333, () => {
  console.log('servidor ok');
  db.authenticate().then(() =>{
      console.log('Conectou no MYSQL')
  }).catch(() =>{
      console.log('Erro ao se conectar no MYSQL')
  })
});
