var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var router = express.Router();
var multer = require('multer');
var nodemailer = require("nodemailer");

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "",
        pass: ""
    }
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
mongoose.connect('mongodb://localhost/interconnect');

app.use(express.static('../client'));
app.use(bodyParser.json());

var storage = multer.diskStorage({ 
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname);
    }
});

var upload = multer({ 
    storage: storage
}).single('file');



var userSchema = new mongoose.Schema({
    
        email: String,
        password: String,
		name: String,
		size: String,
		admin: false,
		files: []
    
}, {
    collection: 'mycollection'
});
var Team = mongoose.model('Team', userSchema);

app.post('/login', function(req, res) {
    Team.find({
        'email': req.body.email,
        'password': req.body.password,
		'admin' : req.body.admin
    }, function(err, teams) {
        if (err) {
            onErr(err);
        } else {

            if (teams.length == 0) {
                res.status(500).json({
                    err: err
                });
            } else {
                return res.status(200).json(teams);
            }
        }
    });
});


app.post('/signup', function(req, res){ 
	Team.create({
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
		admin: req.body.admin
	}, function(err, teams) {
		if(err) {
			nErr(err);
		} else {
			console.log(req.body.admin);
			return res.status(200).json(teams);
		}
	});
});

app.post('/upload', function(req, res) {

	upload(req, res, function(err) {
		
			Team.findOne({_id:'590f9df24f458c340b312f4f'}, function(err, team){
		if(err) {
			console.log(err)
			res.status(500).send();
		} else {
			console.log(req.file)
			team.files.push(req.file.filename);
		}
		team.save(function(err, updatedobject){
			if(err){
				console.log(err);
			}
		});
	});
        console.log(req.file);
        if (err) {
            res.json({
                error_code: 1,
                err_desc: err
            });
            return;
        }
        res.json({
            error_code: 0,
            err_desc: null
        });
    });
});


app.get('/email', function(req, res) {
    var mailOptions = {
        to: "saiakash5@gmail.com",
        subject: "tets",
        text: "hello"
    }
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});

app.get('/download', function(req, res) {
	res.set('Content-Disposition', 'attachment');
	res.setHeader('Content-Type', 'application/vnd.ms-excel');
      res.setHeader('Content-Disposition', 'attachment; filename=people-export.xlsx');
    var file = './uploads/Grades.xlsx';
    return res.download(file); 
});

mongoose.connection.once('open', function() {


    app.models = require('./models/index');

    var routes = require('./routes');
    _.each(routes, function(controller, route) {
        app.use(route, controller(app, route));
    });
    console.log('connection established in port3000');
    app.listen(3000);
});