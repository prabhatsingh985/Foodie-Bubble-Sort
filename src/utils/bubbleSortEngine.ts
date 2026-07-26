import type { FoodItem, SortStep } from '../types/bubbleSort';

export function generateBubbleSortSteps(initialDishes: FoodItem[]): SortStep[] {
  const steps: SortStep[] = [];
  const items = initialDishes.map((d) => ({ ...d }));
  const n = items.length;
  const lockedIndices: number[] = [];
  let stepIndex = 0;

  const highestDish = [...initialDishes].sort((a, b) => b.rating - a.rating)[0];

  // Step #0: Initial Intro Step
  steps.push({
    stepIndex: 0,
    passNumber: 1,
    dishes: items.map((d) => ({ ...d })),
    comparedIndices: null,
    swapped: false,
    explanation: `📖 Food Table Ki Kahani (3 Magic Rules!):\n\n1. 🍨 "Save Best for Last!": Sabse tasty food (${highestDish.emoji} ${highestDish.name} - ${highestDish.rating}⭐) right side me slide hoga taaki hum use end me maze se khayein!\n\n2. 🤝 "Sirf 2 Side-by-Side Neighbors!": Hum beech se random plate nahi uthate! Hamesha 2 neighbors check karte hain taaki mess na ho!\n\n3. 🛑 "Kab Finish Ho Jaayega?": Jab hum poori table walk kar lenge aur 0 plates change hongi, tab game finished!`,
    detailedReason: `Game Kaise Khelna Hai?\n\n- Rule 1: Tum Hand 1 (Left) aur Hand 2 (Right) se 2 neighbor plates check karoge.\n- Rule 2: Agar Left plate zyada tasty hai, toh "Switch Places 🔄" dabao taaki wo Right me chali jaye.\n- Rule 3: Jab poori round me ek bhi plate nahi badlegi (0 changes), tab sabhi dishes 100% sorted ho jaayengi!`,
    lockedIndices: [],
    isPassComplete: false,
    isFullySorted: false,
    passSwapsCount: 0,
    actionType: 'intro',
    buttonText: 'Start Playing! 🚀',
  });

  for (let i = 0; i < n - 1; i++) {
    const passNumber = i + 1;
    let passSwapsCount = 0;

    for (let j = 0; j < n - i - 1; j++) {
      const origLeft = { ...items[j] };
      const origRight = { ...items[j + 1] };
      const shouldSwap = origLeft.rating > origRight.rating;

      // --- PHASE A: Comparison Step (Before Swap) ---
      stepIndex++;
      if (shouldSwap) {
        steps.push({
          stepIndex,
          passNumber,
          dishes: items.map((d) => ({ ...d })), // Array BEFORE swap
          comparedIndices: [j, j + 1],
          swapped: false,
          explanation: `Hand 1 (Left) par: ${origLeft.emoji} ${origLeft.name} (${origLeft.rating} ⭐)\nHand 2 (Right) par: ${origRight.emoji} ${origRight.name} (${origRight.rating} ⭐)\n\nIn dono me se ${origLeft.name} ke paas ZYADA stars hain (${origLeft.rating} ⭐ > ${origRight.rating} ⭐)! Isko Right side me hona chahiye.\n\nClick "Switch Places 🔄" below to swap them!`,
          detailedReason: `Kyu jagah badalni hai?\n\n1. Table par abhi dekho: Hand 1 (Left) par ${origLeft.name} (${origLeft.rating}⭐) hai aur Hand 2 (Right) par ${origRight.name} (${origRight.rating}⭐) hai.\n2. ${origLeft.name} zyada tasty hai, isiliye isko Right side me hona chahiye!\n3. Niche "Switch Places 🔄" button dabao aur inko badalte hue dekho!`,
          lockedIndices: [...lockedIndices],
          isPassComplete: false,
          isFullySorted: false,
          passSwapsCount,
          actionType: 'compare-swap',
          buttonText: 'Switch Places 🔄',
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
          explanation: `🎉 Switch Done! Dekho ${origLeft.emoji} ${origLeft.name} (${origLeft.rating} ⭐) ab Right side par chala gaya aur ${origRight.emoji} ${origRight.name} (${origRight.rating} ⭐) Left side par aa gaya!\n\nClick "Next Pair 🚀" to check the next neighbor pair!`,
          detailedReason: `Kya hua abhi?\n\n1. Both plates successfully switched their places on the dining table!\n2. ${origLeft.name} (${origLeft.rating}⭐) is now safely on the Right side.\n3. Click "Next Pair 🚀" to move to the next pair of neighbors!`,
          lockedIndices: [...lockedIndices],
          isPassComplete: j === n - i - 2,
          isFullySorted: false,
          passSwapsCount,
          actionType: 'swapped',
          buttonText: 'Next Pair 🚀',
        });
      } else {
        // Keep Places step
        steps.push({
          stepIndex,
          passNumber,
          dishes: items.map((d) => ({ ...d })), // Array unchanged
          comparedIndices: [j, j + 1],
          swapped: false,
          explanation: `Hand 1 (Left) par: ${origLeft.emoji} ${origLeft.name} (${origLeft.rating} ⭐)\nHand 2 (Right) par: ${origRight.emoji} ${origRight.name} (${origRight.rating} ⭐)\n\nIn dono me se ${origRight.name} ke paas pehle se hi zyada stars hain (${origRight.rating} ⭐ > ${origLeft.rating} ⭐) aur wo Right side par hai! KEEP PLACES ✋`,
          detailedReason: `Kyu jagah nahi badli?\n\n1. Hand 1 par ${origLeft.name} (${origLeft.rating}⭐) hai aur Hand 2 par ${origRight.name} (${origRight.rating}⭐) hai.\n2. ${origRight.name} pehle se hi Right side par sahi jagah par hai.\n3. Isiliye hum inhe bilkul nahi chhedenge aur "Next Pair 🚀" par chalenge!`,
          lockedIndices: [...lockedIndices],
          isPassComplete: j === n - i - 2,
          isFullySorted: false,
          passSwapsCount,
          actionType: 'compare-keep',
          buttonText: 'Next Pair 🚀',
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
        explanation: `🎉 Yay! Round ${passNumber} me humne poori table walk ki aur ek bhi plate change nahi karni padi! Iska matlab poori table PERFECTLY SORTED hai!`,
        detailedReason: `Kaise pata chala ki khatam ho gaya?\n\nJab hum poori table check karte hain aur 0 plates badalni padti hain, iska matlab har khana apni sahi jagah par baitha hai!`,
        lockedIndices: Array.from({ length: n }, (_, idx) => idx),
        isPassComplete: true,
        isFullySorted: true,
        passSwapsCount: 0,
        actionType: 'finish',
        buttonText: 'Finish Adventure! 🎉',
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
      explanation: '🎉 Hurray! Sabhi food plates Smallest Star se Biggest Star tak perfectly set ho gayi hain!',
      detailedReason: 'Har ek tasty dish apni sahi jagah par hai. Ab party feast enjoy karo! 😋',
      lockedIndices: Array.from({ length: n }, (_, idx) => idx),
      isPassComplete: true,
      isFullySorted: true,
      passSwapsCount: 0,
      actionType: 'finish',
      buttonText: 'Finish Adventure! 🎉',
    });
  }

  return steps;
}
