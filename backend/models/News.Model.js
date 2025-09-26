const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    source: {
        type: String,
        required: [true, 'Source is required'],
        trim: true
    },
    url: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String,
        trim: true
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        enum: ['achievement', 'news', 'event', 'announcement'],
        default: 'news'
    }
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);