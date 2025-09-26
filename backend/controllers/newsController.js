const News = require('../models/News.Model')


// get All News
exports.getAllNews = async (req, res) => {
    try {
        const news = await News.find({ isActive: true })
            .sort({ publishDate: -1 })
            .limit(10);
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Add New News Admin Only
exports.addNews = async (req, res) => {
    try {
        const { title, description, source, url, imageUrl, category } = req.body;

        const news = new News({
            title,
            description,
            source,
            url,
            imageUrl,
            category
        });

        await news.save();
        res.status(201).json({ message: 'News added successfully', news });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

