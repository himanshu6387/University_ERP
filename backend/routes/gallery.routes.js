const express = require('express');
const { uploadImage, getImages } = require('../controllers/galleryController');
const upload = require('../middleware/multer');
const router = express.Router();

router.post('/upload', upload.single('imageUrl'), uploadImage);
router.get('/', getImages);

module.exports = router;
