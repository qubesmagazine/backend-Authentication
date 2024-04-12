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


