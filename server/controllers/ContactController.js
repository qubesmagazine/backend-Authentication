const asyncHandler = require("express-async-handler");
const contacts = require("../models/ContactModels");

//@description Get all contacts
//@route GET /api/contacts
//@access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await contacts.find({user_id: req.user.id});
  res.status(200).json(contact);
});

//@description CREATE contacts
//@route POST /api/contacts
//@access private

const CreateContact = asyncHandler(async (req, res) => {
  console.log("pass the", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields mandatory");
  }
  const contact = await contacts.create({
    name,
    email,
    phone,
    user_id: req.user.id
  });
  res.status(201).json(contact)
});

//@description Get contact
//@route GET /api/contacts/:id
//@access private

const getContacts = asyncHandler(async (req, res) => {
const contact = await contacts.findById(req.params.id);
if (!contact) {
    res.status(404)
    throw new Error("Contact not found");
}
  res.status(200).json(contact);
});

//@description Update contact
//@route GET /api/contacts/:id
//@access private

const UpdateContact = asyncHandler(async (req, res) => {
  const contact = await contacts.findById(req.params.id);
  if (!contact) {
    res.status(404)
    throw new Error("contact not found")
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to update  other user contact")
  }

  const updateContact = await contacts.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true}
  );

  res.status(200).json(updateContact);
});

//@description delete contact
//@route GET /api/contacts/:id
//@access private

const DeleteContact = asyncHandler(async (req, res) => {
  const contact = await contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to update  other user contact")
  }

  await contacts.deleteOne({_id: req.params.id}); // Use remove() on the specific contact
  res.status(200).json({ message: "Contact removed successfully" });
});


module.exports = {
  getContact,
  CreateContact,
  getContacts,
  UpdateContact,
  DeleteContact,
};
