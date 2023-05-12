const User = require("../Models/UserSchema")
module.exports = () => {
    User.insertMany([
        {
            username:"user1",
            password:"user1"
        },
        {
            username:"user2",
            password:"user2"
        }
    ])
}