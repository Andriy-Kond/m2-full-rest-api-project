import contacts from "./contacts.json" assert { type: "json" };
import fs from "fs/promises";

// __dirname starting with Node.js 20.11/21.2:
const __dirname = import.meta.dirname;
const __filename = fs.join(__dirname, "contacts.json");

const getContacts = () => {
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
};

const getContactById = id => {
  const contacts = getContacts();
  const contact = contacts.find(contact => contact.id === id);
  return contact;
};

const addContact = newContact => {
  const contacts = getContacts();
  contacts.push(newContact);
  const updatedContacts = JSON.stringify(contacts);
  fs.writeFile(__filename, updatedContacts);
};

const editContact = newContact => {
  const contacts = getContacts();
  const { searchingContact, updatedContacts } = contacts.reduce(
    (acc, contact) => {
      if (contact.id === newContact.id) {
        acc.searchingContact = contact;
      } else {
        acc.updatedContacts.push.contact;
      }
    },
    { searchingContact: null, updatedContacts: [] },
  );

  fs.writeFile(__filename, updatedContacts);

  return searchingContact;
};

const removeContact = id => {
  const contacts = getContacts();
  const updatedContacts = contacts.filter(contact => contact.id !== id);
  fs.writeFile(__filename, updatedContacts);
};

export const contactsHandler = {
  getContacts,
  getContactById,
  addContact,
  editContact,
  removeContact,
};
