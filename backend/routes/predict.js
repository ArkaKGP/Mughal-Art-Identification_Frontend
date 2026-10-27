import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { runInference } from '../ml_bridge/runner.js';
import { saveHistoryItem } from '../data/localStore.js';
import { Analysis } from '../models/Analysis.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Upload storage configuration
const uploadsDir = path.resolve(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${base}_${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/i;
    const isExtAllowed = allowed.test(path.extname(file.originalname).toLowerCase());
    const isMimeAllowed = allowed.test(file.mimetype);
    if (isExtAllowed || isMimeAllowed) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and WebP image files are supported'));
    }
  }
});

// POST /api/predict - User uploads an image
router.post('/predict', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image file (JPG, PNG, or WEBP).' });
    }

    const imagePath = req.file.path;
    const imageUrl = `/uploads/${req.file.filename}`;

    console.log(`[Predict API] Processing uploaded image: ${req.file.filename}`);
    const mlResult = await runInference(imagePath);

    if (mlResult.error || mlResult.model_running === false) {
      return res.status(503).json({
        success: false,
        error: mlResult.error || 'The Machine Learning model is currently not running.',
        details: mlResult.details || 'Check backend ML runtime.',
        modelRunning: false
      });
    }

    const record = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      imageUrl,
      ...mlResult
    };

    // Save to local store fallback
    const savedLocal = saveHistoryItem(record);

    // Save to MongoDB if available
    try {
      await Analysis.create(record);
    } catch (dbErr) {
      // Non-fatal if Mongo is offline
    }

    res.json({
      success: true,
      analysisId: savedLocal.id,
      ...record
    });
  } catch (err) {
    console.error('[Predict API Error]:', err);
    res.status(500).json({
      error: 'Failed to process image and run ML prediction.',
      details: err.message
    });
  }
});

// POST /api/predict-sample - User selects a preloaded sample painting
router.post('/predict-sample', async (req, res) => {
  try {
    const { sampleFilename } = req.body;
    if (!sampleFilename) {
      return res.status(400).json({ error: 'sampleFilename is required' });
    }

    const btpImagesDir = path.resolve(__dirname, '../../BTP/data/raw/images');
    const imagePath = path.join(btpImagesDir, sampleFilename);

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: `Sample image not found: ${sampleFilename}` });
    }

    console.log(`[Predict API] Processing preloaded sample: ${sampleFilename}`);
    const mlResult = await runInference(imagePath);

    if (mlResult.error || mlResult.model_running === false) {
      return res.status(503).json({
        success: false,
        error: mlResult.error || 'The Machine Learning model is currently not running.',
        details: mlResult.details || 'Check backend ML runtime.',
        modelRunning: false
      });
    }

    const record = {
      filename: sampleFilename,
      originalName: sampleFilename,
      imageUrl: `/samples/${sampleFilename}`,
      isSample: true,
      ...mlResult
    };

    const savedLocal = saveHistoryItem(record);

    res.json({
      success: true,
      analysisId: savedLocal.id,
      ...record
    });
  } catch (err) {
    console.error('[Predict Sample API Error]:', err);
    res.status(500).json({
      error: 'Failed to analyze sample painting.',
      details: err.message
    });
  }
});

export default router;
