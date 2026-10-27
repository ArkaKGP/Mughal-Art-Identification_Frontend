import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { X, History, Sparkles, CheckCircle2, Calendar, ArrowRight } from 'lucide-react';
import { fetchAnalysisHistory } from '../services/api';

export default function HistoryDrawer({ isOpen, onClose, onSelectHistoryItem }) {
  const { isNight } = useTheme();
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchAnalysisHistory()
        .then(data => {
          setHistoryItems(data.history || []);
        })
        .catch(err => {
          console.error('Failed to load history:', err);
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className={`w-screen max-w-md p-6 flex flex-col justify-between transition-all duration-300 shadow-2xl ${
          isNight
            ? 'bg-[#12141e] border-l border-[#272a3c] text-[#f5f6f8]'
            : 'bg-white border-l border-[#e6dece] text-[#1c1d21]'
        }`}>
          
          {/* Top Header */}
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200/20">
              <div className="flex items-center space-x-2.5">
                <History className={`w-5 h-5 ${isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'}`} />
                <h3 className={`text-lg font-bold font-regal ${
                  isNight ? 'text-gold-gradient' : 'text-[#1b4332]'
                }`}>
                  Analysis History
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-black/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            {loading ? (
              <div className="py-12 text-center text-xs text-gray-400">
                Loading stored analyses...
              </div>
            ) : historyItems.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-400">
                No previous analyses found. Upload a painting to get started!
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-140px)] pr-1">
                {historyItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectHistoryItem(item);
                      onClose();
                    }}
                    className={`p-3.5 rounded-xl cursor-pointer transition-all duration-200 border flex items-center space-x-3 ${
                      isNight
                        ? 'bg-[#181a26] border-[#292d40] hover:border-[#ffd700]/50'
                        : 'bg-[#faf8f4] border-[#eee4d4] hover:border-[#1b4332]/40'
                    }`}
                  >
                    {/* Thumbnail preview */}
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt="Thumbnail"
                        className="w-14 h-14 rounded-lg object-cover bg-black/20 flex-shrink-0"
                      />
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          item.is_mughal
                            ? isNight ? 'bg-[#292312] text-[#ffd700]' : 'bg-[#eef5f0] text-[#1b4332]'
                            : 'bg-red-500/10 text-red-400'
                        }`}>
                          {item.is_mughal ? 'MUGHAL' : 'NON-MUGHAL'}
                        </span>
                        <span className="text-[11px] font-semibold opacity-75">
                          {item.confidence}%
                        </span>
                      </div>

                      <div className="font-semibold text-xs truncate mb-1">
                        {item.originalName || item.filename}
                      </div>

                      <div className="text-[10px] text-gray-400 flex items-center space-x-1 truncate">
                        <span>{item.period?.value || 'Unknown Period'}</span>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200/20 text-center text-[11px] text-gray-400">
            Backed by local JSON store & MongoDB
          </div>

        </div>
      </div>
    </div>
  );
}
