const express = require('express');
const app = express();
const path = require('path');
const db = require('./mysql/db');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var usersRouter = require('./routes/users');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const criptografiaRouter = require('./routes/criptografia');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials: true, origin: 'http://localhost:3030'}));
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/criptografia', criptografiaRouter);

module.exports = app;

app.listen(3333, () => {
  console.log('servidor ok');
  db.authenticate().then(() =>{
      console.log('Conectou no MYSQL')
  }).catch(() =>{
      console.log('Erro ao se conectar no MYSQL')
  })
});
