import express from 'express';
import db from '../database/base';

const authenticatedRoute = express.Router();

// Need to determine the URL for combined filtering (class AND location)
// Also have front end filtering? Try to minimize back-end calls if possible...
// Implement "child_added" AND "child_changed" etc... for calls made when SR is added (prob just added to current paths?)
// Lowered priority of "end time"
// FB user calls in the front-end are taken care of? Do we need to do anything back here??? (check DB schema)
// questioning the usage of "Profiles" in DB schema, possibly merge with "Users"
// May need to implement opCode (in req.body) for our "res.send" since we cannot do multiple at once 


// GET: obtain all locations for the locations page
//      NOTE: user can make changes to their SR at locations page
authenticatedRoute.get('/all-locations', (req, res) => {
    try {
        const locations = db.database().ref('Locations');

        // Return snapshot of the current requests in "Locations" collection
        locations.on('child_added', dataSnapshot => {
            res.send(dataSnapshot);
        });

    } catch (err) {
        res.send(300).json({"msg":"Something went wrong","error":err});
    }
});


// GET: obtain all Study Requests
authenticatedRoute.get('/study-requests', (req, res) => {
    try {
        const requests = db.database().ref('RequestsList');

        // Return snapshot of the current requests in "Requests" collection when request is added
        requests.on('child_added', dataSnapshot => {

            // Pull info from the req.body to create a new request in FB
            
             res.send(dataSnapshot);
        });

        // Return snapshot of the current requests in "Requests" collection when request is added
        requests.on('child_changed', dataSnapshot => {

            // Pull info from the req.body to ediy a request in FB (finding SR, storing new vals)
            
             res.send(dataSnapshot);
        });

        // Return snapshot of the current requests in "Requests" collection when request is added
        requests.on('child_removed', dataSnapshot => {

            // Pull info from the req.body to ediy a request in FB (finding SR, storing new vals)
            
             res.send(dataSnapshot);
        });

    } catch (err) {
        res.send(300).json({"msg":"Something went wrong","error":err});
    }
});

// GET: obtain a specific location filtered by location name (what will path be?)
authenticatedRoute.get('/studyRequests/location=:location', (req, res) => {
    try {
        var requests = db.database().ref('RequestsList');
    
        // Order by location, return query
        requests.orderByChild('location').equalTo(req.params.location).on('value', dataSnapshot => {
            res.send(dataSnapshot);
        });  

    } catch (err) {
    res.send(300).json({"msg":"Something went wrong","error":err});
    }
});

// GET: obtain a specific location filtered by noise rating
authenticatedRoute.get('/studyRequests/noise=:noiseRating', (req, res) => {
    try {
        var requests = db.database().ref('RequestsList');
        var rating = parseInt(req.params.noiseRating);
    
        // Order by noise rating, return query
        requests.orderByChild('noiseRating').equalTo(rating).on('value', dataSnapshot => {
            res.send(dataSnapshot);
        }); 

    } catch (err) {
    res.send(300).json({"msg":"Something went wrong","error":err});
    }
});

// GET: obtain a specific location filtered by class
authenticatedRoute.get('/studyRequests/class=:className', (req, res) => {
    try {
        var requests = db.database().ref('RequestsList');
    
        // Order by class, return query
        requests.orderByChild('class').equalTo(req.params.className).on('value', dataSnapshot => {
            res.send(dataSnapshot);
        });

    } catch (err) {
    res.send(300).json({"msg":"Something went wrong","error":err});
    }
});

// GET: obtain a specific user's account information (EAMON)
authenticatedRoute.get('/accountPage/', (req, res) => {
    try {
        var users = db.database().ref('Users');
        const userID = "testUser1";
    
        // Obtain specific user via userID provided in req
        users.orderByChild('USERID').equalTo(userID).on('value', dataSnapshot => {
            res.send(dataSnapshot);
        });  
    

        // CANNOT "res.send" TWICE, maybe add opCode with if's ???
        // // Update info of  specific user via userID when info is changed
        // users.orderByChild('USERID').equalTo(req.body.USERID).on('child_changed', dataSnapshot => {

        //     // Make changes to the specific user in FB

        //     res.send(dataSnapshot);
        // });  

    } catch (err) {
    res.send(300).json({"msg":"Something went wrong","error":err});
    }
});

export default authenticatedRoute;


