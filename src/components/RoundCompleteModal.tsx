import React from 'react';
import { Award, ChevronRight, Sparkles } from 'lucide-react';

interface RoundCompleteModalProps {
  passNumber: number;
  lockedDishName: string;
  lockedDishRating: number;
  totalDishes: number;
  userName?: string;
  onContinue: () => void;
}

export const RoundCompleteModal: React.FC<RoundCompleteModalProps> = ({
  passNumber,
  lockedDishName,
  lockedDishRating,
  totalDishes,
  userName = 'Rohan',
  onContinue,
}) => {
  const maxPasses = totalDishes - 1;
  const isLastRound = passNumber >= maxPasses;
  const nextPassNumber = passNumber + 1;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
        animation: 'fadeIn 0.25s ease-out',
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '28px',
          maxWidth: '520px',
          width: '100%',
          padding: '32px 28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '4px solid #FFD166',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top Decorative Sparkles */}
        <div
          style={{
            display: 'flex',
            justify: 'center',
            alignItems: 'center',
            gap: '8px',
            color: '#D69E2E',
            fontSize: '15px',
            fontFamily: "'Fredoka', cursive, sans-serif",
            marginBottom: '12px',
          }}
        >
          <Sparkles size={20} color="#F6E05E" />
          <span>{isLastRound ? '🏆 GAME COMPLETE - ALL ROUNDS FINISHED!' : 'ROUND MILESTONE UNLOCKED!'}</span>
          <Sparkles size={20} color="#F6E05E" />
        </div>

        {/* Big Celebration Header */}
        <h2
          style={{
            fontFamily: "'Fredoka', cursive, sans-serif",
            fontSize: '28px',
            color: '#DD6B20',
            margin: '0 0 16px 0',
            lineHeight: 1.2,
          }}
        >
          {isLastRound ? (
            <>🎉 WOHOO! Saare {passNumber} Rounds Finish Ho Gaye! 🥳</>
          ) : (
            <>🎉 WOHOO! Round #{passNumber} Finish Ho Gaya! 🏆</>
          )}
        </h2>

        {/* 2 Cartoon Characters Celebrating */}
        <div
          style={{
            display: 'flex',
            justify: 'center',
            alignItems: 'center',
            gap: '20px',
            margin: '16px 0 24px 0',
          }}
        >
          <img
            src="/avatars/boy.png"
            alt={`${userName} Avatar`}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: '4px solid #4ECDC4',
              boxShadow: '0 6px 16px rgba(78, 205, 196, 0.4)',
            }}
          />
          <div
            style={{
              background: '#FFF5F5',
              border: '2px dashed #FEB2B2',
              borderRadius: '16px',
              padding: '8px 16px',
              fontFamily: "'Fredoka', cursive, sans-serif",
              fontSize: '18px',
              color: '#E53E3E',
            }}
          >
            {isLastRound ? 'Party Time! 🥳 🎉' : 'High Five! ✋ High Five! 🤚'}
          </div>
          <img
            src="/avatars/chef.png"
            alt="Chef Avatar"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: '4px solid #FFD166',
              boxShadow: '0 6px 16px rgba(255, 209, 102, 0.4)',
            }}
          />
        </div>

        {/* Milestone Detail Card */}
        <div
          style={{
            background: '#F7FAFC',
            border: '2px solid #E2E8F0',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '24px',
            textAlign: 'left',
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#2B6CB0',
              fontWeight: 700,
              fontSize: '17px',
              marginBottom: '10px',
            }}
          >
            <Award size={22} color="#3182CE" />
            <span>
              {isLastRound
                ? `🏆 Victory: Saari ${totalDishes} Dishes 100% Set!`
                : `🎯 Sahi Set: ${lockedDishName} (${lockedDishRating} ⭐)`}
            </span>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: '15px',
              lineHeight: 1.5,
              color: '#4A5568',
            }}
          >
            {isLastRound ? (
              <>
                Shabash <strong>{userName}</strong>! Total {passNumber} Rounds poore ho gaye hain aur saari {totalDishes} food plates apni Sahi Seat 🎯 par 100% Sahi Set ho gayi hain! Isiliye ab Bubble Sort Game complete ho gaya hai! Ab Party Feast enjoy karo! 😋 🎉
              </>
            ) : (
              <>
                Shabash <strong>{userName}</strong>! Round #{passNumber} finish hote hi <strong>{lockedDishName}</strong> apni VIP Sahi Seat 🪑 par 100% Sahi Set 🎯 ho gaya hai! Ab ise hilane ki bilkul zarurat nahi hai!
              </>
            )}
          </p>
        </div>

        {/* Main Action Button */}
        <button
          onClick={onContinue}
          style={{
            width: '100%',
            background: isLastRound
              ? 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)'
              : 'linear-gradient(135deg, #48BB78 0%, #38A169 100%)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '18px',
            padding: '16px 24px',
            fontFamily: "'Fredoka', cursive, sans-serif",
            fontSize: '20px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: isLastRound
              ? '0 8px 20px rgba(255, 107, 107, 0.4)'
              : '0 8px 20px rgba(72, 187, 120, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            transition: 'transform 0.15s ease',
          }}
        >
          {isLastRound ? (
            <>Party Feast Enjoy Karo! 🥳 🎉</>
          ) : (
            <>
              Chalo Round #{nextPassNumber} Shuru Karein! 🚀
              <ChevronRight size={24} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
