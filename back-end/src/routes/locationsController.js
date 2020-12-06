import express from 'express';
import { getAllLocations, getLocationRequests } from '../models/locationsModel';


const locationRouter = express.Router();

// GET to obtain all locations from the locations page
locationRouter.get('/all-locations', (req, res) => {
    getAllLocations().then(doc => res.send(doc))
    .catch((err) => {
        res.send(300).json({"msg":"Something went wrong","error":err});
    })
});


// GET to obtain all active requests in the location
locationRouter.get('/location-requests', (req, res) => {
    getLocationRequests(req.headers).then(doc => res.send(doc))
    .catch((err) => {
        res.send(300).json({"msg":"Something went wrong","error":err});
    })
});

export default locationRouter;