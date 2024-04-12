In today's fast-paced world of web development, building a robust backend infrastructure is essential for creating secure and scalable applications. MongoDB, Express, and Node.js (MEN stack) provide a powerful foundation for backend development, and when combined with full authentication capabilities, the possibilities are endless.

In this article, we'll explore how to create a secure backend with full authentication using JWT (JSON Web Token), bcrypt password hashing, and error handling using async/await, and best of all, you can access the complete code on GitHub for further exploration and integration into your projects.

Setting up the Environment

Before we delve into the details of authentication and authorization, let's set up our development environment. MongoDB will serve as our database, Express will handle server-side logic, and Node.js will provide the runtime environment.

bash

npm install express mongoose bcrypt jsonwebtoken express-async-handler

Implementing Full Authentication

User Model and Authentication Routes

Firstly, we'll define our user model schema to securely store user credentials:

Javascript

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(

{username: { type: String, required: [true, "Pease enter user name"] },

    email: { type: String, required: [true, "Pease enter email"], unique: true},

    password: {

      type: String,

      required: [true, "Pease enter password"],

    }, },

{timestamps: true,});

module.exports = mongoose.model("User", userSchema);

Next, let's create routes for user registration, login, and retrieving the current user:

Javascript

const express = require('express');

const dotenv = require('dotenv').config()

const ErrorHandler = require("./middleware/ErrorHandler")

const contactRouter = require("../server/routes/contactRouter");

const userRouter= require("../server/routes/userRoutes");

const mongoDb = require('./Database/connectDb');

const app = express();

const port = process.env.PORT || 5000

mongoDb()

app.use(express.json())

app.use("/api/contact", contactRouter)

app.use("/api/user", userRouter)

app.use(ErrorHandler)

app.listen(port, () => {

    console.log('listening on port:' + port)

})

Secure Access with JWT

JWT tokens are issued upon successful login and are used to authenticate users in subsequent requests. Middleware can be implemented to verify JWT tokens and protect routes accessible only to authenticated users.

Javascript

const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {

let token;

let authHeader = req.headers.Authorization || req.headers.authorization;

if (authHeader && authHeader.startsWith("Bearer")) {

    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {

      if (err) {

        res.status(401);

        throw new error("User is not authorized");

      }



      req.user = decoded.user;

      next();

    });

    if (!token) {

      res.status(401);

      throw new error("User is not authorized or token availabble");

    }

}

});

module.exports = validateToken;

Conclusion

By leveraging MongoDB, Express, and Node.js, along with JWT authentication, bcrypt password hashing, and robust error handling, we've created a secure and versatile backend capable of powering a wide range of applications. The complete code for this backend is available on GitHub, allowing developers to explore, integrate, and customize it according to their project requirements.

You can access the full source code for this backend on GitHub:

Feel free to fork, clone, or contribute to the repository. Happy coding!

By providing the code on GitHub, developers can easily access, review, and utilize the backend implementation in their own projects, accelerating the development process and ensuring a solid foundation for their applications.
