import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import predictRoutes from './routes/predict.js';
import samplesRoutes from './routes/samples.js';
import feedbackRoutes from './routes/feedback.js';
import historyRoutes from './routes/history.js';
import statsRoutes from './routes/stats.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - Allow all origins (Vercel production and local development)
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded images
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Serve static sample paintings from BTP dataset (Read-Only)
const btpImagesDir = path.resolve(__dirname, '../BTP/data/raw/images');
if (fs.existsSync(btpImagesDir)) {
  app.use('/samples', express.static(btpImagesDir));
}

// API Routes
app.use('/api', predictRoutes);
app.use('/api/samples', samplesRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/stats', statsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Mughal Miniature Art Authentication Backend',
    timestamp: new Date().toISOString(),
    mongoConnected: mongoose.connection.readyState === 1
  });
});

// Optional MongoDB connection (graceful fallback if not running locally)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mughal_art_auth';
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 2000
}).then(() => {
  console.log('[MongoDB] Connected successfully to local database.');
}).catch(() => {
  console.log('[MongoDB] Not running locally. Operating smoothly with persistent JSON localStore.');
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` Mughal Art Authentication Server running on port ${PORT}`);
  console.log(` API Endpoint: http://localhost:${PORT}/api/health`);
  console.log(` Serving uploads from: ${uploadsDir}`);
  console.log(` Serving samples from: ${btpImagesDir}`);
  console.log(`=======================================================`);
});
