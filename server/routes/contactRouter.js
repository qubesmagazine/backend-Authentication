const express = require('express');
const router = express.Router()
const { getContact, CreateContact, getContacts, UpdateContact, DeleteContact } = require('../controllers/ContactController');
const validateToken = require('../middleware/validateToken');

// router.get("/", (req, res) => {
//     res.status(200).json({message: "Hello to my world now"})
// })

router.use(validateToken)
router.route("/").get(getContact).post(CreateContact)
router.route("/:id").get(getContacts).put(UpdateContact).delete(DeleteContact)

module.exports = router