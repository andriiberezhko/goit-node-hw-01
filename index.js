const { Command } = require("commander");
const contacts = require("./contacts.js");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const getContactById = await contacts.getContactById(id);
      console.log(getContactById);
      break;

    case "add":
      const addContact = await contacts.addContact({ name, email, phone });
      console.log(addContact);

      break;

    case "remove":
      const removeContactById = await contacts.removeContact(id);
      console.log(removeContactById);
      // ... id
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "2" });
// invokeAction({
//   action: "add",
//   name: "Peter",
//   email: "peter@mail.com",
//   phone: "(050)505 50 50",
// });
// invokeAction({ action: "remove", id: "2" });
invokeAction(argv);
