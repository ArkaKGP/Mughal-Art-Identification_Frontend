import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, BookOpen, History, Layers } from 'lucide-react';

export default function Navbar({ onOpenArchitecture, onOpenHistory, onOpenStats }) {
  const { isNight, toggleTheme } = useTheme();

  return (
    <nav className={`sticky top-0 z-40 transition-colors duration-300 backdrop-blur-md ${
      isNight 
        ? 'bg-[#0f1015]/90 border-b border-[#252836]' 
        : 'bg-[#ffffff]/90 border-b border-[#e6dece]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 ${
              isNight 
                ? 'bg-gradient-to-br from-[#d4af37] via-[#b8860b] to-[#8a6508] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                : 'bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-[#f4efe4] shadow-[0_4px_12px_rgba(27,67,50,0.2)]'
            }`}>
              <img src="/logo.png" alt="Mughal Auth AI" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className={`text-xl font-bold font-regal tracking-wide ${
                  isNight ? 'text-gold-gradient' : 'text-[#1b4332]'
                }`}>
                  MUGHAL-AUTH AI
                </span>
                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                  isNight 
                    ? 'bg-[#2b2413] text-[#ffd700] border border-[#d4af37]/40' 
                    : 'bg-[#eaf4ee] text-[#1b4332] border border-[#2d6a4f]/30'
                }`}>
                  ML & VLM
                </span>
              </div>
              <p className={`text-xs ${isNight ? 'text-[#8e95a5]' : 'text-[#6c675c]'}`}>
                Art Authentication & Multi-Modal Miniature Analysis
              </p>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-3">
            {/* Architecture Modal Button */}
            <button
              onClick={onOpenArchitecture}
              className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                isNight
                  ? 'bg-[#181a22] text-[#dcdfe7] hover:bg-[#232634] hover:text-[#ffd700] border border-[#2b2e3e]'
                  : 'bg-[#f4efe4] text-[#3c372e] hover:bg-[#eae3d5] hover:text-[#1b4332] border border-[#ded5c2]'
              }`}
              title="View Model & System Architecture"
            >
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Architecture</span>
            </button>

            {/* History Button */}
            <button
              onClick={onOpenHistory}
              className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                isNight
                  ? 'bg-[#181a22] text-[#dcdfe7] hover:bg-[#232634] hover:text-[#ffd700] border border-[#2b2e3e]'
                  : 'bg-[#f4efe4] text-[#3c372e] hover:bg-[#eae3d5] hover:text-[#1b4332] border border-[#ded5c2]'
              }`}
              title="View Previous Analyses"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </button>

            {/* Day / Night Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 shadow-sm ${
                isNight
                  ? 'bg-[#1e1c14] text-[#ffd700] border border-[#d4af37]/50 hover:bg-[#2a2618] shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                  : 'bg-[#eef5f0] text-[#1b4332] border border-[#2d6a4f]/30 hover:bg-[#e2ede5]'
              }`}
              title={`Switch to ${isNight ? 'Day (White/Wheat/Green)' : 'Night (Black/Golden)'} Theme`}
            >
              {isNight ? (
                <>
                  <Sun className="w-4 h-4 text-[#ffd700]" />
                  <span className="hidden md:inline">Day Theme</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#1b4332]" />
                  <span className="hidden md:inline">Night Theme</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
