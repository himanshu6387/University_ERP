const Contact = require('../models/Contact.Model')


exports.submitContact = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        const contact = new Contact({
            name,
            email,
            phone,
            subject,
            message
        });

        await contact.save();

        res.status(201).json({
            message: 'Thank you for your message. We will get back to you soon!',
            contact: contact
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to submit contact form',
            error: error.message
        });
    }
}


// Get all contacts (admin only)
exports.getAllContact=async(req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

