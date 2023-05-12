const User = require("../Models/UserSchema")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
module.exports.login = async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Authentication failed!" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Authentication failed!" });
        }
        const token = jwt.sign(
            { userId: user._id,userName:user.username },
            process.env.JWT_SECRET,
            {expiresIn: "1h"});
        res.status(200).json({ token ,username:user.username, expiresIn: 3600 });
    } catch (error) {
        next(error);
    }
};
module.exports.signup = async function (req, res, next) {
    const {username,password} = req.body;
    const user = new User({
        username,
        password
    });
    user.save();
    res.status(200).json({ message:"sucessfully added" });
}
