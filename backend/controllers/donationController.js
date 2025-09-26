const Donation = require('../models/Donation.Model')


// AnyOne
exports.submitDonation = async (req, res) => {
    try {
        const {
            donorName,
            email,
            phone,
            amount,
            donationType,
            purpose,
            message,
            isAnonymous
        } = req.body;

        const donation = new Donation({
            donorName,
            email,
            phone,
            amount,
            donationType,
            purpose,
            message,
            isAnonymous
        });

        await donation.save();

        res.status(201).json({
            message: 'Thank you for your generous donation!',
            donation: {
                id: donation._id,
                amount: donation.amount,
                donationType: donation.donationType,
                purpose: donation.purpose
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to process donation',
            error: error.message
        });
    }
}


// GetAll Donations- Admin Only

exports.getAllDonation = async (req, res) => {
    try {
        const donations = await Donation.find().sort({ createdAt: -1 });
        const totalAmount = await Donation.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        res.json({
            donations,
            totalRaised: totalAmount[0]?.total || 0
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}