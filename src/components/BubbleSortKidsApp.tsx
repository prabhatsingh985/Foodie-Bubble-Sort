import React, { useState } from 'react';
import type { FoodItem, SortStep } from '../types/bubbleSort';
import { FoodSelector } from './FoodSelector';
import { StepVisualizer } from './StepVisualizer';
import { CompletionCelebration } from './CompletionCelebration';
import { generateBubbleSortSteps } from '../utils/bubbleSortEngine';

export const BubbleSortKidsApp: React.FC = () => {
  const [appState, setAppState] = useState<'selection' | 'guided' | 'celebration'>('selection');
  const [selectedDishes, setSelectedDishes] = useState<FoodItem[]>([]);
  const [sortSteps, setSortSteps] = useState<SortStep[]>([]);

  const handleStartSorting = (dishes: FoodItem[]) => {
    setSelectedDishes(dishes);
    const steps = generateBubbleSortSteps(dishes);
    setSortSteps(steps);
    setAppState('guided');
  };

  const handleVisualizerComplete = () => {
    setAppState('celebration');
  };

  const handleReset = () => {
    setAppState('selection');
  };

  const finalDishes = sortSteps.length > 0 ? sortSteps[sortSteps.length - 1].dishes : selectedDishes;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FAF8F5',
        color: '#2D3748',
        padding: '20px 10px',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {appState === 'selection' && (
        <FoodSelector onStartSorting={handleStartSorting} />
      )}

      {appState === 'guided' && (
        <StepVisualizer
          steps={sortSteps}
          onComplete={handleVisualizerComplete}
          onReset={handleReset}
        />
      )}

      {appState === 'celebration' && (
        <CompletionCelebration
          finalDishes={finalDishes}
          onRestart={handleReset}
        />
      )}
    </div>
  );
};
