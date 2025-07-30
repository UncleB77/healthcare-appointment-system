require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

const appointmentRoutes = require('./routes/appointments');
app.use('/api/appointments', appointmentRoutes);

// MongoDB connection
if (!uri) {
  console.error('❌ MONGO_URI not set in .env file');
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));