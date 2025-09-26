const express = require('express')
const { getAllNews, addNews } = require('../controllers/newsController')
const router = express.Router()

router.get('/',getAllNews)
router.post('/',addNews)  //admin Only


module.exports = router