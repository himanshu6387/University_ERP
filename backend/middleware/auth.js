const jwt = require('jsonwebtoken')
const User = require('../models/User.Model')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer', '')
        if (!token) {
            return res.status(401).json({ message: 'No Token! Authorization Denied..' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select('-password')
        if (!user || !user.isActive) {
            return res.status(401).json({ message: 'Token is not valid' });
        }

        req.user = {
            userId: user._id,
            role: user.role,
            email: user.email,
            name: user.name
        }

        next()

    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
}

// Admin only middleware
const adminAuth = (req, res, next) => {
    auth(req, res, () => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access required' });
        }
        next();
    });
};

module.exports = auth;
module.exports.adminAuth = adminAuth;