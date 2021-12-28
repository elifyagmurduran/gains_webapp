var express = require('express');
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const app =express();

//const port = process.env.PORT || 5000

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '1234',
	database : 'gains'
});


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const adminrouter = require('./admin');
const userrouter = require('./user');

///routers
app.use('/admin',adminrouter);
app.use(userrouter);

// karşılığı olmayan bir istek geldiğinde
app.use((req,res)=>{
	res.statusCode(404);
	res.send('<h1> Page not Found </h1>')
})



app.listen(3000, ()=>{
    console.log('listen port 3000');
});