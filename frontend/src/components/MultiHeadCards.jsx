import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Palette, Calendar, Music, UserCheck } from 'lucide-react';

export default function MultiHeadCards({ result }) {
  const { isNight } = useTheme();

  if (!result) return null;

  const heads = [
    {
      id: 'school',
      title: 'Artistic School',
      icon: Palette,
      value: result.school?.value,
      confidence: result.school?.confidence,
      probabilities: result.school?.probabilities || {},
      evidence: result.school?.evidence || []
    },
    {
      id: 'period',
      title: 'Historical Period',
      icon: Calendar,
      value: result.period?.value,
      confidence: result.period?.confidence,
      probabilities: result.period?.probabilities || {},
      evidence: result.period?.evidence || []
    },
    {
      id: 'raga',
      title: 'Raga / Musical Mode',
      icon: Music,
      value: result.raga?.value,
      confidence: result.raga?.confidence,
      probabilities: result.raga?.probabilities || {},
      evidence: result.raga?.evidence || []
    },
    {
      id: 'artist',
      title: 'Artist Attribution',
      icon: UserCheck,
      value: result.artist?.value,
      confidence: result.artist?.confidence,
      probabilities: result.artist?.probabilities || {},
      evidence: result.artist?.evidence || []
    }
  ];

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`text-lg sm:text-xl font-bold font-regal ${
            isNight ? 'text-[#f5f6f8]' : 'text-[#1c1d21]'
          }`}>
            Multi-Head Classifier Predictions
          </h3>
          <p className={`text-xs ${isNight ? 'text-[#8e95a5]' : 'text-[#6c675c]'}`}>
            Dedicated task-specific classification heads evaluated on fused visual embeddings.
          </p>
        </div>
        
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${
          isNight ? 'bg-[#181a24] text-[#ffd700] border border-[#d4af37]/30' : 'bg-[#eef5f0] text-[#1b4332] border border-[#2d6a4f]/20'
        }`}>
          Temperature Calibrated
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {heads.map((head) => {
          const Icon = head.icon;
          const probEntries = Object.entries(head.probabilities)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3); // Top 3 candidates

          return (
            <div
              key={head.id}
              className={`p-5 rounded-xl transition-all duration-300 flex flex-col justify-between ${
                isNight
                  ? 'bg-[#13151f] border border-[#26293a] hover:border-[#383d54]'
                  : 'bg-white border border-[#e6dece] hover:border-[#d0c5af] shadow-sm'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className={`p-2 rounded-lg ${
                      isNight ? 'bg-[#1c1f2e] text-[#ffd700]' : 'bg-[#f4efe4] text-[#1b4332]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      isNight ? 'text-[#8e95a5]' : 'text-[#777063]'
                    }`}>
                      {head.title}
                    </span>
                  </div>

                  <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                    isNight
                      ? 'bg-[#292312] text-[#ffd700] border border-[#d4af37]/40'
                      : 'bg-[#eef5f0] text-[#1b4332] border border-[#2d6a4f]/30'
                  }`}>
                    {head.confidence}%
                  </span>
                </div>

                {/* Primary Prediction Value */}
                <div className={`text-lg sm:text-xl font-bold font-regal mb-3 ${
                  isNight ? 'text-[#f5f6f8]' : 'text-[#1c1d21]'
                }`}>
                  {head.value || 'Unknown'}
                </div>

                {/* Probability Distribution */}
                <div className="space-y-2 mb-4">
                  {probEntries.map(([label, prob]) => {
                    const pct = Math.round(prob * 100);
                    return (
                      <div key={label} className="text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className={`truncate max-w-[200px] ${
                            isNight ? 'text-[#c2c8d7]' : 'text-[#4e483e]'
                          }`}>
                            {label}
                          </span>
                          <span className={`font-semibold ml-2 ${
                            isNight ? 'text-[#8e95a5]' : 'text-[#777063]'
                          }`}>
                            {pct}%
                          </span>
                        </div>
                        <div className="w-full bg-black/10 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isNight ? 'bg-[#d4af37]' : 'bg-[#1b4332]'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Evidence Snippet */}
              {head.evidence && head.evidence.length > 0 && (
                <div className={`pt-3 border-t text-[11px] leading-relaxed ${
                  isNight ? 'border-[#26293a] text-[#8e95a5]' : 'border-[#f0eae0] text-[#6c675c]'
                }`}>
                  <span className="font-semibold text-xs block mb-0.5">Iconographic Marker:</span>
                  {head.evidence[0]}
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}
