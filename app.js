import express from "express";
import logger from "morgan"; // HTTP request logger middleware for node.js
import cors from "cors"; // Enable CORS: allows cross-requests from different addresses.
import { contactsRouter } from "./routes/api/contactsRouter.js";
// import { HttpError } from "./utils/HttpError.js";
import Joi from "joi"; // check request body: schema description language and data validator

export const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // Checks if exist body in each request. If exist, it checks type by header "Content-Type". If Content-Type === "application/json, this middleware convert it from string to object (by JSON.parse())

app.use("/api/contacts", contactsRouter);

app.use("/", (req, res, next) => {
  res.status(404).json({ message: "Not found route" });
});

app.use((err, req, res, next) => {
  //$ opt1
  // res.status(500).json({ message: err.message });

  //$ opt2
  const { status = 500, message = "Server error" } = err;
  return res.status(status).json({ message });
});
