import React from 'react';
import type { SortStep } from '../types/bubbleSort';
import { HelpCircle, CheckCircle2, Lightbulb, X } from 'lucide-react';

interface ExplainModalProps {
  step: SortStep;
  onClose: () => void;
}

export const ExplainModal: React.FC<ExplainModalProps> = ({ step, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '32px',
          maxWidth: '560px',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '4px solid #4ECDC4',
          position: 'relative',
          animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#EDF2F7',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#4A5568',
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: '#E6FFFA', borderRadius: '14px', padding: '10px', display: 'flex' }}>
            <HelpCircle color="#319795" size={28} />
          </div>
          <h3
            style={{
              fontFamily: "'Fredoka', cursive, sans-serif",
              fontSize: '24px',
              color: '#2D3748',
              margin: 0,
            }}
          >
            Why did this step happen? 🤔
          </h3>
        </div>

        <div
          style={{
            background: step.swapped ? '#FFF5F5' : '#F0FFF4',
            borderLeft: step.swapped ? '6px solid #E53E3E' : '6px solid #38A169',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            fontSize: '16px',
            lineHeight: 1.6,
            color: '#2D3748',
            fontFamily: "'Outfit', sans-serif",
            whiteSpace: 'pre-line',
          }}
        >
          {step.detailedReason}
        </div>

        {/* 3 Golden Rules Card */}
        <div
          style={{
            background: '#F7FAFC',
            borderRadius: '16px',
            padding: '16px',
            border: '1px solid #E2E8F0',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              fontFamily: "'Fredoka', cursive, sans-serif",
              fontSize: '16px',
              color: '#DD6B20',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '10px',
            }}
          >
            <Lightbulb size={20} /> 3 Easy Game Rules:
          </div>

          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '15px', color: '#4A5568', lineHeight: 1.6 }}>
            <li><strong>🤝 Sirf 2 Neighbors:</strong> Hum beech se random plate nahi uthate! Hamesha 2 side-by-side neighbors check karte hain!</li>
            <li><strong>🍨 Yummy Slide:</strong> Hand 1 (Left) par zyada tasty food hoga toh wo Right side me move ho jayega!</li>
            <li><strong>🛑 Finish Line:</strong> Jab ek poori round me 0 plates badalni padengi (0 changes), tab game finish!</li>
          </ul>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            background: '#4ECDC4',
            color: '#FFF',
            border: 'none',
            borderRadius: '14px',
            padding: '14px',
            fontSize: '18px',
            fontFamily: "'Fredoka', cursive, sans-serif",
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 8px 16px rgba(78, 205, 196, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <CheckCircle2 size={22} /> Got It! Keep Playing 🚀
        </button>
      </div>
    </div>
  );
};
