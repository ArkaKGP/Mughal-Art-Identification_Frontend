import React, { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { UploadCloud, Image as ImageIcon, X, Loader2, Sparkles, AlertCircle } from 'lucide-react';

export default function ImageUploader({ onAnalyze, isAnalyzing, selectedImage, setSelectedImage }) {
  const { isNight } = useTheme();
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (file) => {
    setErrorMsg(null);
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Please upload a valid painting image (JPEG, PNG, or WebP).');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setErrorMsg('File size exceeds the 25 MB limit.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setSelectedImage({
      file,
      previewUrl,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const clearSelection = () => {
    setSelectedImage(null);
    setErrorMsg(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-10">
      
      {/* Upload Box Container */}
      <div className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 shadow-md ${
        isNight 
          ? 'bg-[#12141c] border border-[#2b2e3e] shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-white border border-[#e6dece] shadow-[0_4px_20px_rgba(27,67,50,0.06)]'
      }`}>
        
        {/* Error alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {!selectedImage ? (
          /* Dropzone */
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
              dragActive
                ? isNight
                  ? 'border-[#ffd700] bg-[#ffd700]/10'
                  : 'border-[#1b4332] bg-[#1b4332]/5'
                : isNight
                ? 'border-[#33384a] hover:border-[#d4af37]/60 bg-[#161822]/60 hover:bg-[#1a1d2a]'
                : 'border-[#d8cfbe] hover:border-[#1b4332]/60 bg-[#faf8f4] hover:bg-[#f3ede1]'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleChange}
              className="hidden"
            />

            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
              isNight
                ? 'bg-[#242116] text-[#ffd700] border border-[#d4af37]/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                : 'bg-[#eaf3ed] text-[#1b4332] border border-[#2d6a4f]/20'
            }`}>
              <UploadCloud className="w-8 h-8" />
            </div>

            <h3 className={`text-lg font-bold font-regal mb-1 ${
              isNight ? 'text-[#f5f6f8]' : 'text-[#1c1d21]'
            }`}>
              Upload Painting for Authentication
            </h3>
            
            <p className={`text-xs sm:text-sm mb-4 ${
              isNight ? 'text-[#9299a9]' : 'text-[#6c675c]'
            }`}>
              Drag and drop your high-resolution painting here, or <span className={`font-semibold underline ${isNight ? 'text-[#ffd700]' : 'text-[#1b4332]'}`}>browse files</span>
            </p>

            <div className="flex items-center justify-center space-x-2 text-[11px] uppercase tracking-wider text-[#9ba2b3]">
              <span>JPG</span>
              <span>•</span>
              <span>PNG</span>
              <span>•</span>
              <span>WEBP</span>
              <span>•</span>
              <span>Up to 25 MB</span>
            </div>
          </div>
        ) : (
          /* Preview State */
          <div>
            <div className="relative rounded-xl overflow-hidden mb-6 bg-black/10 flex items-center justify-center max-h-[420px]">
              <img
                src={selectedImage.previewUrl}
                alt="Selected Miniature"
                className="max-h-[400px] w-auto object-contain rounded-lg shadow-lg"
              />

              {!isAnalyzing && (
                <button
                  onClick={clearSelection}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-all duration-200 shadow-md"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* File Details bar */}
            <div className={`flex items-center justify-between p-3 rounded-lg mb-6 text-xs ${
              isNight ? 'bg-[#181a24] text-[#a4abbd]' : 'bg-[#f4efe4] text-[#554f43]'
            }`}>
              <div className="flex items-center space-x-2 truncate">
                <ImageIcon className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium truncate">{selectedImage.name}</span>
              </div>
              <span className="font-semibold ml-2">{selectedImage.size}</span>
            </div>

            {/* Action Button */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onAnalyze(selectedImage.file)}
                disabled={isAnalyzing}
                className={`flex-1 py-3.5 px-6 rounded-xl font-bold tracking-wide text-sm flex items-center justify-center space-x-2 shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isNight
                    ? 'bg-gradient-to-r from-[#ffd700] via-[#d4af37] to-[#b8860b] text-black hover:brightness-110 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'bg-[#1b4332] hover:bg-[#2d6a4f] text-[#f4efe4] shadow-[0_6px_20px_rgba(27,67,50,0.25)]'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Miniature Features...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Run Authentication Model</span>
                  </>
                )}
              </button>

              {!isAnalyzing && (
                <button
                  onClick={clearSelection}
                  className={`py-3.5 px-5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isNight
                      ? 'bg-[#1c1f2b] text-[#c4cad7] hover:bg-[#26293a]'
                      : 'bg-[#f4efe4] text-[#4d473b] hover:bg-[#eae3d5]'
                  }`}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
