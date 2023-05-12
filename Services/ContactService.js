const Contact = require("../Models/ContactSchema")
module.exports.getAllContacts = async () => {
    const contacts = await Contact.find({});
    return contacts;
};
module.exports.getContactById = async (contactId) => {
    const contact = await Contact.findById(contactId);
    return contact;
};
module.exports.createContact = async (requestBody) => {
    const { name, phone, address, notes } = requestBody;
    const newContact = new Contact({
        name,
        phone,
        address,
        notes,
    });
    const contact = await newContact.save();
    return contact;
};
module.exports.updateContact = async (id,requestBody) => {
    const { name, phone, address, notes } = requestBody;
    const data = await Contact.findByIdAndUpdate(
        id,
        {
            name,
            phone,
            address,
            notes,
        },
        { new: true }
    );
    return data;
};
module.exports.deleteContact = async (id) => {
    const data = await Contact.findByIdAndDelete(id);
    return data;
};
