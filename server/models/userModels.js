const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, "Pease enter user name"] },
    email: { type: String, required: [true, "Pease enter email"], unique: true},
    password: {
      type: String,
      required: [true, "Pease enter password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
