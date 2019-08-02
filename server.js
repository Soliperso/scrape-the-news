// DEPENDENCIES
//----------------------------------------------------
const mongoose = require('mongoose');
const logger = require('morgan');
const express = require('express');
const exphbs = require('express-handlebars');

const routes = require('./controller/controller.js');

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(process.cwd() + '/public'));


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// CONNECTING TO MONGO
mongoose.connect('mongodb://heroku_jxkjhg1v:6s68tem51mlionrj2sneb7b53c@ds127988.mlab.com:27988/heroku_jxkjhg1v');


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Mongoose!')
});


app.use('/', routes);

const port = process.env.PORT || 3000;

// LISTEN TO SERVER
app.listen(port, function(){
  console.log(`Listening to the server on PORT ${port}`);
});