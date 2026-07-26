import React, { useState, useEffect } from 'react';
import type { SortStep, FoodItem } from '../types/bubbleSort';
import { ExplainModal } from './ExplainModal';
import {
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  HelpCircle,
  Lock,
  Sparkles,
  Award,
  Star,
} from 'lucide-react';

interface StepVisualizerProps {
  steps: SortStep[];
  onComplete: () => void;
  onReset: () => void;
}

export const StepVisualizer: React.FC<StepVisualizerProps> = ({
  steps,
  onComplete,
  onReset,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(2000); // 2 seconds per step
  const [showExplainModal, setShowExplainModal] = useState(false);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      if (currentStepIndex < steps.length - 1) {
        timer = setTimeout(() => {
          setCurrentStepIndex((prev) => prev + 1);
        }, speed);
      } else {
        setIsPlaying(false);
        onComplete();
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, steps.length, speed, onComplete]);

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', padding: '16px' }}>
      {/* Top Navigation & Status Bar */}
      <div
        style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <button
          onClick={onReset}
          style={{
            background: '#EDF2F7',
            color: '#4A5568',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 16px',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <RotateCcw size={16} /> Edit Menu
        </button>

        {/* Pass Badge */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
            color: '#FFF',
            padding: '8px 20px',
            borderRadius: '20px',
            fontFamily: "'Fredoka', cursive, sans-serif",
            fontSize: '18px',
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Sparkles size={20} /> Pass #{currentStep.passNumber} — Step {currentStepIndex} / {steps.length - 1}
        </div>

        {/* Auto Play Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              background: isPlaying ? '#E53E3E' : '#38A169',
              color: '#FFF',
              border: 'none',
              borderRadius: '12px',
              padding: '10px 16px',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'Pause Auto' : 'Auto Play 🎬'}
          </button>
        </div>
      </div>

      {/* Visual Dining Table */}
      <div
        style={{
          background: 'linear-gradient(180deg, #FFF9F0 0%, #FFEEDD 100%)',
          borderRadius: '28px',
          padding: '36px 12px 20px 12px',
          boxShadow: '0 20px 40px rgba(218, 124, 43, 0.15)',
          border: '4px solid #F6AD55',
          marginBottom: '28px',
          position: 'relative',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            fontFamily: "'Fredoka', cursive, sans-serif",
            fontSize: '20px',
            color: '#DD6B20',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          🍽️ The Dining Table (Arranging Left ➔ Right)
        </div>

        {/* Plates Grid */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-end',
            gap: '8px',
            flexWrap: 'nowrap',
            width: '100%',
            minHeight: '220px',
            boxSizing: 'border-box',
          }}
        >
          {currentStep.dishes.map((dish, idx) => {
            const isCompared =
              currentStep.comparedIndices &&
              currentStep.comparedIndices.includes(idx);

            const isLeftCompared =
              currentStep.comparedIndices && currentStep.comparedIndices[0] === idx;
            const isRightCompared =
              currentStep.comparedIndices && currentStep.comparedIndices[1] === idx;

            const isLocked = currentStep.lockedIndices.includes(idx);

            return (
              <div
                key={`${dish.id}-${idx}`}
                style={{
                  flex: '1 1 0px',
                  maxWidth: '160px',
                  minWidth: '95px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  transform: isCompared ? 'translateY(-14px) scale(1.04)' : 'translateY(0)',
                }}
              >
                {/* Hand Pointers for Compared Neighbors */}
                {isLeftCompared && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-42px',
                      background: '#FF6B6B',
                      color: '#FFF',
                      padding: '3px 8px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontFamily: "'Fredoka', cursive, sans-serif",
                      fontWeight: 700,
                      boxShadow: '0 4px 8px rgba(255, 107, 107, 0.4)',
                      animation: 'bounce 1s infinite',
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                    }}
                  >
                    🖐️ Hand 1
                  </div>
                )}
                {isRightCompared && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-42px',
                      background: '#4ECDC4',
                      color: '#FFF',
                      padding: '3px 8px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontFamily: "'Fredoka', cursive, sans-serif",
                      fontWeight: 700,
                      boxShadow: '0 4px 8px rgba(78, 205, 196, 0.4)',
                      animation: 'bounce 1s infinite',
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                    }}
                  >
                    🖐️ Hand 2
                  </div>
                )}

                {/* Plate Container */}
                <div
                  style={{
                    width: '100%',
                    height: '145px',
                    background: isLocked
                      ? '#FEFCBF'
                      : isCompared
                      ? currentStep.swapped
                        ? '#FFE3E3'
                        : '#E6FFFA'
                      : '#FFFFFF',
                    borderRadius: '20px',
                    border: isLocked
                      ? '3px solid #D69E2E'
                      : isCompared
                      ? currentStep.swapped
                        ? '3px solid #E53E3E'
                        : '3px solid #319795'
                      : '2px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 6px',
                    boxShadow: isCompared
                      ? '0 12px 24px rgba(0, 0, 0, 0.15)'
                      : '0 4px 12px rgba(0, 0, 0, 0.05)',
                    position: 'relative',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Locked Badge */}
                  {isLocked && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        background: '#D69E2E',
                        color: '#FFF',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      title="Locked in final sorted position!"
                    >
                      <Lock size={12} />
                    </div>
                  )}

                  {/* Food Emoji */}
                  <div style={{ fontSize: '34px', marginBottom: '4px' }}>{dish.emoji}</div>

                  {/* Food Name */}
                  <div
                    style={{
                      fontFamily: "'Fredoka', cursive, sans-serif",
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#2D3748',
                      textAlign: 'center',
                      lineHeight: 1.1,
                      marginBottom: '6px',
                      wordBreak: 'break-word',
                      maxHeight: '28px',
                      overflow: 'hidden',
                    }}
                  >
                    {dish.name}
                  </div>

                  {/* Star Rating Badge */}
                  <div
                    style={{
                      background: isLocked ? '#D69E2E' : '#ED8936',
                      color: '#FFF',
                      borderRadius: '10px',
                      padding: '2px 6px',
                      fontSize: '12px',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                    }}
                  >
                    {dish.rating} <Star size={11} fill="#FFF" color="#FFF" />
                  </div>
                </div>

                {/* Plate Base */}
                <div
                  style={{
                    width: '80%',
                    height: '8px',
                    background: 'rgba(0, 0, 0, 0.08)',
                    borderRadius: '50%',
                    marginTop: '4px',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanation Story Card */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
          border: '3px solid #E2E8F0',
          marginBottom: '28px',
        }}
      >
        <div
          style={{
            fontFamily: "'Fredoka', cursive, sans-serif",
            fontSize: '20px',
            color: currentStepIndex === 0 ? '#DD6B20' : '#319795',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {currentStepIndex === 0 ? (
            <>📖 The Foodie Story: Why Left-to-Right & Right Swapping?</>
          ) : (
            <>
              <Award size={22} /> What is happening at this step?
            </>
          )}
        </div>

        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '18px',
            lineHeight: 1.6,
            color: '#2D3748',
            margin: '0 0 20px 0',
            whiteSpace: 'pre-line',
          }}
        >
          {currentStep.explanation}
        </div>

        {/* Action Controls & Kid Comprehension Checkpoint */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#F7FAFC',
            padding: '16px',
            borderRadius: '16px',
            border: '2px dashed #CBD5E0',
          }}
        >
          {/* Back Step */}
          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            style={{
              background: currentStepIndex === 0 ? '#E2E8F0' : '#EDF2F7',
              color: currentStepIndex === 0 ? '#A0AEC0' : '#4A5568',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 20px',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ChevronLeft size={20} /> Back
          </button>

          {/* Explain Step Again Button */}
          <button
            onClick={() => setShowExplainModal(true)}
            style={{
              background: '#FEFCBF',
              color: '#9B6D00',
              border: '2px solid #D69E2E',
              borderRadius: '14px',
              padding: '12px 20px',
              fontFamily: "'Fredoka', cursive, sans-serif",
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(214, 158, 46, 0.2)',
            }}
          >
            <HelpCircle size={20} /> Explain This Step Again! 🤔
          </button>

          {/* Dynamic Next Step / Switch Places Button */}
          <button
            onClick={handleNextStep}
            style={{
              background:
                currentStep.actionType === 'compare-swap'
                  ? 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)'
                  : 'linear-gradient(135deg, #48BB78 0%, #38A169 100%)',
              color: '#FFF',
              border: 'none',
              borderRadius: '14px',
              padding: '12px 24px',
              fontFamily: "'Fredoka', cursive, sans-serif",
              fontSize: '18px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow:
                currentStep.actionType === 'compare-swap'
                  ? '0 6px 16px rgba(255, 107, 107, 0.4)'
                  : '0 6px 16px rgba(72, 187, 120, 0.4)',
              transform: currentStep.actionType === 'compare-swap' ? 'scale(1.04)' : 'scale(1)',
              transition: 'all 0.2s ease',
            }}
          >
            {currentStep.buttonText ||
              (currentStepIndex === steps.length - 1
                ? 'Finish Adventure! 🎉'
                : 'Next Pair 🚀')}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Modal for "Explain Again" */}
      {showExplainModal && (
        <ExplainModal
          step={currentStep}
          onClose={() => setShowExplainModal(false)}
        />
      )}
    </div>
  );
};
