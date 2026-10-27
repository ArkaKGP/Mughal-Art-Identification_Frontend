import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { CheckCircle2, XCircle, ShieldAlert, Sparkles, MessageSquareQuote } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VerdictBanner({ result, onOpenReview }) {
  const { isNight } = useTheme();

  useEffect(() => {
    if (result && result.is_mughal && result.confidence >= 80) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: isNight ? ['#ffd700', '#d4af37', '#ffffff'] : ['#1b4332', '#2d6a4f', '#d4a373']
      });
    }
  }, [result, isNight]);

  if (!result) return null;

  const isRejected = result.is_miniature === false;
  const isMughal = result.is_mughal && !isRejected;
  const confidence = result.confidence;

  return (
    <div className={`w-full rounded-2xl overflow-hidden mb-8 transition-all duration-300 shadow-xl ${
      isRejected
        ? isNight
          ? 'bg-gradient-to-r from-[#211414] via-[#2d1515] to-[#211414] border-2 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.25)]'
          : 'bg-gradient-to-r from-[#fff5f5] via-[#fed7d7] to-[#fff5f5] border-2 border-red-600 shadow-[0_8px_30px_rgba(220,38,38,0.15)]'
        : isMughal
        ? isNight
          ? 'bg-gradient-to-r from-[#17150a] via-[#211d0e] to-[#17150a] border-2 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)]'
          : 'bg-gradient-to-r from-[#eef7f2] via-[#e2f0e7] to-[#eef7f2] border-2 border-[#2d6a4f] shadow-[0_8px_30px_rgba(27,67,50,0.12)]'
        : isNight
        ? 'bg-gradient-to-r from-[#211414] via-[#2a1717] to-[#211414] border-2 border-amber-600/60 shadow-[0_0_30px_rgba(239,68,68,0.15)]'
        : 'bg-gradient-to-r from-[#fef5f0] via-[#fdece3] to-[#fef5f0] border-2 border-[#d97706] shadow-[0_8px_30px_rgba(217,119,6,0.1)]'
    }`}>
      
      <div className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Left: Verdict badge & Text */}
          <div className="flex items-start sm:items-center space-x-4">
            
            {/* Big Stamp Icon */}
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
              isRejected
                ? isNight
                  ? 'bg-gradient-to-br from-red-600 to-rose-900 text-white shadow-[0_0_25px_rgba(239,68,68,0.4)]'
                  : 'bg-gradient-to-br from-red-700 to-red-900 text-white shadow-[0_6px_20px_rgba(185,28,28,0.3)]'
                : isMughal
                ? isNight
                  ? 'bg-gradient-to-br from-[#ffd700] to-[#b8860b] text-black shadow-[0_0_25px_rgba(212,175,55,0.4)]'
                  : 'bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-[#f4efe4] shadow-[0_6px_20px_rgba(27,67,50,0.3)]'
                : isNight
                ? 'bg-gradient-to-br from-amber-600 to-red-800 text-white'
                : 'bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-md'
            }`}>
              {isRejected ? (
                <div className="text-center font-black">
                  <span className="text-[10px] tracking-widest block uppercase opacity-90">GATE</span>
                  <span className="text-base sm:text-lg font-regal font-extrabold leading-tight">REJECT</span>
                </div>
              ) : isMughal ? (
                <div className="text-center font-black">
                  <span className="text-xs tracking-widest block uppercase opacity-80">VERDICT</span>
                  <span className="text-2xl sm:text-3xl font-regal font-extrabold leading-none">YES</span>
                </div>
              ) : (
                <div className="text-center font-black">
                  <span className="text-xs tracking-widest block uppercase opacity-80">VERDICT</span>
                  <span className="text-2xl sm:text-3xl font-regal font-extrabold leading-none">NO</span>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  isRejected
                    ? isNight
                      ? 'bg-red-950/80 text-red-300 border border-red-500/50'
                      : 'bg-red-100 text-red-800 border border-red-400'
                    : isMughal
                    ? isNight
                      ? 'bg-[#3b3112] text-[#ffd700] border border-[#d4af37]/50'
                      : 'bg-[#d8ecdf] text-[#1b4332] border border-[#2d6a4f]/30'
                    : isNight
                    ? 'bg-[#3b1919] text-[#ff8a80] border border-red-500/40'
                    : 'bg-[#fde2d2] text-[#9a3412] border border-orange-500/30'
                }`}>
                  {isRejected ? 'Out-Of-Distribution Gate' : isMughal ? 'Imperial School Match' : 'Alternative Tradition Detected'}
                </span>
                
                <span className={`text-[11px] font-medium ${isNight ? 'text-[#a2a9b8]' : 'text-[#6c675c]'}`}>
                  {isRejected ? 'Distribution Gate' : 'Calibrated Confidence'}
                </span>
              </div>

              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold font-regal tracking-tight ${
                isRejected
                  ? isNight
                    ? 'text-red-400'
                    : 'text-red-700'
                  : isMughal
                  ? isNight
                    ? 'text-gold-gradient'
                    : 'text-[#1b4332]'
                  : isNight
                  ? 'text-amber-400'
                  : 'text-[#b45309]'
              }`}>
                {result.verdict}
              </h2>

              <p className={`text-xs sm:text-sm mt-1 max-w-xl ${
                isNight ? 'text-[#c2c8d7]' : 'text-[#4e483e]'
              }`}>
                {isRejected
                  ? result.rejection_reason || 'This image is not recognized as an authentic Indian miniature painting and was rejected by the distribution gate.'
                  : isMughal
                  ? `Identified with ${confidence}% confidence as an authentic painting produced within the Mughal Imperial atelier.`
                  : `Identified with ${confidence}% confidence as belonging to the ${result.school?.value} miniature tradition rather than the Mughal court.`}
              </p>
            </div>
          </div>

          {/* Right: Confidence Gauge & Action */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 w-full md:w-auto">
            
            {/* Confidence Metric Box */}
            <div className={`p-4 rounded-xl text-center min-w-[150px] w-full sm:w-auto ${
              isRejected
                ? isNight
                  ? 'bg-[#1b1111] border border-red-600/40'
                  : 'bg-white border border-red-300'
                : isNight
                ? 'bg-[#12141c]/80 border border-[#2d3040]'
                : 'bg-white/80 border border-[#d9d1c1]'
            }`}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#8e95a5] mb-0.5">
                Model Confidence
              </div>
              <div className={`text-3xl font-black font-regal ${
                isMughal
                  ? isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'
                  : 'text-amber-500'
              }`}>
                {confidence}%
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-black/10 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    isMughal
                      ? isNight ? 'bg-[#ffd700]' : 'bg-[#1b4332]'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min(100, confidence)}%` }}
                />
              </div>
            </div>

            {/* Expert Feedback Review Button */}
            <button
              onClick={onOpenReview}
              className={`text-xs font-semibold px-4 py-2 rounded-lg flex items-center space-x-1.5 transition-all duration-200 ${
                isNight
                  ? 'bg-[#1e202d] text-[#ffd700] hover:bg-[#282a3c] border border-[#d4af37]/30'
                  : 'bg-white text-[#1b4332] hover:bg-[#f4efe4] border border-[#2d6a4f]/30 shadow-sm'
              }`}
            >
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>Connoisseur Feedback</span>
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
