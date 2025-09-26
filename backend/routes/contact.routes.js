const express = require('express')
const { submitContact, getAllContact } = require('../controllers/contactController')
const router = express.Router()

router.post('/',submitContact)
router.get('/',getAllContact)

module.exports = router

