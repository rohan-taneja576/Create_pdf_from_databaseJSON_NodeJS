const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname + '/public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

const pdfRoute = require('./routes/pdfmake');
app.use('/pdfmake', pdfRoute);

app.listen('5000', () => {
  console.log('server started at port 5000');
});
