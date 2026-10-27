import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// GET /api/stats - Model & Pipeline Performance Metrics
router.get('/', (req, res) => {
  const evalPath = path.resolve(__dirname, '../../BTP/reports/final_evaluation.json');
  let metrics = {
    heads: {
      school: { accuracy: 90.5, macroF1: 0.485, majorityLabel: "Mughal", baselineAcc: 94.0 },
      raga: { accuracy: 90.5, macroF1: 0.463, majorityLabel: "Non-Ragamala", baselineAcc: 94.0 },
      period: { accuracy: 66.1, macroF1: 0.462, majorityLabel: "Akbar Period", baselineAcc: 61.0 },
      artist: { accuracy: 96.4, macroF1: 0.245, majorityLabel: "Unknown", baselineAcc: 96.4 }
    },
    dataset: {
      totalPaintings: 564,
      mughalMiniatures: 395,
      paintingCrops: 134,
      ragamalaPaintings: 35,
      trainSplit: 395,
      valSplit: 85,
      testSplit: 84
    },
    pipeline: {
      yoloMotifsDetected: 9609,
      visionBackbone: "ViT-B/16 (768-d Global)",
      regionAggregation: "YOLO-World + Mean Pooling (768-d)",
      handcraftedFeatures: "HSV/Lab + GLCM/LBP + Morphology (726-d)",
      totalFeatureDim: 2262,
      vlmModel: "Qwen 2.5-VL 7B (via Ollama)",
      calibration: "Temperature Scaling"
    }
  };

  if (fs.existsSync(evalPath)) {
    try {
      const raw = JSON.parse(fs.readFileSync(evalPath, 'utf-8'));
      if (raw.heads) {
        metrics.heads.school.accuracy = Math.round(raw.heads.school.final.accuracy * 1000) / 10;
        metrics.heads.school.macroF1 = Math.round(raw.heads.school.final.macro_f1 * 1000) / 1000;
        metrics.heads.raga.accuracy = Math.round(raw.heads.raga.final.accuracy * 1000) / 10;
        metrics.heads.raga.macroF1 = Math.round(raw.heads.raga.final.macro_f1 * 1000) / 1000;
        metrics.heads.period.accuracy = Math.round(raw.heads.period.final.accuracy * 1000) / 10;
        metrics.heads.period.macroF1 = Math.round(raw.heads.period.final.macro_f1 * 1000) / 1000;
      }
    } catch (e) {
      // Use defaults
    }
  }

  res.json({
    success: true,
    ...metrics
  });
});

export default router;
