const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
require('dotenv').config();

// Routes
const authRoute = require('./routes/auth.routes')
const contactRoute = require('./routes/contact.routes')
const newsRoute = require('./routes/news.routes')
const donationRoute = require('./routes/donation.routes')
const imageRoute = require('./routes/gallery.routes')

connectDB()
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors());


// Routes
app.use('/api/auth', authRoute);
app.use('/api/contact',contactRoute);
app.use('/api/news',newsRoute);
app.use('/api/donation',donationRoute);
app.use('/api/images',imageRoute);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Umeed School API is running!',
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT} (${process.env.NODE_ENV || 'development'})`)
);

module.exports = app;
