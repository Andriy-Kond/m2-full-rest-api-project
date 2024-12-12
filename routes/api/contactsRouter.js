import express from "express";
import contacts from "../../models/contacts.json" assert { type: "json" };

export const contactsRouter = express.Router();

contactsRouter.get("/", (req, res, next) => {
  res.json("contacts");
});

contactsRouter.get("/:id", (req, res, next) => {
  res.json("contacts");
});

contactsRouter.post("/", (req, res, next) => {
  res.json("contacts");
});

contactsRouter.put("/:id", (req, res, next) => {
  res.json("contacts");
});

contactsRouter.delete("/:id", (req, res, next) => {
  res.json("contacts");
});
