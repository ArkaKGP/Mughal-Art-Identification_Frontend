import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ShieldCheck, Award, Eye, Brain } from 'lucide-react';

export default function HeroSection({ stats }) {
  const { isNight } = useTheme();

  return (
    <section className="pt-8 pb-6 text-center">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Subtle Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full mb-4 text-xs font-semibold tracking-wide uppercase shadow-sm transition-all duration-300">
          <span className={`w-2 h-2 rounded-full animate-ping ${
            isNight ? 'bg-[#ffd700]' : 'bg-[#1b4332]'
          }`} />
          <span className={isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'}>
            B.Tech Final Project · Autonomous Miniature Art Connoisseur
          </span>
        </div>

        {/* Heading */}
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-regal mb-4 ${
          isNight ? 'text-gold-gradient' : 'text-[#1b4332]'
        }`}>
          Detecting Mughal Miniature Paintings
        </h1>

        {/* Subtitle */}
        <p className={`text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed ${
          isNight ? 'text-[#a2a9b8]' : 'text-[#565044]'
        }`}>
          Upload an Indian miniature painting to evaluate its authenticity. 
          Our dual-branch multi-head neural network and multimodal LLM judge analyze delicate 
          brushwork, mineral pigments, iconographic motifs, and historical provenance.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
          
          <div className={`p-4 rounded-xl transition-all duration-300 ${
            isNight 
              ? 'bg-[#14161f] border border-[#2b2e3e] shadow-[0_4px_20px_rgba(0,0,0,0.3)]' 
              : 'bg-white border border-[#e6dece] shadow-sm'
          }`}>
            <div className="flex items-center justify-center mb-1.5">
              <ShieldCheck className={`w-5 h-5 ${isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'}`} />
            </div>
            <div className={`text-2xl font-black font-regal ${isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'}`}>
              {stats?.heads?.school?.accuracy || '90.5'}%
            </div>
            <div className={`text-[11px] font-medium uppercase tracking-wider ${isNight ? 'text-[#8b92a4]' : 'text-[#777063]'}`}>
              School Accuracy
            </div>
          </div>

          <div className={`p-4 rounded-xl transition-all duration-300 ${
            isNight 
              ? 'bg-[#14161f] border border-[#2b2e3e] shadow-[0_4px_20px_rgba(0,0,0,0.3)]' 
              : 'bg-white border border-[#e6dece] shadow-sm'
          }`}>
            <div className="flex items-center justify-center mb-1.5">
              <Award className={`w-5 h-5 ${isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'}`} />
            </div>
            <div className={`text-2xl font-black font-regal ${isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'}`}>
              {stats?.heads?.raga?.accuracy || '90.5'}%
            </div>
            <div className={`text-[11px] font-medium uppercase tracking-wider ${isNight ? 'text-[#8b92a4]' : 'text-[#777063]'}`}>
              Raga Identification
            </div>
          </div>

          <div className={`p-4 rounded-xl transition-all duration-300 ${
            isNight 
              ? 'bg-[#14161f] border border-[#2b2e3e] shadow-[0_4px_20px_rgba(0,0,0,0.3)]' 
              : 'bg-white border border-[#e6dece] shadow-sm'
          }`}>
            <div className="flex items-center justify-center mb-1.5">
              <Eye className={`w-5 h-5 ${isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'}`} />
            </div>
            <div className={`text-2xl font-black font-regal ${isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'}`}>
              {stats?.heads?.period?.accuracy || '66.1'}%
            </div>
            <div className={`text-[11px] font-medium uppercase tracking-wider ${isNight ? 'text-[#8b92a4]' : 'text-[#777063]'}`}>
              Period Attribution
            </div>
          </div>

          <div className={`p-4 rounded-xl transition-all duration-300 ${
            isNight 
              ? 'bg-[#14161f] border border-[#2b2e3e] shadow-[0_4px_20px_rgba(0,0,0,0.3)]' 
              : 'bg-white border border-[#e6dece] shadow-sm'
          }`}>
            <div className="flex items-center justify-center mb-1.5">
              <Brain className={`w-5 h-5 ${isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'}`} />
            </div>
            <div className={`text-2xl font-black font-regal ${isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'}`}>
              Calibrated
            </div>
            <div className={`text-[11px] font-medium uppercase tracking-wider ${isNight ? 'text-[#8b92a4]' : 'text-[#777063]'}`}>
              Qwen VLM Judge
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
