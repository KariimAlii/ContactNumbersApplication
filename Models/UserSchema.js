const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const passwordRegex = /^(?=.*\d)(?=.*[0-9])(?=.*[a-z]).{4,8}$/;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 10,
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {return passwordRegex.test(v);},
            message: props => `${props.value} is not a valid password. Passwords must contain at least one digit, one lowercase letter,  be at least 4 characters long and donot exceed 8 characters long.`
        }
    },
});

// Hash password before saving to database
userSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

// // Compare password to hashed password in database
// userSchema.methods.comparePassword = async function (enteredPassword) {
//     try {
//         return await bcrypt.compare(enteredPassword, this.password);
//     } catch (err) {
//         throw new Error(err);
//     }
// };


module.exports = mongoose.model("User", userSchema);
