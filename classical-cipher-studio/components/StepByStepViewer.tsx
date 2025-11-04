'use client';

import { useState, useEffect } from 'react';
import { EncryptionStep } from '@/lib/types';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Zap } from 'lucide-react';

interface StepByStepViewerProps {
  steps: EncryptionStep[];
  title?: string;
}

export default function StepByStepViewer({ steps, title = 'Adım Adım Şifreleme' }: StepByStepViewerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000); // ms

  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) {
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  useEffect(() => {
    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [currentStep, steps.length]);

  if (!steps || steps.length === 0) {
    return null;
  }

  const step = steps[currentStep];

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    setIsPlaying(false);
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (currentStep >= steps.length - 1) {
      handleReset();
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="mt-6 bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-purple-500/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <div className="text-sm text-gray-400">
          Adım {currentStep + 1} / {steps.length}
        </div>
      </div>

      {/* Current Step Display */}
      <div className="mb-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-purple-300 font-semibold mb-2">
            {step.description}
          </div>
          
          {step.calculation && (
            <div className="font-mono text-sm text-green-400 bg-slate-950/50 p-3 rounded border border-green-500/20 mb-3">
              <span className="text-gray-400">Hesaplama:</span> {step.calculation}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Input:</div>
              <div className="font-mono text-lg text-white bg-slate-800 p-3 rounded border border-slate-600">
                {step.input || '-'}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Output:</div>
              <div className="font-mono text-lg text-purple-300 bg-slate-800 p-3 rounded border border-purple-500/30">
                {step.output || '-'}
              </div>
            </div>
          </div>

          {step.details && (
            <div className="mt-3 text-sm text-gray-400 italic">
              💡 {step.details}
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 transition-all duration-300 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            title="Başa Dön"
          >
            <RotateCcw className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Önceki"
          >
            <SkipBack className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={handlePlayPause}
            className="p-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            title={isPlaying ? 'Duraklat' : 'Oynat'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep >= steps.length - 1}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Sonraki"
          >
            <SkipForward className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Hız:</span>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="px-2 py-1 bg-slate-700 text-white text-sm rounded border border-slate-600"
          >
            <option value={2000}>0.5x (Yavaş)</option>
            <option value={1000}>1x (Normal)</option>
            <option value={500}>2x (Hızlı)</option>
            <option value={250}>4x (Çok Hızlı)</option>
          </select>
        </div>
      </div>

      {/* Step List (scrollable) */}
      <div className="mt-6">
        <div className="text-xs text-gray-400 mb-2 font-semibold">Tüm Adımlar:</div>
        <div className="max-h-48 overflow-y-auto space-y-1 bg-slate-900/30 rounded p-2 border border-slate-700">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentStep(idx);
                setIsPlaying(false);
              }}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                idx === currentStep
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700'
              }`}
            >
              <span className="font-semibold">#{idx + 1}</span> {s.description}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
