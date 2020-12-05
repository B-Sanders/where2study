import express from 'express';
import { getAllRequests, createRequest, editRequest, deleteRequest } from '../models/requestsModel';


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

    // Create a study request from passed object
    createRequest(req.body)
      .then(() => res.sendStatus(200))
      .catch((err) => {
        res.send(300).json({"msg":"Something went wrong","error":err});
      })
});


// Edit a study request, from study requests page
requestRouter.post('/edit-request', (req, res) => {
    // Create a study request from passed object
    editRequest(req.body)
        .then(res.sendStatus(200))
        .catch((err) => {
            res.send(300).json({"msg":"Something went wrong","error":err});
        })
});


// Delete a study request from locations page
requestRouter.post('/delete-request', (req, res) => {

    // Delete request identified by userId
    deleteRequest(req.body.userId)
        .then(res.sendStatus(200))
        .catch((err) => {
            res.send(300).json({"msg":"Something went wrong","error":err});
        })
});

export default requestRouter;