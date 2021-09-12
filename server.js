// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 3000;

const server = app.listen(port, listening);

function listening(){ 
    console.log(`server is running on localhost: ${port}`)
};

// Add a GET route that returns the projectData

app.get('/getRoute', function (request, response) {
  response.send(projectData);
  console.log('Get request successful');
});

// POST route

app.post('/postRoute', postData);

function postData (req, res) {
    projectData=req.body;
    console.log('Post request successful');
    return res.send(projectData);
    
}
