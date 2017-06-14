// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var exphbs = require("express-handlebars");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// for development
// Database configuration with mongoose
// mongoose.connect("mongodb://localhost/echojsdb")

// for production:
mongoose.connect('mongodb://heroku_89z4nsqp:ntu7cpskpk86q89kkkfd1a3lim@ds141108.mlab.com:41108/heroku_89z4nsqp');

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// Routes
var  apiRoutes = require("./routes/api.js")
app.use("/api", apiRoutes);
var  viewRoutes = require("./routes/view.js")
app.use("/", viewRoutes);

var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});