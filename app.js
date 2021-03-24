require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const EnquiryRoutes = require('./api/routes/Enquiry');

// Express App
const app = express(); // invoking the express() to create an instance of an express app.


// Connnecting the database - MongoDB Atlas Cloud Database
//const dbURI = 'mongodb+srv://sourish:test1234@nodeserver.ol9cy.mongodb.net/Bright_Services?retryWrites=true&w=majority';

const dbURI = 'mongodb://localhost/enquiry';
mongoose.Promise = global.Promise
// mongoose.connect("mongodb://localhost/brightservices")


// Mongoose will be used to connect and interact with the database.
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }) // {useNewUrlParser: true, useUnifiedTopology: true} --> This parameter will stop the Deprecation Warning
    .then( (result) => {
        console.log('Connected to Database');
        // Listen for requests (We are listening to the request only if the database is connected)
        app.listen(`${process.env.PORT}`); // we can store this in a constants if we want to reuse the server for web socket.
    })
    .catch( err => console.log('Error:', err));

app.use(morgan('dev'));
//app.use('/ServiceImage', express.static(__dirname+'./public/'));


app.use((req, res, next ) => {
    res.header("Access-Control-Allow-Origin","*") // we can put a specific webpage or website instead of * to allow access to apis
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization") // we can also give * as the second parameter string
    if(req.method === "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods","PUT, POST, GET, PATCH, DELETE")
        return res.status(200).json({})
    }
    next() // if we dont put next here, this will block any incoming request and expecting to get OPTIONS here
})

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // This middleware is used for accepting form data from POST request 
//app.use('/static', express.static('public')); // Accessing the public folder for images.
app.use('/',EnquiryRoutes);

// Custom Error Handling
app.use((req, res, next) => {
    const error = new Error("Route not found")
    error.status = 404 
    next(error) // passes the error object to next default error handling middleware
})
    
// Default Error Handling which will catch every error
    
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error:{
            msg:"Hello Error",
            message: error.message
         }
    })
})
    
module.exports = app;