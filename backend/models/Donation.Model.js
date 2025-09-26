const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
    donorName: {
        type: String,
        required: [true, 'Donor name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [1, 'Amount must be greater than 0']
    },
    currency: {
        type: String,
        default: 'INR'
    },
    donationType: {
        type: String,
        enum: ['one-time', 'monthly', 'yearly'],
        default: 'one-time'
    },
    purpose: {
        type: String,
        enum: ['general', 'infrastructure', 'scholarships', 'equipment', 'other'],
        default: 'general'
    },
    message: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'cancelled'],
        default: 'pending'
    },
    paymentId: {
        type: String,
        trim: true
    },
    isAnonymous: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Donation', donationSchema);