const bcrypt = require("bcrypt");
modu.exports.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    return hash;
}


modu.exports.comparePassword = async function (password,hash) {
    const result = await bcrypt.compare(password,hash);
    return result;
};