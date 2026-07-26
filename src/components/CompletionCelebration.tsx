import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import type { FoodItem } from '../types/bubbleSort';
import { Trophy, Sparkles, RotateCcw, CheckCircle2, HelpCircle, Star } from 'lucide-react';

interface CompletionCelebrationProps {
  finalDishes: FoodItem[];
  onRestart: () => void;
}

export const CompletionCelebration: React.FC<CompletionCelebrationProps> = ({
  finalDishes,
  onRestart,
}) => {
  const [practiceMode, setPracticeMode] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  useEffect(() => {
    // Trigger celebratory confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });

    const interval = setInterval(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleQuizAnswer = (userSaysSwap: boolean) => {
    // Sample practice pair: Dish A (9⭐) vs Dish B (6⭐) -> Should swap!
    const correctSwap = true; 
    setQuizAnswered(true);
    if (userSaysSwap === correctSwap) {
      setQuizScore((prev) => prev + 1);
      setQuizResult('🎉 CORRECT! 9⭐ is bigger than 6⭐, so we MUST SWAP them!');
      confetti({ particleCount: 60, spread: 60 });
    } else {
      setQuizResult('❌ Oops! Remember Rule #1: If the left dish (9⭐) is bigger than the right dish (6⭐), you MUST SWAP!');
    }
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '20px' }}>
      {/* Victory Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #F6D365 0%, #FDA085 100%)',
          borderRadius: '28px',
          padding: '36px 24px',
          color: '#FFF',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(253, 160, 133, 0.4)',
          marginBottom: '32px',
        }}
      >
        <div style={{ fontSize: '64px', marginBottom: '8px' }}>🏆 🫧 🎉</div>
        <h1
          style={{
            fontFamily: "'Fredoka', cursive, sans-serif",
            fontSize: '38px',
            margin: '0 0 12px 0',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          YOU ARE A BUBBLE SORT MASTER!
        </h1>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '20px',
            maxWidth: '600px',
            margin: '0 auto',
            opacity: 0.95,
          }}
        >
          You successfully sorted all the food dishes on your dining table from <strong>Least Tasty</strong> to <strong>Most Tasty</strong>!
        </p>
      </div>

      {/* Sorted Menu Showcase */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '28px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
          border: '3px solid #F6AD55',
          marginBottom: '32px',
        }}
      >
        <h2
          style={{
            fontFamily: "'Fredoka', cursive, sans-serif",
            fontSize: '22px',
            color: '#DD6B20',
            textAlign: 'center',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Sparkles size={24} /> Your Perfect Sorted Dining Menu!
        </h2>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'nowrap',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {finalDishes.map((dish, idx) => (
            <div
              key={dish.id}
              style={{
                flex: '1 1 0px',
                maxWidth: '145px',
                minWidth: '85px',
                background: '#FEFCBF',
                border: '3px solid #D69E2E',
                borderRadius: '20px',
                padding: '12px 6px',
                textAlign: 'center',
                boxShadow: '0 6px 16px rgba(214, 158, 46, 0.2)',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '4px' }}>{dish.emoji}</div>
              <div
                style={{
                  fontFamily: "'Fredoka', cursive, sans-serif",
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#2D3748',
                }}
              >
                {dish.name}
              </div>
              <div
                style={{
                  background: '#D69E2E',
                  color: '#FFF',
                  borderRadius: '12px',
                  padding: '2px 8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginTop: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {dish.rating} <Star size={12} fill="#FFF" color="#FFF" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Sandbox Section */}
      {!practiceMode ? (
        <div
          style={{
            background: '#F7FAFC',
            borderRadius: '24px',
            padding: '28px',
            border: '2px dashed #4ECDC4',
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          <h3
            style={{
              fontFamily: "'Fredoka', cursive, sans-serif",
              fontSize: '24px',
              color: '#319795',
              margin: '0 0 12px 0',
            }}
          >
            Want to test your knowledge with a 1-Question Quick Quiz? 🎯
          </h3>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '16px', color: '#4A5568', marginBottom: '20px' }}>
            Prove you are a true Bubble Sort Master by predicting a swap!
          </p>
          <button
            onClick={() => setPracticeMode(true)}
            style={{
              background: '#4ECDC4',
              color: '#FFF',
              border: 'none',
              borderRadius: '16px',
              padding: '14px 32px',
              fontFamily: "'Fredoka', cursive, sans-serif",
              fontSize: '18px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(78, 205, 196, 0.4)',
            }}
          >
            Start Quick Quiz 🎯
          </button>
        </div>
      ) : (
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            border: '3px solid #4ECDC4',
            marginBottom: '32px',
          }}
        >
          <h3
            style={{
              fontFamily: "'Fredoka', cursive, sans-serif",
              fontSize: '22px',
              color: '#319795',
              margin: '0 0 16px 0',
              textAlign: 'center',
            }}
          >
            🎯 Bubble Sort Master Practice Question!
          </h3>

          <p style={{ textAlign: 'center', fontSize: '18px', fontFamily: "'Outfit', sans-serif", marginBottom: '20px' }}>
            Look at these 2 neighbor plates on the table:
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '24px' }}>
            <div style={{ background: '#FFF5F5', padding: '16px 24px', borderRadius: '16px', border: '2px solid #E53E3E', textAlign: 'center' }}>
              <div style={{ fontSize: '36px' }}>🍕</div>
              <div style={{ fontWeight: 700 }}>Pizza</div>
              <div style={{ color: '#E53E3E', fontWeight: 700 }}>9 Stars ⭐</div>
            </div>

            <div style={{ fontSize: '32px', alignSelf: 'center' }}>VS</div>

            <div style={{ background: '#F0FFF4', padding: '16px 24px', borderRadius: '16px', border: '2px solid #38A169', textAlign: 'center' }}>
              <div style={{ fontSize: '36px' }}>🥟</div>
              <div style={{ fontWeight: 700 }}>Samosa</div>
              <div style={{ color: '#38A169', fontWeight: 700 }}>6 Stars ⭐</div>
            </div>
          </div>

          <p style={{ textAlign: 'center', fontWeight: 600, fontSize: '17px', color: '#2D3748', marginBottom: '16px' }}>
            Should we SWAP these two dishes?
          </p>

          {!quizAnswered ? (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button
                onClick={() => handleQuizAnswer(true)}
                style={{
                  background: '#38A169',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 28px',
                  fontSize: '16px',
                  fontFamily: "'Fredoka', cursive, sans-serif",
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                YES, SWAP THEM! 🔀
              </button>
              <button
                onClick={() => handleQuizAnswer(false)}
                style={{
                  background: '#E53E3E',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 28px',
                  fontSize: '16px',
                  fontFamily: "'Fredoka', cursive, sans-serif",
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                NO, KEEP THEM! ✋
              </button>
            </div>
          ) : (
            <div
              style={{
                background: '#F7FAFC',
                borderRadius: '16px',
                padding: '16px',
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: 600,
                color: '#2D3748',
              }}
            >
              {quizResult}
            </div>
          )}
        </div>
      )}

      {/* Restart Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onRestart}
          style={{
            background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
            color: '#FFF',
            border: 'none',
            borderRadius: '20px',
            padding: '16px 40px',
            fontSize: '20px',
            fontFamily: "'Fredoka', cursive, sans-serif",
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 10px 24px rgba(255, 107, 107, 0.4)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <RotateCcw size={22} /> Start New Adventure with Different Foods! 🍔
        </button>
      </div>
    </div>
  );
};
