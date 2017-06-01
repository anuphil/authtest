var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('./models/User.js');
var jwt = require('./servicesnode/jwt.js');

var app = express();

var port = 3000;

app.set('views', path.join(__dirname, 'jade'));
app.set('view engine', 'jade');

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});


var sourceType = "empty";

app.get('/receiveMWAPIData', function(req, res){
	//if (!req.headers.authorization) {
	//	return res.status(401).send({message: 'You are not authorized'});
	//}
	//res.json();
	var st = req.query.source_information_type;
	var url = req.query.document_url;
	var id = req.query.document_id;
	var author = req.query.document_author;
	console.log(st);
	console.log(url);
	console.log(id);
	console.log(author);
	//console.log(res.json(sourceType));
	console.log(req.body);
});


mongoose.connect('mongodb://localhost/authtest');


var myBooks = ['abab', 'cdcd'];

app.get('/books', function(req, res){
	if (!req.headers.authorization) {
		return res.status(401).send({message: 'You are not authorized'});
	}
	res.json(myBooks);
});


app.post('/register', function(req, res) {
	var user = req.body;
	
	//var newUser = new User({
	var newUser = new User.model({
		name: user.name,
		email: user.email,
		password: user.password
	});

	//now instead of sending back our json user, we are going to send
	//payload via jwt
	//createSendToken(newUser, res);
	
	newUser.save(function(err){
		//res.status(200).json(newUser); //using the custom method that will not show the password
		//res.status(200).send(newUser.toJSON());
		createSendToken(newUser, res);
	})
	//res.send('hi');

});

app.post('/login', function(req, res) {
	req.user = req.body;

	var searchUser = {email: req.user.email};

	User.findOne(searchUser, function(err, user) {
		if(err) throw err;

		if(!user) {
			return res.status(401).send({message: 'Wrong email'});
		}

		user.comparePasswords(req.user.password, function(err, isMatch) {
			if (err) throw err;
			if (!isMatch) {
				return res.status(401).send({message: 'Wrong password'});		
			}
			createSendToken(user, res);
		});
	});


});

function createSendToken(user, res) {
	var payload = {
		sub: user._id
	};

	var token = jwt.encode(payload, 'shhh...');
	console.log('inside server js token:');
	console.log(token);

	res.status(200).send({
			user: user.toJSON(),
			token: token
		});
}

//this needs to be below the other gets
//otherwise they will not be called!! Spent a whole 2 hours to figure 
//out why my other gets were not being called!
app.get('*', function(req, res){
	res.render('index');
});


app.listen(port, function(){
	console.log('Listening on port: ' + port);
});