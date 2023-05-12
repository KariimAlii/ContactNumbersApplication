const mongoose = require("mongoose");

//* 1- Defining Schema

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: {
        type: String,
        required: [true, 'Contact phone number is required'],
        validate: {
            validator: function (v) {
                return /^[0-9]{11}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
    address: {
        type: String,
        required: [true, 'Contact Address is required'],
        minLength:3
    },
    notes: {
        type: String,
        required: false,
    },
});

//* 2- Mapping (Setter)

module.exports = mongoose.model("Contact", contactSchema);
