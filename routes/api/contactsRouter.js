import express from "express";
import { contactsHandler } from "../../models/contactsHandler.js";
import { HttpError } from "../../utils/HttpError.js";

export const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsHandler.getContacts();

    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:id", async (req, res, next) => {
  try {
    const contact = await contactsHandler.getContactById(req.params.id);
    if (!contact) {
      //$ op1
      // return res.status(404).json({ message: "Not found" });
      //$ opt2
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;
      //$ opt3
      throw HttpError({ status: 404, message: "Not found" });
    }

    res.json(contact);
  } catch (error) {
    //$ opt1
    // return res.status(500).json({ message: "Server error" });
    //$ opt2
    // const { status = 500, message = "Server error" } = error;
    // return res.status(status).json({ message });
    //$ opt3
    next(error); // will looking for handler (app.use() in app.js) that have 4 arguments (first - will be the error)
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    const newContact = await contactsHandler.addContact(req.body);
    res.status(201).json(newContact); // successfully add new entry
  } catch (error) {
    next(error);
  }
});

contactsRouter.put("/:id", async (req, res, next) => {
  try {
    const editedContact = await contactsHandler.editContact(req.body);
    res.json(editedContact);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:id", async (req, res, next) => {
  try {
    const removedContact = await contactsHandler.removeContact(req.params.id);
    res.json(removedContact);
  } catch (error) {
    next(error);
  }
});
