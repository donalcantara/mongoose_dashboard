// Require the Express Module
var express = require("express");
// Create an Express App
var app = express();
var mongoose = require('mongoose');
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose');
// Require body-parser (to receive post data from clients)
var bodyParser = require("body-parser");
// Integrate body-parser with our App
app.use(bodyParser.urlencoded());
// Require path
var path = require("path");
// Setting our Static Folder Directory
app.use(express.static(__dirname + "./static"));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request

//var Schema = mongoose.Schema;

var DashboardSchema = new mongoose.Schema({
 name: String,
 species: String
})
mongoose.model('Dashboard', DashboardSchema); // We are setting this Schema in our Models as 'User'
var Dashboard = mongoose.model('Dashboard') // We are retrieving this Schema from our Models, named 'User'


app.get('/', function(req, res) {
	Dashboard.find({}, function(err, animals) {
	
		console.log(animals);

	    res.render('index', {animals: animals});

	})
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
})

// Add User Request 
app.post('/add', function(req, res) {
  console.log("POST DATA", req.body);
  // create a new User with the name and age corresponding to those from req.body
  var dashboard = new Dashboard({name: req.body.name, species: req.body.species});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  dashboard.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a new animal!');
      res.redirect('/');
    }
  })
})

app.get('/delete/:id', function(req, res) {
  Dashboard.remove({_id: req.params.id}, function (err, whatever){
    res.redirect('/');
  })
})

app.get('/editpage/:id', function (req, res){
  Dashboard.findOne({_id: req.params.id}, function (err, animal){
      console.log(animal);
      res.render('edit', {animal: animal});
  })
})

app.post('/edit/:id', function (req, res){
    Dashboard.update({_id: req.params.id}, {name: req.body.name, species: req.body.species}, function (err, user){
        res.redirect('/');
    })
  })

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})





















