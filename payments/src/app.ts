import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import {
  errorHandler,
  NotFoundError,
  isAuthenticated,
} from "@eftickets/common";
import { createChargeRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieParser());

app.use(isAuthenticated);
app.use(createChargeRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
