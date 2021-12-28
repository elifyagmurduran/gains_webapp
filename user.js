// kullanıcı ile ilgili isteklerin calıştracağı js
var express = require('express');
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
const { type } = require('express/lib/response');
const router=express.Router();



var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '1234',
	database : 'gains'
});


router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.post('/login', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM Kullanıcı WHERE Kullanıcıadı = ? AND şifre = ?', [username, password], function(error, results, fields) {
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


router.post('/register', function(request, response) {
	
    var username = request.body.username;
	var password = request.body.password;

	if (username && password) {
		connection.query("INSERT INTO Kullanıcı ( KullanıcıAdı, Şifre) VALUES  (? ,?)", [username, password], function(error, results, fields) {
			console.log(results)
			if (results.length > 0) {
                
                response.send('Kullanıcı eklenemedi');
			} else {
				response.send('Kullanıcı eklendi');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


router.get('/kas', function(request, response) {
	
	connection.query('SELECT KasAdı from Kas ', function(error, results, fields) {
		if (results.length > 0) {
			console.log(results);
			
			const responseData ={}
			var len = results.length;
			for (var i = 0; i < len; i++)
				responseData[i+1]=results[i].KasAdı;
			

			const jsonContent = JSON.stringify(responseData);  //string//object
			console.log(typeof(jsonContent))
			console.log(typeof(responseData))
  			response.end(jsonContent);
			
		} else {
			response.send('results boş');
		}			
		
	});
	//response.end();
});

router.post('/settings', function(request, response) 
{
	var username = request.body.username;	
	var yas = request.body.yas;
    var kilo = request.body.kilo;
    var boy = request.body.boy;

	connection.query('UPDATE Kullanıcı SET Yaş= ?, Kilo= ?, Boy= ?  WHERE KullanıcıAdı= ?',[yas,kilo,boy,username], function(error, results, fields)
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

/*
router.get('/kategori', function(request, response) {
	
	connection.query('SELECT KategoriAdı from kategori ', function(error, results, fields) {
		if (results.length > 0) {
			console.log(results);
			const responseData ={}
			var len = results.length;
			for (var i = 0; i < len; i++)
				responseData[i]=results[i].KategoriAdı;

			const jsonContent = JSON.stringify(responseData);  //string//object
			console.log(typeof(jsonContent))
			console.log(typeof(responseData))
  			response.end(jsonContent);
			
		} else {
			response.send('results boş');
		}			
		
	});
	//response.end();
});
*/

router.post('/search', function(request, response) {
	var search = request.body.search;
	var kasid =request.body.kasID;
	//var katid =request.body.kategoriID;

	//console.log(typeof(search))
	var sql="select * from hareket where hareketadı like '%"+search+"%'  and (Kas1="+kasid+" or Kas2="+kasid+" or Kas3="+kasid+")"
	console.log(sql)
	connection.query(sql, function(error, results, fields) {
		console.log(results);
		if (results.length > 0) {
			//console.log(results);
			console.log(typeof(results));
			//response.send('results dolu');
	
			const jsonContent = JSON.stringify(results);  //string//object
			console.log(typeof(jsonContent))
  			response.end(jsonContent);
			
		} else {
			response.send('bu seçeneklere uyan bir hareket yok');
		}			
		
	});
	//response.end();
});











module.exports = router;