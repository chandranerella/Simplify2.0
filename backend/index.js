const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const personalRoutes = require('./routes/personal');

const app = express();
const PORT = 8080;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/simplify', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(express.json());

app.use(cors({
  origin: '*',  // Frontend dev server
  credentials: true                 // Allow cookies
}));

app.use(session({
  secret: 'simplify-secret-key',    // Should be in .env file in real projects
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,                  // Set to true in production (HTTPS)
    maxAge: 1000 * 60 * 60          // 1 hour
  }
}));

// Routes
app.use('/api', authRoutes);
app.use('/api', personalRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
