const Contact = require("../Models/ContactSchema");
const ContactService = require("../Services/ContactService");
//! GET all contacts
module.exports.getAllContacts = async (req, res , next) => {
    try {
        const contacts = await ContactService.getAllContacts();
        res.status(200).json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while retrieving contacts");
    }
};

//! GET a single contact by ID
module.exports.getContactById = async (req, res , next) => {
    try {
        const contactId = req.params.id;
        const contact = await ContactService.getContactById(contactId);
        if (!contact) {
            res.status(404).send("Contact not found");
        } else {
            res.status(200).json(contact);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while retrieving the contact");
    }
};

//! CREATE a new contact
module.exports.createContact = async (req, res , next) => {
    try {
        const newContact = await ContactService.createContact(req.body);
        res.status(201).json(newContact);
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while creating the contact");
    }
};

//! UPDATE a contact by ID
module.exports.updateContact = async (req, res , next) => {
    try {
        let { id } = req.params;
        const data = await ContactService.updateContact(id,req.body);
        if (!data) {
            res.status(404).send("Contact not found");
        } else {
            res.status(201).json({ message:`User Updated Successfully` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while updating the contact");
    }
};

//! DELETE a contact by ID
module.exports.deleteContact = async (req, res , next) => {
    try {
        let { id } = req.params;
        const data = await ContactService.deleteContact(id);
        if (!data) {
            res.status(404).send("Contact not found");
        } else {
            res.status(201).json({ message:`User deleted successfully` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while deleting the contact");
    }
};
