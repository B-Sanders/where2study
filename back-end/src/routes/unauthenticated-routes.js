import express from "express";

const unauthenticatedRoute = express.Router();

unauthenticatedRoute.get("/", (req, res) => {
  res.status(200).json({ healthCheck: "PASS" });
});

export default unauthenticatedRoute;
