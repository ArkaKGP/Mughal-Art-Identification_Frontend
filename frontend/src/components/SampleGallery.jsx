import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SampleGallery({ samples, onSelectSample, isAnalyzing }) {
  const { isNight } = useTheme();

  if (!samples || samples.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-4 mb-14">
      <div className="text-center mb-6">
        <h2 className={`text-xl sm:text-2xl font-bold font-regal mb-1 ${
          isNight ? 'text-gold-gradient' : 'text-[#1b4332]'
        }`}>
          Or Test With Dataset Benchmark Paintings
        </h2>
        <p className={`text-xs sm:text-sm ${isNight ? 'text-[#8e95a5]' : 'text-[#6c675c]'}`}>
          Select any verified painting from the 564 historical manuscript dataset for immediate 1-click evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {samples.map((sample) => (
          <div
            key={sample.id}
            className={`group rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between ${
              isNight
                ? 'bg-[#13151e] border border-[#262938] hover:border-[#d4af37]/60 hover:shadow-[0_4px_20px_rgba(212,175,55,0.15)]'
                : 'bg-white border border-[#e6dece] hover:border-[#1b4332]/50 hover:shadow-md'
            }`}
          >
            {/* Painting Image Header */}
            <div className="relative h-44 bg-black/20 overflow-hidden">
              <img
                src={sample.imageUrl}
                alt={sample.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Tag Pill */}
              <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-md ${
                  sample.trueSchool === 'Mughal'
                    ? isNight
                      ? 'bg-[#1f1d11]/90 text-[#ffd700] border border-[#d4af37]/50'
                      : 'bg-[#1b4332]/90 text-white'
                    : isNight
                    ? 'bg-[#291717]/90 text-[#ff8a80] border border-red-500/40'
                    : 'bg-[#8d4004]/90 text-white'
                }`}>
                  {sample.trueSchool}
                </span>

                {sample.goldRich && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/90 text-black backdrop-blur-md">
                    Gold Leaf
                  </span>
                )}
              </div>
            </div>

            {/* Info Body */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className={`text-sm font-bold font-regal line-clamp-1 mb-1 ${
                  isNight ? 'text-[#f5f6f8] group-hover:text-[#ffd700]' : 'text-[#1c1d21] group-hover:text-[#1b4332]'
                }`}>
                  {sample.title}
                </h3>
                
                <p className={`text-[11px] font-medium mb-1.5 ${isNight ? 'text-[#d4af37]' : 'text-[#2d6a4f]'}`}>
                  {sample.period}
                </p>

                <p className={`text-xs line-clamp-2 mb-3 leading-relaxed ${isNight ? 'text-[#8e95a5]' : 'text-[#6c675c]'}`}>
                  {sample.description}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectSample(sample)}
                disabled={isAnalyzing}
                className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all duration-200 disabled:opacity-50 ${
                  isNight
                    ? 'bg-[#1e202d] text-[#e0e4ef] group-hover:bg-[#d4af37] group-hover:text-black border border-[#2f3346]'
                    : 'bg-[#f4efe4] text-[#3c372e] group-hover:bg-[#1b4332] group-hover:text-white border border-[#ded5c2]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analyze This Painting</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
