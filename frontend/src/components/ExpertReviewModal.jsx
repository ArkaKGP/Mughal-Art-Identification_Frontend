import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { X, Send, CheckCircle2, MessageSquareQuote, AlertCircle } from 'lucide-react';
import { submitExpertFeedback } from '../services/api';

export default function ExpertReviewModal({ isOpen, onClose, currentAnalysis, onFeedbackSubmitted }) {
  const { isNight } = useTheme();

  const [targetField, setTargetField] = useState('school');
  const [correctedValue, setCorrectedValue] = useState('');
  const [reviewerName, setReviewerName] = useState('Art Connoisseur / Examiner');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen) return null;

  const originalValue = currentAnalysis?.[targetField]?.value || 'Mughal';

  const fieldOptions = [
    { id: 'school', label: 'School (Mughal, Rajasthani, Pahari)' },
    { id: 'period', label: 'Period (Akbar, Jahangir, Shah Jahan, etc.)' },
    { id: 'raga', label: 'Raga (Non-Ragamala, Shri, etc.)' },
    { id: 'artist', label: 'Artist (Bishandas, Ustad Mansur, Unknown)' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!correctedValue.trim()) {
      setErrorMsg('Please specify the corrected value.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      await submitExpertFeedback({
        analysisId: currentAnalysis?.analysisId || `analysis_${Date.now()}`,
        targetField,
        originalPrediction: originalValue,
        correctedValue,
        reviewerName,
        notes
      });

      setSuccessMsg('Feedback logged successfully! Added to continuous learning feedback loop.');
      if (onFeedbackSubmitted) onFeedbackSubmitted();
      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 1800);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className={`w-full max-w-lg rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-2xl relative ${
        isNight
          ? 'bg-[#141622] border border-[#2d3144] text-[#f5f6f8]'
          : 'bg-white border border-[#e6dece] text-[#1c1d21]'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className={`p-2 rounded-xl ${
            isNight ? 'bg-[#2a2414] text-[#ffd700]' : 'bg-[#eaf4ee] text-[#1b4332]'
          }`}>
            <MessageSquareQuote className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`text-xl font-bold font-regal ${
              isNight ? 'text-gold-gradient' : 'text-[#1b4332]'
            }`}>
              Connoisseur Human Review
            </h3>
            <p className="text-xs text-gray-400">
              Provide expert ground-truth corrections (Phase 10.3 Feedback Retraining)
            </p>
          </div>
        </div>

        {/* Status Alerts */}
        {successMsg && (
          <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-500 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Target Field Selector */}
          <div>
            <label className="block font-semibold mb-1 uppercase tracking-wider text-[11px] opacity-75">
              Target Prediction Field
            </label>
            <select
              value={targetField}
              onChange={(e) => setTargetField(e.target.value)}
              className={`w-full p-2.5 rounded-lg border text-xs outline-none transition-colors ${
                isNight
                  ? 'bg-[#1b1e2c] border-[#31364d] text-white focus:border-[#ffd700]'
                  : 'bg-[#faf8f4] border-[#d8cfbe] text-gray-800 focus:border-[#1b4332]'
              }`}
            >
              {fieldOptions.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Original Value (Read only) */}
          <div>
            <label className="block font-semibold mb-1 uppercase tracking-wider text-[11px] opacity-75">
              Current Model Prediction
            </label>
            <input
              type="text"
              readOnly
              value={originalValue}
              className={`w-full p-2.5 rounded-lg border text-xs opacity-70 cursor-not-allowed ${
                isNight ? 'bg-[#1b1e2c] border-[#31364d]' : 'bg-[#f4efe4] border-[#d8cfbe]'
              }`}
            />
          </div>

          {/* Corrected Value */}
          <div>
            <label className="block font-semibold mb-1 uppercase tracking-wider text-[11px] opacity-75">
              Corrected Ground Truth Value *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Mughal, Akbar Period (c. 1556-1605), or Non-Ragamala"
              value={correctedValue}
              onChange={(e) => setCorrectedValue(e.target.value)}
              className={`w-full p-2.5 rounded-lg border text-xs outline-none transition-colors ${
                isNight
                  ? 'bg-[#1b1e2c] border-[#31364d] text-white focus:border-[#ffd700]'
                  : 'bg-[#faf8f4] border-[#d8cfbe] text-gray-800 focus:border-[#1b4332]'
              }`}
            />
          </div>

          {/* Reviewer Name */}
          <div>
            <label className="block font-semibold mb-1 uppercase tracking-wider text-[11px] opacity-75">
              Reviewer Name / Examiner
            </label>
            <input
              type="text"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              className={`w-full p-2.5 rounded-lg border text-xs outline-none transition-colors ${
                isNight
                  ? 'bg-[#1b1e2c] border-[#31364d] text-white focus:border-[#ffd700]'
                  : 'bg-[#faf8f4] border-[#d8cfbe] text-gray-800 focus:border-[#1b4332]'
              }`}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block font-semibold mb-1 uppercase tracking-wider text-[11px] opacity-75">
              Art-Historical Rationale & Notes
            </label>
            <textarea
              rows="3"
              placeholder="Explain the visual reason for this correction (e.g. distinct floral border, nim-qalam brushwork, etc.)..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`w-full p-2.5 rounded-lg border text-xs outline-none transition-colors ${
                isNight
                  ? 'bg-[#1b1e2c] border-[#31364d] text-white focus:border-[#ffd700]'
                  : 'bg-[#faf8f4] border-[#d8cfbe] text-gray-800 focus:border-[#1b4332]'
              }`}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all duration-200 ${
                isNight
                  ? 'bg-[#ffd700] text-black hover:bg-[#e6c200]'
                  : 'bg-[#1b4332] text-white hover:bg-[#2d6a4f]'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Recording...' : 'Submit Expert Correction'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
