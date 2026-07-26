export interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  rating: number; // 1 to 10
  category?: string;
  isCustom?: boolean;
}

export interface SortStep {
  stepIndex: number;
  passNumber: number;
  dishes: FoodItem[];
  comparedIndices: [number, number] | null;
  swapped: boolean;
  explanation: string;
  detailedReason: string;
  lockedIndices: number[];
  isPassComplete: boolean;
  isFullySorted: boolean;
  passSwapsCount: number;
  actionType: 'intro' | 'compare-swap' | 'compare-keep' | 'swapped' | 'finish';
  buttonText: string;
}

export const PRESET_FOODS: FoodItem[] = [
  { id: '1', name: 'Samosa', emoji: '🥟', rating: 6, category: 'Street Food' },
  { id: '2', name: 'Chole Bhature', emoji: '🫓', rating: 7, category: 'Street Food' },
  { id: '3', name: 'Paneer Butter Masala', emoji: '🥘', rating: 8, category: 'Main Course' },
  { id: '4', name: 'Hyderabadi Biryani', emoji: '🍲', rating: 9, category: 'Main Course' },
  { id: '5', name: 'Hot Gulab Jamun', emoji: '🍯', rating: 10, category: 'Dessert' },
  { id: '6', name: 'Cheesy Pizza', emoji: '🍕', rating: 9, category: 'Fast Food' },
  { id: '7', name: 'Crispy French Fries', emoji: '🍟', rating: 6, category: 'Fast Food' },
  { id: '8', name: 'Chocolate Ice Cream', emoji: '🍨', rating: 10, category: 'Dessert' },
  { id: '9', name: 'Juicy Burger', emoji: '🍔', rating: 8, category: 'Fast Food' },
  { id: '10', name: 'Masala Dosa', emoji: '🥞', rating: 7, category: 'South Indian' },
];
