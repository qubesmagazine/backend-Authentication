const mongoose = require('mongoose');


const mongoDb = async () => {
    try {
     const mongoCatch = await mongoose.connect(process.env.MONGO_URL)
     console.log("Database connected", mongoCatch.connection.host)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  
  }

  module.exports = mongoDb