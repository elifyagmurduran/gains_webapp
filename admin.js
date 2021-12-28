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

router.post('/adminlogin', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM Yetkili WHERE Kullanıcıadı = ? AND şifre = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				
                response.send('Correct');
				response.redirect('/index.html');
                //response.redirect(***)  //anasayfaya yönlendir
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

router.post('/editpage', function(request, response)
{
	var id = request.body.id;
	var hareketAdı = request.body.hareketAdı;
	var süre = request.body.süre;

	connection.query('UPDATE Hareket SET Süre= ?  WHERE ID= ? OR HareketAdı= ?',[süre,id,hareketAdı], function(error, results, fields)
	{
		if (results.length > 0)
		{
			console.log(results);
			response.send('Güncellendi');
		}
		else 
		{
			response.send('Güncellenemedi');
		}
	});
});



module.exports = router;