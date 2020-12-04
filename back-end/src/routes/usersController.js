import express from 'express';
import { createUser, editUser } from '../models/usersModel';


const userRouter = express.Router();

// Create a user after a user registers
userRouter.post('/signup', (req, res) => {

    // Create a user from passed object
    createUser(req.body).then(doc => res.send(doc))
    .catch((err) => {
        res.send(300).json({"msg":"Something went wrong","error":err});
    })
});


// Edit a user from user profile page
userRouter.post('/profile', (req, res) => {

    // Edit a user from passed object
    editUser(req.body).then(doc => res.send(doc))
    .catch((err) => {
        res.send(300).json({"msg":"Something went wrong","error":err});
    })
});

export default userRouter;