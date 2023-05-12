const express = require("express");
const router = express.Router();
const contactController = require("../Controllers/ContactController");

router
    .route("/api/contacts")
    .get(contactController.getAllContacts)
    .post(contactController.createContact);
router
    .route("/api/contacts/:id")
    .get(contactController.getContactById)
    .put(contactController.updateContact)
    .delete(contactController.deleteContact);

module.exports = router;
