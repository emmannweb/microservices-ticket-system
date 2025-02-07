import express from "express";
import "express-async-errors";
import { json } from "body-parser";
//import cookieSession from 'cookie-session';
import cookieParser from "cookie-parser";
import {
  errorHandler,
  NotFoundError,
  isAuthenticated,
} from "@eftickets/common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes/index";
import { updateTicketRouter } from "./routes/update";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieParser());

app.use(isAuthenticated);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
