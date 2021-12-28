// admin ile ilgili isteklerin calıştracağı js
var express = require('express');
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
const router=express.Router();



var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '1234',
	database : 'gains'
});





module.exports = router;