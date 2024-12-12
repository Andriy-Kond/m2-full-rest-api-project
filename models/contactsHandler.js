import path from "path";
import fs from "fs/promises";

// __dirname starting with Node.js 20.11/21.2:
const __dirname = import.meta.dirname;
const __filename = path.join(__dirname, "contacts.json");

const getContacts = async () => {
  const fileBuffer = await fs.readFile(__filename);
  const fileParsed = JSON.parse(fileBuffer);

  return fileParsed || null;
};

const getContactById = async id => {
  const contacts = await getContacts();
  const contact = contacts.find(contact => contact.id === id);

  return contact || null;
};

const addContact = async newContact => {
  const contacts = await getContacts();
  contacts.push(newContact);
  const updatedContacts = JSON.stringify(contacts, null, 2);
  fs.writeFile(__filename, updatedContacts);

  return newContact || null;
};

const editContact = async newContact => {
  const contacts = await getContacts();

  const idx = contacts.findIndex(contact => contact.id === newContact.id);
  contacts[idx] = newContact;

  const updatedContactsString = JSON.stringify(contacts, null, 2);
  fs.writeFile(__filename, updatedContactsString);

  return newContact || null;
};

// less speed option:
const editContactByReduceNotModifyArr = async newContact => {
  const contacts = getContacts();

  const { wantedContact, updatedContacts } = contacts.reduce(
    (acc, contact) => {
      if (contact.id === newContact.id) {
        acc.wantedContact = contact;
      } else {
        acc.updatedContacts.push(contact);
      }
      return acc;
    },
    { wantedContact: null, updatedContacts: [] },
  );

  const updatedContactsString = JSON.stringify(updatedContacts, null, 2);
  fs.writeFile(__filename, updatedContactsString);

  return wantedContact || null;
};

const removeContact = async id => {
  const contacts = await getContacts();
  const { removedContact, updatedContacts } = contacts.reduce(
    (acc, contact) => {
      if (contact.id === id) acc.removedContact = contact;
      else acc.updatedContacts.push(contact);
      return acc;
    },
    { removedContact: null, updatedContacts: [] },
  );

  const updatedContactsString = JSON.stringify(updatedContacts, null, 2);
  fs.writeFile(__filename, updatedContactsString);

  return removedContact;
};

export const contactsHandler = {
  getContacts,
  getContactById,
  addContact,
  editContact,
  removeContact,
};