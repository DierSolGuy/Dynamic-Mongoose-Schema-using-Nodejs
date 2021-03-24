const express = require('express');
const mongoose = require("mongoose");
const EnquiryModel = require('../models/EnquiryModel');


const router = express.Router();

// Begin of /enquiry - POST
router.post("/enquiry", (req, res, next) => {
    console.log(req.body)

    const enquiry = new EnquiryModel(req.body);
    // const enquiry = new EnquiryModel({

    //     _id: mongoose.Types.ObjectId(),
    //     name: req.body.name,
        
        
    //    })

    // Saving the data to the database
    enquiry.save()
        .then( result => {
            console.log('Result', result)
            res.status(200).json({
                message: "Insertion Successful to database",
                Status: 200,
                result: result
            }) 
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });  
});
// End of /enquiry - POST

// Begin of /get-all-enquiry-report
router.get('/get-all-enquiry-report', (req, res) => {
    
    
    EnquiryModel.find()
        .then( result => res.status(200).json({
            message: "All Enquiry Fetched Successfully from Database",
            result: result
        }))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
});
// End of /get-all-enquiry-report

module.exports = router