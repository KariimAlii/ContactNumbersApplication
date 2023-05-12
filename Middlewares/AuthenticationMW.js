const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.decodedToken = decodedToken;
        console.log(decodedToken)
        next();
    } catch (error) {
        res.status(401).json({ message: "Not Authenticated!" });
    }
};
