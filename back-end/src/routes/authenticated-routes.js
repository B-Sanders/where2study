import express from 'express';
import admin from 'firebase-admin';
import db from '../database/base';

const authenticatedRoute = express.Router();

authenticatedRoute.get('/all-locations', (req, res) => {
    try {
    const database = db.database().ref('Locations');
    database.on('value', dataSnapshot => {
        res.send(dataSnapshot);
    });
    } catch (err) {
    res.send(300).json({"msg":"Something went wrong","error":err});
    }
});

export default authenticatedRoute;


