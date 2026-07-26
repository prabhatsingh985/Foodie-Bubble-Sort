import type { FoodItem, SortStep } from '../types/bubbleSort';

export function generateBubbleSortSteps(initialDishes: FoodItem[]): SortStep[] {
  const steps: SortStep[] = [];
  const items = initialDishes.map((d) => ({ ...d }));
  const n = items.length;
  const lockedIndices: number[] = [];
  let stepIndex = 0;

  const highestDish = [...initialDishes].sort((a, b) => b.rating - a.rating)[0];

  const getDishLabel = (dish: FoodItem) =>
    dish.imageUrl ? dish.name : `${dish.emoji || ''} ${dish.name}`.trim();

  // Step #0: Initial Intro Story Step
  steps.push({
    stepIndex: 0,
    passNumber: 1,
    dishes: items.map((d) => ({ ...d })),
    comparedIndices: null,
    swapped: false,
    explanation: `🎉 Chalo Magic Food Party Shuru Karein! 🍽️✨\n\nAaj humari table par bohot saari tasty dishes rakhi hain! Par ek choti si problem hai—saare khane aage-peeche mix ho gaye hain!\n\n👑 Humara Magic Mission:\nHum sabse kam stars waala khana pehle rakhenge, aur sabse ZYADA tasty khana (${getDishLabel(highestDish)} - ${highestDish.rating}⭐) sabse LAST me rakhenge taaki use party ke end me maze se khayein!\n\n🪄 Hum Game Kaise Khelengi? (3 Magic Rules):\n\n1. 🤝 Do Haath Rule: Hum ek baar me sirf 2 paas-paas waali neighbor plates check karenge!\n2. 👉 Zyada Star Waala Right Me: Agar Left hand waale khane me zyada Stars ⭐ hain, toh use Right side bhej denge!\n3. 🏆 Winner Trophy: Jab ek poore round me EK BHI plate hilani nahi padegi (matlab saara khana set ho gaya!), tab hum Game WIN kar jaayenge! 🎉`,
    detailedReason: `Game Kaise Khelna Hai?\n\n- Rule 1: Step-by-step 2 neighbor plates ko compare karo.\n- Rule 2: Agar Left plate zyada tasty hai, toh "Jagah Badal Do! 🔄" dabao.\n- Rule 3: Jab sabhi dishes Smallest Star se Biggest Star tak set ho jaayengi, tab game win! 🎉`,
    lockedIndices: [],
    isPassComplete: false,
    isFullySorted: false,
    passSwapsCount: 0,
    actionType: 'intro',
    buttonText: 'Game Shuru Karo! 🚀',
  });

  for (let i = 0; i < n - 1; i++) {
    const passNumber = i + 1;
    let passSwapsCount = 0;

    for (let j = 0; j < n - i - 1; j++) {
      const origLeft = { ...items[j] };
      const origRight = { ...items[j + 1] };
      const shouldSwap = origLeft.rating > origRight.rating;

      const leftLabel = getDishLabel(origLeft);
      const rightLabel = getDishLabel(origRight);

      // --- PHASE A: Comparison Step (Before Swap) ---
      stepIndex++;
      if (shouldSwap) {
        steps.push({
          stepIndex,
          passNumber,
          dishes: items.map((d) => ({ ...d })), // Array BEFORE swap
          comparedIndices: [j, j + 1],
          swapped: false,
          explanation: `👀 Haath 1 aur Haath 2 me dekho!\n\n• Left Haath (Hand 1): ${leftLabel} (${origLeft.rating} ⭐)\n• Right Haath (Hand 2): ${rightLabel} (${origRight.rating} ⭐)\n\n🤔 Pata Karo: Tumhein ${leftLabel} (${origLeft.rating} ⭐) ${rightLabel} (${origRight.rating} ⭐) se ZYADA TASTY lagta hai!\n\n💡 Faisla: Kyunki ${leftLabel} tumhein zyada tasty lagta hai, isiliye isko Right side me hona chahiye! Niche red button "Jagah Badal Do! 🔄" dabao!`,
          detailedReason: `Kyu jagah badalni hai?\n\n1. Hand 1 par ${leftLabel} (${origLeft.rating}⭐) hai aur Hand 2 par ${rightLabel} (${origRight.rating}⭐) hai.\n2. ${leftLabel} tumhein zyada tasty lagta hai, isiliye isko Right side me slide hona chahiye.\n3. Niche "Jagah Badal Do! 🔄" button dabao!`,
          lockedIndices: [...lockedIndices],
          isPassComplete: false,
          isFullySorted: false,
          passSwapsCount,
          actionType: 'compare-swap',
          buttonText: 'Jagah Badal Do! 🔄',
        });

        // --- PHASE B: Action Step (After Swap) ---
        // Perform the swap on items array
        const temp = items[j];
        items[j] = items[j + 1];
        items[j + 1] = temp;
        passSwapsCount++;

        stepIndex++;
        steps.push({
          stepIndex,
          passNumber,
          dishes: items.map((d) => ({ ...d })), // Array AFTER swap
          comparedIndices: [j, j + 1],
          swapped: true,
          explanation: `🎉 WOHOO! Magic Swap Ho Gaya! 🪄\n\nDekho! ${leftLabel} (${origLeft.rating} ⭐ - zyada tasty khana) slid karke Right side par chala gaya aur ${rightLabel} (${origRight.rating} ⭐) Left side par aa gaya!\n\nAb agle 2 neighbors dekhne ke liye green button "Agla Neighbor Dekho! 🚀" dabao!`,
          detailedReason: `Kya hua abhi?\n\n1. Both plates successfully switched places on the dining table!\n2. Now ${leftLabel} (${origLeft.rating}⭐) is safely on the Right side.\n3. Click "Agla Neighbor Dekho! 🚀" to check the next 2 neighbors!`,
          lockedIndices: [...lockedIndices],
          isPassComplete: j === n - i - 2,
          isFullySorted: false,
          passSwapsCount,
          actionType: 'swapped',
          buttonText: 'Agla Neighbor Dekho! 🚀',
        });
      } else {
        // Keep Places step
        steps.push({
          stepIndex,
          passNumber,
          dishes: items.map((d) => ({ ...d })), // Array unchanged
          comparedIndices: [j, j + 1],
          swapped: false,
          explanation: `👍 Yay! Yeh Toh Pehle Se Sahi Hai!\n\n• Left Haath (Hand 1): ${leftLabel} (${origLeft.rating} ⭐)\n• Right Haath (Hand 2): ${rightLabel} (${origRight.rating} ⭐)\n\n🌟 ${rightLabel} (${origRight.rating} ⭐) tumhein pehle se hi ZYADA TASTY lagta hai, aur wo Right side par hi baitha hai! Isiliye inhe bilkul mat chhedo!\n\nGreen button "Agla Neighbor Dekho! 🚀" dabakar aage badho!`,
          detailedReason: `Kyu jagah nahi badli?\n\n1. Hand 2 (Right) waala ${rightLabel} (${origRight.rating}⭐) tumhein pehle se hi zyada tasty lagta hai.\n2. Wo pehle se hi Right side par sahi jagah par hai.\n3. Isiliye hum inhe bilkul nahi chhedenge!`,
          lockedIndices: [...lockedIndices],
          isPassComplete: j === n - i - 2,
          isFullySorted: false,
          passSwapsCount,
          actionType: 'compare-keep',
          buttonText: 'Agla Neighbor Dekho! 🚀',
        });
      }
    }

    // Lock the end of this pass
    const newlyLockedIndex = n - 1 - i;
    lockedIndices.push(newlyLockedIndex);

    // If zero swaps occurred in this pass, the rest are also locked and we are done!
    if (passSwapsCount === 0) {
      for (let k = 0; k < n - i - 1; k++) {
        if (!lockedIndices.includes(k)) {
          lockedIndices.push(k);
        }
      }
      stepIndex++;
      steps.push({
        stepIndex,
        passNumber,
        dishes: items.map((d) => ({ ...d })),
        comparedIndices: null,
        swapped: false,
        explanation: `🎉 WOHOO! Round ${passNumber} me humne poori table dekhi aur ek bhi plate badalni nahi padi! Iska matlab saara khana PERFECTLY SET ho gaya hai!`,
        detailedReason: `Kaise pata chala ki game finish ho gaya?\n\nJab hum poori table walk karte hain aur 0 plates badalni padti hain, tab saari dishes 100% sorted ho jaati hain!`,
        lockedIndices: Array.from({ length: n }, (_, idx) => idx),
        isPassComplete: true,
        isFullySorted: true,
        passSwapsCount: 0,
        actionType: 'finish',
        buttonText: 'Party Feast Enjoy Karo! 🎉',
      });
      break;
    }
  }

  const lastStep = steps[steps.length - 1];
  if (!lastStep.isFullySorted) {
    stepIndex++;
    steps.push({
      stepIndex,
      passNumber: n - 1,
      dishes: items.map((d) => ({ ...d })),
      comparedIndices: null,
      swapped: false,
      explanation: '🎉 WOHOO! Sabhi food plates Smallest Star se Biggest Star tak perfectly set ho gayi hain!',
      detailedReason: 'Har ek tasty dish apni sahi jagah par hai. Ab party feast enjoy karo! 😋',
      lockedIndices: Array.from({ length: n }, (_, idx) => idx),
      isPassComplete: true,
      isFullySorted: true,
      passSwapsCount: 0,
      actionType: 'finish',
      buttonText: 'Party Feast Enjoy Karo! 🎉',
    });
  }

  return steps;
}
