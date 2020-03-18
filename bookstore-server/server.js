const express = require("express");
const app = express();
var cors = require('cors')
var path= require('path');
var morgan = require('morgan');
var http = require('http');
var fs = require('fs');
app.use(cors());
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const Book = require('./api/routes/route_books');
const User = require('./api/routes/route_user');
//const Mobile = require('./api/routes/routes_mobile');
const Registration = require('./api/routes/routes_registration');

const connect = mongoose.connect(config.mongoUrl);




connect.then(
  db =>  {
    console.log('Connected to server');
  }, err =>  {
    console.log('Could not connect to db');
  }
)



const PORT=8080;

fs.readFile('./My Bookstore/index.html', function (err, html) {

    if (err) throw err;

    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html.toString());
        response.end();
    }).listen(PORT);
});


app.use(morgan('dev'))
app.use(bodyParser.json());

app.use('/books', Book)
app.use('/user', User)
//app.use('/mobile', Mobile)
app.use('/registration', Registration)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.listen(5001, () => {
  console.log("Server is running on port 4001");
});


module.exports = app;
