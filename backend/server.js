const express = require('express');
const cors = require('cors');
const path = require('path');

// Route imports
const authRoutes = require('./routes/auth');
const childrenRoutes = require('./routes/children');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/children', childrenRoutes);

// Start server locally
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
