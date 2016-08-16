// Require the Express Module
var express = require("express");
// Create an Express App
var app = express();
var mongoose = require('mongoose');
// "basic_mongoose" is the name of our db in mongodb
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
// Setting the View Engine set to EJS
app.set('view engine', 'ejs');

var DashboardSchema = new mongoose.Schema({
 name: String,
 species: String
})
mongoose.model('Dashboard', DashboardSchema);
var Dashboard = mongoose.model('Dashboard')


app.get('/', function(req, res) {
	Dashboard.find({}, function(err, animals) {
	//animals is the object you retrieved from the database
		console.log(animals);

	    res.render('index', {animals: animals});
      //you're rendering the index page and getting the object animals from the database to show on the index

	})
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
//the route to delete 
app.get('/delete/:id', function(req, res) {
  //below, 'remove' is deleting what you want deleted
  Dashboard.remove({_id: req.params.id}, function (err, whatever){
    //you're removing by ID that you give it and then it'll give you back an error if it encounters one.
    res.redirect('/');
    //redirect to root route
  })
})
//send to edit page
app.get('/editpage/:id', function (req, res){
  //findOne is to just find the one item that you want to edit/update
  Dashboard.findOne({_id: req.params.id}, function (err, animal){
      console.log(animal);
      res.render('edit', {animal: animal});
      //you're rendering the edit page and the object you retrieved from the database is called animal
  })
})
//from the edit page to update the item in the database.  first, request and then the response.
app.post('/edit/:id', function (req, res){
  //below, dashboard is the collection, update is the task, _id is finding the item by it's ID and then setting the name and species by the req.body.name and req.body.species.  after all that, redirect to the root and it'll show.
    Dashboard.update({_id: req.params.id}, {name: req.body.name, species: req.body.species}, function (err, user){
        res.redirect('/');
    })
  })

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})





















