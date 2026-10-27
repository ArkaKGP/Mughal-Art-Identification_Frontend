import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { X, Layers, Cpu, ShieldCheck, Database, Brain, Sparkles, RefreshCw } from 'lucide-react';

export default function ArchitectureModal({ isOpen, onClose }) {
  const { isNight } = useTheme();

  if (!isOpen) return null;

  const phases = [
    {
      step: '01',
      title: 'Resolution Preservation & Sliding Windows',
      desc: 'Paintings are never blindly downscaled. Preprocessing applies 512×512 overlapping windows (50% stride) with unsharp masking and Lab color normalization.',
      icon: Layers
    },
    {
      step: '02',
      title: 'YOLO-World Open-Vocabulary Motif Detection',
      desc: 'Detects 9,609 visual motifs (courtiers, turbans 96% recall, pavilions 95% recall, horses) with open-vocabulary text embeddings.',
      icon: Cpu
    },
    {
      step: '03',
      title: 'Dual-Branch Feature Fusion (2,262-d)',
      desc: 'Fuses Frozen Global ViT-B/16 embeddings (768-d), Mean-Pooled Region Crop embeddings (768-d), and Handcrafted Descriptors (726-d: Gold leaf index, Lac red, GLCM, LBP, and Composition).',
      icon: Database
    },
    {
      step: '04',
      title: 'Multi-Head Neural Classifier Trunk',
      desc: 'A shared LayerNorm + GELU trunk branching into 4 specialized task heads: School (Mughal vs Rajasthani vs Pahari), Period (6 epochs), Raga (4 classes), and Artist attribution.',
      icon: Sparkles
    },
    {
      step: '05',
      title: 'Temperature Scaling Calibration',
      desc: 'Post-hoc bounded temperature optimization calibrates raw softmax logits so predicted probabilities faithfully match true accuracy (e.g. 70% confidence equals ~70% precision).',
      icon: ShieldCheck
    },
    {
      step: '06',
      title: 'Multimodal LLM Connoisseur Judge',
      desc: 'Qwen 2.5-VL 7B (via Ollama) synthesizes art-historical explanations grounded by Sanskrit Dhyana verses, detecting stylistic nuances and cross-checking classifier predictions.',
      icon: Brain
    },
    {
      step: '07',
      title: 'Human-in-the-Loop Active Retraining',
      desc: 'Cases with confidence below 70% or classifier-VLM disagreements are routed to human experts. Feedback updates model memory and active retraining loops.',
      icon: RefreshCw
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-2xl relative ${
        isNight
          ? 'bg-[#12141e] border border-[#2d3144] text-[#f5f6f8]'
          : 'bg-white border border-[#e6dece] text-[#1c1d21]'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/10 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className={`p-2.5 rounded-xl ${
            isNight ? 'bg-[#2a2414] text-[#ffd700]' : 'bg-[#eaf4ee] text-[#1b4332]'
          }`}>
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`text-xl sm:text-2xl font-bold font-regal ${
              isNight ? 'text-gold-gradient' : 'text-[#1b4332]'
            }`}>
              Mughal Art Authentication Architecture
            </h3>
            <p className="text-xs text-gray-400">
              End-to-End System Workflow (Sliding Windows · ViT Deep Embeddings · Multi-Head · Qwen VLM)
            </p>
          </div>
        </div>

        {/* Pipeline Phases List */}
        <div className="space-y-3.5 mb-6">
          {phases.map((phase) => {
            const Icon = phase.icon;
            return (
              <div
                key={phase.step}
                className={`p-4 rounded-xl flex items-start space-x-3.5 transition-colors ${
                  isNight ? 'bg-[#181a26] border border-[#262a3c]' : 'bg-[#faf8f4] border border-[#eee4d4]'
                }`}
              >
                <div className={`p-2 rounded-lg flex-shrink-0 text-xs font-black font-regal ${
                  isNight ? 'bg-[#242217] text-[#ffd700]' : 'bg-[#eef5f0] text-[#1b4332]'
                }`}>
                  {phase.step}
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon className={`w-4 h-4 ${isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'}`} />
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${
                      isNight ? 'text-[#f5f6f8]' : 'text-[#1c1d21]'
                    }`}>
                      {phase.title}
                    </h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isNight ? 'text-[#a2a9b8]' : 'text-[#5d5648]'}`}>
                    {phase.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className={`p-3.5 rounded-xl text-center text-xs ${
          isNight ? 'bg-[#1a1c29] text-[#8e95a5]' : 'bg-[#f4efe4] text-[#6c675c]'
        }`}>
          Trained on 564 authentic Indian miniature paintings with leak-free album-grouped cross validation.
        </div>

      </div>
    </div>
  );
}
