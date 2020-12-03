import express from 'express';
import { getAllLocations } from '../models/locationsModel';


const locationRouter = express.Router();

// GET to obtain all locations from the locations page
locationRouter.get('/all-locations', (req, res) => {
    getAllLocations().then(doc => res.send(doc))
    .catch((err) => {
        res.send(300).json({"msg":"Something went wrong","error":err});
    })
});

export default locationRouter;