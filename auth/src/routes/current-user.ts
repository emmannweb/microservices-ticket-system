import express from "express";
import { isAuthenticated } from "@eftickets/common";

const router = express.Router();

router.get("/api/users/currentuser", isAuthenticated, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
