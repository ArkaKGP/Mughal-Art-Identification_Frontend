import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  analysisId: { type: String, required: true },
  targetField: { type: String, required: true }, // e.g. "school", "period", "raga", "artist"
  originalPrediction: { type: String, required: true },
  correctedValue: { type: String, required: true },
  reviewerName: { type: String, default: 'Art Connoisseur' },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);
