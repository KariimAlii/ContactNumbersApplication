//! Importing NPM Packages

const express = require("express");
const cors = require('cors')
const morgan = require("morgan");
const mongoose = require("mongoose");


require("dotenv").config();
const app = express();
app.use(cors())

//! Importing Routes

const contactRouter = require("./Routes/ContactRouter");
const userRouter = require("./Routes/UserRouter");

//! Importing Middlewares

const authMW = require("./Middlewares/AuthenticationMW")


//! 1 - Logging Middleware

app.use(morgan(":method :url :response-time"));

//! 2 - Authorization Middleware

//! 3- Body Parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//! 4- Routes

//* =======================Login Route======================= *//

app.use(userRouter);

//* ================Authentication Middleware================ *//

app.use(authMW);

//* =======================Model Routes======================= *//

app.use(contactRouter);

//! 5 - Not Found Middleware

app.use((request, response, next) => {
    response.status(404).json({ message: "Not Found" });
});

//! 6 - Error Middleware

app.use((error, request, response, next) => {
    response.status(500).json({ message: `Exception Occured: ${error}` });
});

//! 7- server listening
mongoose
    // .connect("mongodb://127.0.0.1:27017/ContactApplication")
    .connect(process.env.MongoDBConnectionString)
    .then(() => {
        console.log("DB Connected ..");
        // require("./Services/seedingDatabaseUsers");
        // console.log("Data Inserted");
        const port = process.env.PORT || 8080
        app.listen(port, () => {
            console.log(`Listening on Port ${port}`);
        });
    })
    .catch((error) => console.log(`DB ERROR: ${error}`));