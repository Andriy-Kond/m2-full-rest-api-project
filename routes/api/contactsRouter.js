import express from "express";
import { contactsHandler } from "../../models/contactsHandler.js";

export const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  const contacts = await contactsHandler.getContacts();

  res.json(contacts);
});

contactsRouter.get("/:id", async (req, res, next) => {
  const contact = await contactsHandler.getContactById(req.params.id);

  res.json(contact);
});

contactsRouter.post("/", async (req, res, next) => {
  const newContact = await contactsHandler.addContact(req.body);

  res.json(newContact);
});

contactsRouter.put("/:id", async (req, res, next) => {
  const editedContact = await contactsHandler.editContact(req.body);

  res.json(editedContact);
});

contactsRouter.delete("/:id", async (req, res, next) => {
  const removedContact = await contactsHandler.removeContact(req.params.id);

  res.json(removedContact);
});
