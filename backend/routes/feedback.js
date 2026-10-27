import express from 'express';
import { saveFeedbackItem, getFeedbackList } from '../data/localStore.js';
import { Feedback } from '../models/Feedback.js';

const router = express.Router();

// GET /api/feedback
router.get('/', async (req, res) => {
  try {
    const list = getFeedbackList();
    res.json({ success: true, count: list.length, feedback: list });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve expert feedback' });
  }
});

// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    const { analysisId, targetField, originalPrediction, correctedValue, reviewerName, notes } = req.body;

    if (!targetField || !correctedValue) {
      return res.status(400).json({ error: 'targetField and correctedValue are required' });
    }

    const payload = {
      analysisId: analysisId || `adhoc_${Date.now()}`,
      targetField,
      originalPrediction: originalPrediction || 'Unknown',
      correctedValue,
      reviewerName: reviewerName || 'Art Connoisseur',
      notes: notes || ''
    };

    const savedLocal = saveFeedbackItem(payload);

    try {
      await Feedback.create(payload);
    } catch (e) {
      // Non-fatal if Mongo is offline
    }

    res.json({
      success: true,
      message: 'Expert feedback recorded successfully. Ready for active retraining.',
      entry: savedLocal
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save feedback', details: err.message });
  }
});

export default router;
