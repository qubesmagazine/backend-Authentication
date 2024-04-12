const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    user_id: {
       type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "User"

    },
    name: { type: String, required: [true, "Pease add the contact name"] },
    email: { type: String, required: [true, "Pease add the contact name"] },
    phone: {
      type: String,
      required: [true, "Pease add the contact name"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
