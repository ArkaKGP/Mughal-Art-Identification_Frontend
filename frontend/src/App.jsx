import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ImageUploader from './components/ImageUploader';
import SampleGallery from './components/SampleGallery';
import VerdictBanner from './components/VerdictBanner';
import MultiHeadCards from './components/MultiHeadCards';
import ArtHistorianReasoning from './components/ArtHistorianReasoning';
import VisualFeaturesCard from './components/VisualFeaturesCard';
import ExpertReviewModal from './components/ExpertReviewModal';
import ArchitectureModal from './components/ArchitectureModal';
import HistoryDrawer from './components/HistoryDrawer';

import {
  uploadAndAnalyzeImage,
  analyzeSamplePainting,
  fetchSamplePaintings,
  fetchPipelineStats
} from './services/api';

function MainApp() {
  const { isNight } = useTheme();

  const [samples, setSamples] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Modals
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const resultsRef = useRef(null);

  // Initial load
  useEffect(() => {
    fetchSamplePaintings()
      .then(data => setSamples(data.samples || []))
      .catch(err => console.error('Error fetching samples:', err));

    fetchPipelineStats()
      .then(data => setStats(data))
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  // Handle uploaded file
  const handleAnalyzeUpload = async (file) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setErrorMessage(null);
    try {
      const data = await uploadAndAnalyzeImage(file);
      setAnalysisResult(data);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle sample selection
  const handleSelectSample = async (sample) => {
    setSelectedImage({
      previewUrl: sample.imageUrl,
      name: sample.title,
      size: 'Dataset Painting'
    });
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setErrorMessage(null);

    try {
      const data = await analyzeSamplePainting(sample.filename);
      setAnalysisResult(data);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isNight ? 'bg-[#0b0c10] text-[#f5f6f8]' : 'bg-[#faf8f4] text-[#1c1d21]'
    }`}>
      
      {/* Navigation */}
      <Navbar
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Hero Section */}
        <HeroSection stats={stats} />

        {/* Upload Interface */}
        <ImageUploader
          onAnalyze={handleAnalyzeUpload}
          isAnalyzing={isAnalyzing}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        {/* Explicit Model Error Banner */}
        {errorMessage && (
          <div className="max-w-4xl mx-auto my-6 p-5 rounded-2xl bg-red-950/40 border-2 border-red-500/80 text-red-200 shadow-xl flex items-start space-x-3 animate-fadeIn">
            <span className="text-2xl flex-shrink-0">⚠️</span>
            <div>
              <h4 className="font-bold text-red-100 text-sm sm:text-base">Machine Learning Model Runtime Notice</h4>
              <p className="text-xs sm:text-sm mt-1 text-red-300 leading-relaxed">
                The model could not process this request: {errorMessage}
              </p>
              <p className="text-[11px] text-red-400/80 mt-2">
                Tip: When the backend or Python ML environment is offline or experiencing dependency issues, predictions are withheld to prevent fabricated or inaccurate results.
              </p>
            </div>
          </div>
        )}

        {/* Results Display Section */}
        {analysisResult && (
          <div ref={resultsRef} className="pt-6 animate-fadeIn">
            
            {/* Primary YES/NO Verdict Banner */}
            <VerdictBanner
              result={analysisResult}
              onOpenReview={() => setIsReviewOpen(true)}
            />

            {/* 4 Multi-Head Cards */}
            <MultiHeadCards result={analysisResult} />

            {/* Multimodal LLM Grounded Reasoning */}
            <ArtHistorianReasoning reasoning={analysisResult.llm_reasoning} />

            {/* Handcrafted Visual Features & Motifs */}
            <VisualFeaturesCard
              features={analysisResult.visual_features}
              motifs={analysisResult.detected_motifs}
            />

          </div>
        )}

        {/* Benchmark Sample Gallery */}
        <SampleGallery
          samples={samples}
          onSelectSample={handleSelectSample}
          isAnalyzing={isAnalyzing}
        />

      </main>

      {/* Footer */}
      <footer className={`border-t transition-colors duration-300 py-10 text-center text-xs ${
        isNight
          ? 'bg-[#0e0f14] border-[#222533] text-[#787f92]'
          : 'bg-[#f4efe4] border-[#e6dece] text-[#6c675c]'
      }`}>
        <div className="max-w-4xl mx-auto px-4">
          <p className="font-regal font-bold text-sm mb-1 tracking-wider">
            Bachelors Project: Indian Miniature Painting Authentication & Ragamala Analysis
          </p>
          <p className="mb-3">
            Multi-Head ViT Backbone · YOLO-World Motif Detection · Temperature Calibration · Qwen 2.5-VL Multimodal Judge
          </p>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[11px] font-semibold opacity-75">
            <span>Anushesh</span>
            <span>•</span>
            <span>Snigdha Ghosh</span>
            <span>•</span>
            <span>Arka Ghosh</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <ExpertReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        currentAnalysis={analysisResult}
        onFeedbackSubmitted={() => {}}
      />

      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectHistoryItem={(item) => {
          setSelectedImage({
            previewUrl: item.imageUrl,
            name: item.originalName || item.filename,
            size: 'Past Analysis'
          });
          setAnalysisResult(item);
          setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
