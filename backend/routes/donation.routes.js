const express = require('express')
const { submitDonation, getAllDonation } = require('../controllers/donationController')
    const router = express.Router()

router.post('/',submitDonation)
router.get('/',getAllDonation)  //admin Only


module.exports = router