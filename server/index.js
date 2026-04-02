require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cvRoutes = require('./routes/cv');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50kb' }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/cv', cvRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Catch-all route to serve the React index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
