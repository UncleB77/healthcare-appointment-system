require('dotenv').config();
console.log("🟢 Starting backend server...");

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/appointments', require('./routes/appointments'));

// MongoDB connection
if (!uri) {
  console.error('❌ MONGO_URI not set in .env file');
  process.exit(1);
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB Connected...');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));