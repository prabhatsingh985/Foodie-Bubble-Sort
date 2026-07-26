import React, { useState } from 'react';
import type { FoodItem } from '../types/bubbleSort';
import { PRESET_FOODS } from '../types/bubbleSort';
import { Sparkles, Plus, Trash2, Shuffle, Play, Star } from 'lucide-react';

interface FoodSelectorProps {
  onStartSorting: (dishes: FoodItem[]) => void;
}

export const FoodSelector: React.FC<FoodSelectorProps> = ({ onStartSorting }) => {
  const [selectedDishes, setSelectedDishes] = useState<FoodItem[]>([
    PRESET_FOODS[0], // Samosa (6)
    PRESET_FOODS[1], // Chole Bhature (7)
    PRESET_FOODS[2], // Paneer (8)
    PRESET_FOODS[3], // Biryani (9)
    PRESET_FOODS[4], // Gulab Jamun (10)
  ]);

  const [customName, setCustomName] = useState('');
  const [customEmoji, setCustomEmoji] = useState('🍕');
  const [customRating, setCustomRating] = useState(5);
  const [showAddCustom, setShowAddCustom] = useState(false);

  const toggleSelectPreset = (food: FoodItem) => {
    const exists = selectedDishes.some((d) => d.id === food.id);
    if (exists) {
      if (selectedDishes.length <= 3) {
        alert('Please keep at least 3 food items on the dining table!');
        return;
      }
      setSelectedDishes(selectedDishes.filter((d) => d.id !== food.id));
    } else {
      if (selectedDishes.length >= 6) {
        alert('Max 6 food items allowed for easy kid viewing!');
        return;
      }
      setSelectedDishes([...selectedDishes, { ...food }]);
    }
  };

  const handleRatingChange = (id: string, newRating: number) => {
    setSelectedDishes(
      selectedDishes.map((d) => (d.id === id ? { ...d, rating: newRating } : d))
    );
  };

  const handleAddCustomFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    if (selectedDishes.length >= 6) {
      alert('Max 6 food items allowed!');
      return;
    }
    const newFood: FoodItem = {
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      emoji: customEmoji || '🍱',
      rating: customRating,
      isCustom: true,
    };
    setSelectedDishes([...selectedDishes, newFood]);
    setCustomName('');
    setShowAddCustom(false);
  };

  const handleShuffle = () => {
    const shuffled = [...selectedDishes].sort(() => Math.random() - 0.5);
    setSelectedDishes(shuffled);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
          borderRadius: '24px',
          padding: '32px 24px',
          color: '#FFF',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(255, 107, 107, 0.3)',
          marginBottom: '32px',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>🫧 🍔 🍨</div>
        <h1
          style={{
            fontFamily: "'Fredoka', cursive, sans-serif",
            fontSize: '36px',
            fontWeight: 700,
            margin: '0 0 12px 0',
          }}
        >
          Tasty Bubble Sort Adventure!
        </h1>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '18px',
            maxWidth: '600px',
            margin: '0 auto',
            opacity: 0.95,
            lineHeight: 1.5,
          }}
        >
          Pick your favorite dishes below, set their <strong>Tastiness Score (1-10 ⭐)</strong>, and let’s learn Bubble Sort together step-by-step!
        </p>
      </div>

      {/* Preset Foods Selector */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
          border: '3px solid #FFE3E3',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h2
            style={{
              fontFamily: "'Fredoka', cursive, sans-serif",
              fontSize: '22px',
              color: '#2C3E50',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Sparkles color="#FF6B6B" size={24} /> Step 1: Choose 3 to 6 Dishes
          </h2>

          <button
            onClick={() => setShowAddCustom(!showAddCustom)}
            style={{
              background: '#4ECDC4',
              color: '#FFF',
              border: 'none',
              borderRadius: '12px',
              padding: '8px 16px',
              fontSize: '14px',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(78, 205, 196, 0.3)',
            }}
          >
            <Plus size={18} /> {showAddCustom ? 'Cancel' : 'Add Custom Dish'}
          </button>
        </div>

        {/* Custom Dish Form */}
        {showAddCustom && (
          <form
            onSubmit={handleAddCustomFood}
            style={{
              background: '#F7F9FC',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '20px',
              border: '2px dashed #4ECDC4',
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <input
              type="text"
              placeholder="Dish Emoji (e.g. 🍕)"
              value={customEmoji}
              onChange={(e) => setCustomEmoji(e.target.value)}
              style={{ width: '60px', padding: '8px', borderRadius: '8px', border: '1px solid #CCC', fontSize: '20px', textAlign: 'center' }}
              maxLength={2}
            />
            <input
              type="text"
              placeholder="Dish Name (e.g. Mango Lassi)"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              style={{ flex: 1, minWidth: '160px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CCC', fontSize: '15px' }}
              required
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#555' }}>Score:</span>
              <input
                type="number"
                min={1}
                max={10}
                value={customRating}
                onChange={(e) => setCustomRating(Number(e.target.value))}
                style={{ width: '60px', padding: '8px', borderRadius: '8px', border: '1px solid #CCC', fontSize: '15px' }}
              />
              <span>⭐</span>
            </div>
            <button
              type="submit"
              style={{
                background: '#FF6B6B',
                color: '#FFF',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Add to Menu
            </button>
          </form>
        )}

        {/* Preset Items Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
          {PRESET_FOODS.map((food) => {
            const isSelected = selectedDishes.some((d) => d.id === food.id);
            return (
              <button
                key={food.id}
                onClick={() => toggleSelectPreset(food)}
                style={{
                  background: isSelected ? '#FFE8E8' : '#F8F9FA',
                  border: isSelected ? '3px solid #FF6B6B' : '2px solid #E9ECEF',
                  borderRadius: '16px',
                  padding: '12px 8px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                  boxShadow: isSelected ? '0 8px 16px rgba(255, 107, 107, 0.2)' : 'none',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '4px' }}>{food.emoji}</div>
                <div style={{ fontFamily: "'Fredoka', cursive, sans-serif", fontSize: '14px', fontWeight: 600, color: '#2C3E50' }}>
                  {food.name}
                </div>
                <div style={{ fontSize: '12px', color: isSelected ? '#FF6B6B' : '#888', marginTop: '4px', fontWeight: 600 }}>
                  {isSelected ? '✓ Selected' : '+ Add'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Dishes Table & Rating Sliders */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
          border: '3px solid #E2E8F0',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <h2
            style={{
              fontFamily: "'Fredoka', cursive, sans-serif",
              fontSize: '22px',
              color: '#2C3E50',
              margin: 0,
            }}
          >
            🍽️ Your Dining Table Menu ({selectedDishes.length} Items)
          </h2>

          <button
            onClick={handleShuffle}
            style={{
              background: '#ED8936',
              color: '#FFF',
              border: 'none',
              borderRadius: '12px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(237, 137, 54, 0.3)',
            }}
          >
            <Shuffle size={16} /> Shuffle Order 🔀
          </button>
        </div>

        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', color: '#666', marginTop: '-8px', marginBottom: '20px' }}>
          Adjust the <strong>Tastiness Score (1-10 ⭐)</strong> slider for each dish to see how Bubble Sort will rank them!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {selectedDishes.map((dish, idx) => (
            <div
              key={dish.id}
              style={{
                background: '#F7FAFC',
                borderRadius: '16px',
                padding: '16px',
                border: '2px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '32px' }}>{dish.emoji}</span>
                  <div>
                    <div style={{ fontFamily: "'Fredoka', cursive, sans-serif", fontSize: '16px', color: '#2D3748' }}>
                      {dish.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#A0AEC0' }}>Plate #{idx + 1}</div>
                  </div>
                </div>
                {dish.isCustom && (
                  <button
                    onClick={() => setSelectedDishes(selectedDishes.filter((d) => d.id !== dish.id))}
                    style={{ background: 'none', border: 'none', color: '#E53E3E', cursor: 'pointer' }}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              {/* Rating Control */}
              <div style={{ background: '#FFF', padding: '10px 14px', borderRadius: '12px', border: '1px solid #EDF2F7' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#4A5568' }}>Tastiness Score:</span>
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#DD6B20',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {dish.rating} <Star size={16} fill="#DD6B20" color="#DD6B20" />
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={dish.rating}
                  onChange={(e) => handleRatingChange(dish.id, Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#FF6B6B', cursor: 'pointer' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => onStartSorting(selectedDishes)}
          style={{
            background: 'linear-gradient(135deg, #48BB78 0%, #38A169 100%)',
            color: '#FFF',
            border: 'none',
            borderRadius: '20px',
            padding: '18px 48px',
            fontSize: '22px',
            fontFamily: "'Fredoka', cursive, sans-serif",
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 12px 28px rgba(72, 187, 120, 0.4)',
            transition: 'transform 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Play size={28} fill="#FFF" /> Start Bubble Sort Adventure! 🚀
        </button>
      </div>
    </div>
  );
};
