import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Brain, Sparkles, CheckCircle2, ShieldCheck, Feather, Compass, AlertTriangle } from 'lucide-react';

export default function ArtHistorianReasoning({ reasoning }) {
  const { isNight } = useTheme();

  if (!reasoning) return null;

  const {
    synthesis_rationale,
    stylistic_evidence = [],
    iconographic_evidence = [],
    historical_evidence = [],
    cross_check = {}
  } = reasoning;

  return (
    <div className={`p-6 sm:p-8 rounded-2xl mb-10 transition-all duration-300 shadow-md ${
      isNight
        ? 'bg-[#12141c] border border-[#2b2e3e] shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
        : 'bg-white border border-[#e6dece] shadow-[0_4px_20px_rgba(27,67,50,0.06)]'
    }`}>
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-gray-200/20 gap-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-xl ${
            isNight
              ? 'bg-[#262013] text-[#ffd700] border border-[#d4af37]/40 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
              : 'bg-[#eaf4ee] text-[#1b4332] border border-[#2d6a4f]/20'
          }`}>
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-lg sm:text-xl font-bold font-regal ${
              isNight ? 'text-gold-gradient' : 'text-[#1b4332]'
            }`}>
              Multimodal LLM Reasoning & Connoisseurship
            </h3>
            <p className={`text-xs ${isNight ? 'text-[#8e95a5]' : 'text-[#6c675c]'}`}>
              Grounded art-historical synthesis powered by Qwen 2.5-VL and Sanskrit Dhyana knowledge retrieval
            </p>
          </div>
        </div>

        {/* Cross Check Tag */}
        <div className="flex items-center space-x-2">
          {cross_check.agrees_with_classifiers ? (
            <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              isNight
                ? 'bg-[#1e281e] text-[#86efac] border border-green-500/30'
                : 'bg-[#eaf6ee] text-[#1b4332] border border-green-600/20'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Consensus: Classifier & VLM Agree</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/30">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Cross-Check Discrepancy</span>
            </span>
          )}
        </div>
      </div>

      {/* Synthesis Paragraph */}
      <div className={`p-4 sm:p-5 rounded-xl mb-6 leading-relaxed text-sm ${
        isNight
          ? 'bg-[#181a26] border border-[#2d3144] text-[#dcdfe7]'
          : 'bg-[#f8f5ee] border border-[#e8dfcd] text-[#332f28]'
      }`}>
        <div className="flex items-start space-x-3">
          <Feather className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
            isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'
          }`} />
          <div>
            <span className={`font-bold font-regal text-xs uppercase tracking-wider block mb-1 ${
              isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'
            }`}>
              Art-Historical Synthesis
            </span>
            <p className="text-sm leading-relaxed">{synthesis_rationale}</p>
          </div>
        </div>
      </div>

      {/* Detailed Evidence Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Stylistic & Brushwork Evidence */}
        <div className={`p-4 rounded-xl ${
          isNight ? 'bg-[#151722] border border-[#252838]' : 'bg-[#faf8f4] border border-[#eee5d5]'
        }`}>
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className={`w-4 h-4 ${isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'}`} />
            <h4 className={`text-xs font-bold uppercase tracking-wider ${
              isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'
            }`}>
              Stylistic & Brushwork Observations
            </h4>
          </div>
          <ul className="space-y-2 text-xs leading-relaxed">
            {stylistic_evidence.map((point, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                  isNight ? 'bg-[#ffd700]' : 'bg-[#1b4332]'
                }`} />
                <span className={isNight ? 'text-[#c4cad7]' : 'text-[#4e483e]'}>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Historical Context & Epoch Markers */}
        <div className={`p-4 rounded-xl ${
          isNight ? 'bg-[#151722] border border-[#252838]' : 'bg-[#faf8f4] border border-[#eee5d5]'
        }`}>
          <div className="flex items-center space-x-2 mb-3">
            <Compass className={`w-4 h-4 ${isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'}`} />
            <h4 className={`text-xs font-bold uppercase tracking-wider ${
              isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'
            }`}>
              Historical Atelier & Epoch Markers
            </h4>
          </div>
          <ul className="space-y-2 text-xs leading-relaxed">
            {historical_evidence.map((point, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                  isNight ? 'bg-[#ffd700]' : 'bg-[#1b4332]'
                }`} />
                <span className={isNight ? 'text-[#c4cad7]' : 'text-[#4e483e]'}>{point}</span>
              </li>
            ))}
            {iconographic_evidence.map((point, idx) => (
              <li key={`icon-${idx}`} className="flex items-start space-x-2">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                  isNight ? 'bg-[#ffd700]' : 'bg-[#1b4332]'
                }`} />
                <span className={isNight ? 'text-[#c4cad7]' : 'text-[#4e483e]'}>{point}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
}
