import express, { response } from "express";
import {
  createUser,
  editUser,
  obtainUser,
  recoverAccount,
} from "../models/usersModel";

const userRouter = express.Router();

// Obtain a specific user to display their profile
userRouter.get("/profile", (req, res) => {
  obtainUser(req.query.userid)
    .then((doc) => res.send(doc))
    .catch((err) => {
      res.send(300).json({ msg: "Something went wrong", error: err });
    });
});

// Create a user after a user registers
userRouter.post("/signup", (req, res) => {
  // Create a user from passed object
  createUser(req.body)
    .then(function (test) {
      if (test === 200) {
        res.sendStatus(200);
      } else if (test === 301) {
        res.sendStatus(301);
      } else {
        res.sendStatus(300);
      }
    })
    .catch(() => res.status(300));
});

userRouter.post("/account-recovery", (req, res) => {
  recoverAccount(req.body).then(function (dbres) {
    if (dbres == 200) {
      res.sendStatus(200);
    } else if (dbres === 301) {
      res.sendStatus(301);
    } else if (dbres === 302) {
      res.sendStatus(302);
    } else if (dbres === 303) {
      res.sendStatus(303);
    } else {
      res.status(300).send(dbres);
    }
  });
});

// Edit a user from user profile page
userRouter.post("/edit-profile", (req, res) => {
  // Edit a user from passed object
  editUser(req.body)
    .then((doc) => res.send(doc))
    .catch((err) => {
      res.send(300).json({ msg: "Something went wrong", error: err });
    });
});

export default userRouter;
