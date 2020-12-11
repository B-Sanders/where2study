import express from 'express';
import { getAllRequests, createRequest, editRequest, deleteRequest, addPartner, leaveRequest } from '../models/requestsModel';


const requestRouter = express.Router();

// GET to obtain all study requests
requestRouter.get('/all-requests', (req, res) => {
    getAllRequests().then(doc => res.send(doc))
    .catch((err) => {
        res.send(300).json({"msg":"Something went wrong","error":err});
    })
});


// Create a study request from locations page
requestRouter.post('/create-request', (req, res) => {
    //console.log( req.body )
    // Create a study request from passed object
    createRequest(req.body)
      .then(() => res.sendStatus(200))
      .catch((err) => {
        res.send(300).json({"msg":"Something went wrong","error":err});
      })
});


// Edit a study request, from study requests page
requestRouter.post('/edit-request', (req, res) => {
   console.log(req.body) 
    // Create a study request from passed object
    editRequest(req.body)
        .then(() => res.sendStatus(200))
        .catch((err) => {
            res.send(300).json({"msg":"Something went wrong","error":err});
        })
});


// Add a study partner to the request when a user accepts
requestRouter.post('/add-partner', (req, res) => {
    
    // Create a study request from passed object
    addPartner(req.body)
        .then(() => res.sendStatus(200))
        .catch((err) => {
            res.send(300).json({"msg":"Something went wrong","error":err});
        })
});


// Delete a study request from locations page
requestRouter.post('/delete-request', (req, res) => {
    
    // Delete request identified by userId
    deleteRequest(req.body)
        .then(() => res.sendStatus(200))
        .catch((err) => {
            res.send(300).json({"msg":"Something went wrong","error":err});
        })
});

requestRouter.post('/leave-request', (req, res) => {
    
    // Leave the request identified by userId and posterID
    leaveRequest(req.body)
        .then(() => res.sendStatus(200))
        .catch((err) => {
            res.send(300).json({"msg":"Something went wrong","error":err});
        })
});

export default requestRouter;