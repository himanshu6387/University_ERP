const Gallery = require('../models/Gallery.Model');
const cloudinary = require('../cloudinary/cloudinary');

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ mesasge: 'Image not found...' })
        }
        let imageUrls = ''

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path)
            imageUrls = result.secure_url
        }

        const newImage = new Gallery({ imageUrl: imageUrls })
        await newImage.save()

        return res.status(201).json({ message: 'file uploaded Successfully..' })
    } catch (error) {
        return res.status(500).json({message:error.mesasge})
    }
};

exports.getImages = async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        return res.status(200).json(images);
    } catch (err) {
        return res.status(500).json({ message: err.message, success: false });
    }
};
