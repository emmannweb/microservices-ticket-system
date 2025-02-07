import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  res.clearCookie("token");
  res.send({});
});

export { router as signoutRouter };
