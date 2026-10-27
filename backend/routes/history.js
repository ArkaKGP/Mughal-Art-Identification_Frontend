import express from 'express';
import { getHistory } from '../data/localStore.js';

const router = express.Router();

// GET /api/history
router.get('/', (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 20;
    const items = getHistory(limit);
    res.json({ success: true, count: items.length, history: items });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve history' });
  }
});

export default router;
