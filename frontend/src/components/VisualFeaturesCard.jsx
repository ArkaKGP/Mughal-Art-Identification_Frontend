import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Layers, Sparkles, Sliders, Scan, Target } from 'lucide-react';

export default function VisualFeaturesCard({ features, motifs }) {
  const { isNight } = useTheme();

  if (!features) return null;

  return (
    <div className={`p-6 sm:p-8 rounded-2xl mb-10 transition-all duration-300 shadow-md ${
      isNight
        ? 'bg-[#12141c] border border-[#2b2e3e]'
        : 'bg-white border border-[#e6dece] shadow-[0_4px_20px_rgba(27,67,50,0.06)]'
    }`}>
      
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className={`p-2.5 rounded-xl ${
          isNight
            ? 'bg-[#262013] text-[#ffd700] border border-[#d4af37]/40 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
            : 'bg-[#eaf4ee] text-[#1b4332] border border-[#2d6a4f]/20'
        }`}>
          <Scan className="w-5 h-5" />
        </div>
        <div>
          <h3 className={`text-lg sm:text-xl font-bold font-regal ${
            isNight ? 'text-gold-gradient' : 'text-[#1b4332]'
          }`}>
            Domain-Specific Visual Features
          </h3>
          <p className={`text-xs ${isNight ? 'text-[#8e95a5]' : 'text-[#6c675c]'}`}>
            Quantitative pigment analysis (Gold Leaf & Lac Red) and morphological composition metrics
          </p>
        </div>
      </div>

      {/* Grid of Gauges & Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        
        {/* Gold Pigment Index */}
        <div className={`p-4 rounded-xl text-center ${
          isNight ? 'bg-[#181a24] border border-[#272b3b]' : 'bg-[#faf8f4] border border-[#eee4d4]'
        }`}>
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-500 mb-1">
            Gold Leaf Index
          </div>
          <div className={`text-2xl font-black font-regal ${isNight ? 'text-[#ffd700]' : 'text-[#b48006]'}`}>
            {features.gold_pigment_index}%
          </div>
          <p className="text-[10px] text-[#8e95a5] mt-1">
            {features.gold_pigment_index > 3 ? 'High Gold Concentration' : 'Subtle/No Gilding'}
          </p>
        </div>

        {/* Lac Red Index */}
        <div className={`p-4 rounded-xl text-center ${
          isNight ? 'bg-[#181a24] border border-[#272b3b]' : 'bg-[#faf8f4] border border-[#eee4d4]'
        }`}>
          <div className="text-[11px] font-bold uppercase tracking-wider text-red-500 mb-1">
            Mineral Red Index
          </div>
          <div className={`text-2xl font-black font-regal ${isNight ? 'text-[#ff6b6b]' : 'text-[#c92a2a]'}`}>
            {features.mineral_red_index}%
          </div>
          <p className="text-[10px] text-[#8e95a5] mt-1">
            {features.mineral_red_index > 10 ? 'High Rajasthani Red' : 'Mughal Natural Palette'}
          </p>
        </div>

        {/* Horizontal Symmetry */}
        <div className={`p-4 rounded-xl text-center ${
          isNight ? 'bg-[#181a24] border border-[#272b3b]' : 'bg-[#faf8f4] border border-[#eee4d4]'
        }`}>
          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-1">
            Canvas Symmetry
          </div>
          <div className={`text-2xl font-black font-regal ${isNight ? 'text-[#93c5fd]' : 'text-[#1e40af]'}`}>
            {Math.round(features.horizontal_symmetry * 100)}%
          </div>
          <p className="text-[10px] text-[#8e95a5] mt-1">
            Formal Imperial Balance
          </p>
        </div>

        {/* Texture Entropy */}
        <div className={`p-4 rounded-xl text-center ${
          isNight ? 'bg-[#181a24] border border-[#272b3b]' : 'bg-[#faf8f4] border border-[#eee4d4]'
        }`}>
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-500 mb-1">
            Texture Detail
          </div>
          <div className={`text-2xl font-black font-regal ${isNight ? 'text-[#86efac]' : 'text-[#166534]'}`}>
            {features.texture_entropy}
          </div>
          <p className="text-[10px] text-[#8e95a5] mt-1">
            Micro-Stippling Density
          </p>
        </div>

      </div>

      {/* Detected Motifs (YOLO-World Open Vocabulary) */}
      {motifs && motifs.length > 0 && (
        <div className={`p-4 rounded-xl ${
          isNight ? 'bg-[#161824] border border-[#272b3c]' : 'bg-[#f4efe4] border border-[#e4dcce]'
        }`}>
          <div className="flex items-center space-x-2 mb-3">
            <Target className={`w-4 h-4 ${isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'}`} />
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'
            }`}>
              Detected Iconographic Motifs (YOLO-World Detector)
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {motifs.map((motif, idx) => (
              <span
                key={idx}
                className={`text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 font-medium ${
                  isNight
                    ? 'bg-[#1f2232] text-[#d4af37] border border-[#d4af37]/30'
                    : 'bg-white text-[#1b4332] border border-[#2d6a4f]/20 shadow-xs'
                }`}
              >
                <span>{motif.label}</span>
                <span className="text-[10px] opacity-75 font-semibold">({Math.round(motif.confidence * 100)}%)</span>
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
