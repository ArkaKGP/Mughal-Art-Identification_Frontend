import mongoose from 'mongoose';

const AnalysisSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  imagePath: { type: String, required: true },
  verdict: { type: String, required: true }, // e.g. "YES, MUGHAL MINIATURE" or "NO, NON-MUGHAL"
  isMughal: { type: Boolean, required: true },
  confidence: { type: Number, required: true },
  school: {
    value: String,
    confidence: Number,
    evidence: [String]
  },
  period: {
    value: String,
    confidence: Number,
    evidence: [String]
  },
  raga: {
    value: String,
    confidence: Number,
    evidence: [String]
  },
  artist: {
    value: String,
    confidence: Number,
    evidence: [String]
  },
  visualFeatures: {
    goldPigmentIndex: Number,
    mineralRedIndex: Number,
    textureEntropy: Number,
    horizontalSymmetry: Number,
    verticalSymmetry: Number,
    focalOffsetX: Number,
    focalOffsetY: Number
  },
  detectedMotifs: [{
    label: String,
    confidence: Number,
    bbox: [Number]
  }],
  llmReasoning: {
    synthesisRationale: String,
    stylisticEvidence: [String],
    iconographicEvidence: [String],
    crossCheck: {
      agreesWithClassifiers: Boolean,
      routeToExpertReview: Boolean,
      reviewReason: String
    }
  },
  createdAt: { type: Date, default: Date.now }
});

export const Analysis = mongoose.models.Analysis || mongoose.model('Analysis', AnalysisSchema);
