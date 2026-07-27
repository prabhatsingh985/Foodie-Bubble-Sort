import type { FoodItem, SortStep, DialoguePair } from '../types/bubbleSort';

export function generateBubbleSortSteps(initialDishes: FoodItem[], userName: string = 'Rohan'): SortStep[] {
  const steps: SortStep[] = [];
  const items = initialDishes.map((d) => ({ ...d }));
  const n = items.length;
  const lockedIndices: number[] = [];
  let stepIndex = 0;
  const name = userName.trim() || 'Rohan';

  const getDishLabel = (dish: FoodItem) =>
    dish.imageUrl ? dish.name : `${dish.emoji || ''} ${dish.name}`.trim();

  // Find highest rating and handle ties if multiple dishes share max rating
  const maxRating = Math.max(...initialDishes.map((d) => d.rating));
  const highestDishes = initialDishes.filter((d) => d.rating === maxRating);
  const highestDishesLabel = highestDishes.map(getDishLabel).join(' & ');

  // Step #0: Initial Intro Story Step with Array & Index Concept
  steps.push({
    stepIndex: 0,
    passNumber: 1,
    dishes: items.map((d) => ({ ...d })),
    comparedIndices: null,
    swapped: false,
    explanation: `🎉 Chalo Magic Food Party Shuru Karein, ${name}! 🍽️✨\n\nAaj humari table par ${n} tasty dishes rakhi hain! Par saare khane aage-peeche mix hain!\n\n💡 2 Computer Magic Concepts:\n1. 🍽️ ARRAY = Poori Khane ki Line / Dining Table!\n2. 🪑 INDEX = Bench/Seat Number (Computer hamesha 0 se ginti shuru karta hai: 0, 1, 2, 3, 4)\n\n🔁 "Loops (Rounds)" Kaise Chalenge?\n• Loop / Pass = Table par Left (Index 0) se Right tak 1 poori walk!\n• Round 1: Sabse ZYADA tasty khana (${highestDishesLabel}) Last Seat (Index ${n - 1}) par Sahi Set 🎯 ho jaayega!\n• Round 2: 2nd sabse ZYADA tasty khana Index ${n - 2} par set hoga!\n• Total Rounds: ${n} dishes hain, toh max ${n - 1} Rounds chalenge!\n\n🪄 3 Magic Rules:\n1. 🤝 Do Haath Rule: Ek baar me sirf 2 neighbor plates (Left Hand & Right Hand) check karenge!\n2. 👉 Zyada Tasty Khana Right Me: Left hand waala khana zyada tasty hoga toh Right me slide kar denge!\n3. 🏆 Winner Trophy: Jab ek poore round me EK BHI plate hilani nahi padegi, tab Game WIN! 🎉`,
    detailedReason: `Array, Index aur Loop Kaise Kaam Karte Hain?\n\n1. ARRAY = Khane ki plates ki poori line / bench!\n2. INDEX = Seat Number (0, 1, 2, 3, 4...). Computer 0 se ginti shuru karta hai!\n3. LOOP = Table par Left se Right tak ki 1 Round Walk!\n4. SAHI SEAT PAR SET 🎯 = Dish apni VIP Final Seat par baith gayi hai!`,
    lockedIndices: [],
    isPassComplete: false,
    isFullySorted: false,
    passSwapsCount: 0,
    actionType: 'intro',
    buttonText: 'Game Shuru Karo! 🚀',
    dialogues: [
      {
        question: `Chef Uncle! Table par saare khane mix kyu hain? Humein aaj iss party me kya karna hai?`,
        answer: `${name}! Humein sabse kam tasty khana pehle lagana hai, aur sabse ZYADA tasty khana (${highestDishesLabel} - ${maxRating}⭐) sabse LAST seat (Index ${n - 1}) par lagana hai—taaki hum use party ke end me aaram se maze se kha sakein! 😋`,
      },
      {
        question: `Chef Uncle! Iss poori Dining Table aur Seat Numbers ko Computer Language me kya bolte hain?`,
        answer: `Bahut achha sawal ${name}! Computer me jab hum plates ko ek line me table par rakh dete hain, toh iss poori line ko Computer 'ARRAY' kehta hai! Aur inke Seat Numbers (jo 0 se shuru hote hain: 0, 1, 2, 3, 4) ko Computer 'INDEX' kehta hai! Remember: Computer counting hamesha 0 se start hoti hai!`,
      },
      {
        question: `Achha! Toh jab humein sabse tasty khana last seat par le jana hai, toh hum plates ko kaise aage khiskayein?`,
        answer: `Boht simple hai! Hum ek baar me sirf 2 paas-paas waali (Neighbor) plates ko apne 2 haathon me uthayenge! Agar Left hand waale khane me zyada Stars ⭐ hain, toh use Right side khiska denge!`,
      },
      {
        question: `Par Chef Uncle, kya 1 baar Left se Right tak walk karne se saara khana set ho jaayega?`,
        answer: `Nahi ${name}! 1st walk (Round 1) me sirf sabse ZYADA tasty khana (${highestDishesLabel}) last seat (Index ${n - 1}) par Sahi Set 🎯 hoga! Phir humein 2nd walk (Round 2) karni padegi 2nd best khana set karne ke liye! Aise table par walk karne ko hi LOOP ya ROUND kehte hain!`,
      },
      {
        question: `Toh Chef Uncle, humein kitne Rounds chalane padenge? Aur humein kaise pata chalega ki Game FINISH ho gaya?`,
        answer: `Agar ${n} plates hain, toh max ${n - 1} Rounds chalenge! Aur jab ek poore Round me EK BHI plate hilani nahi padegi (matlab saare khane set ho gaye!), tab Game WIN! 🏆 🎉`,
      },
    ],
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
          explanation: `👀 Left Haath (Index ${j}) aur Right Haath (Index ${j + 1}) me dekho, ${name}! (Round #${passNumber})\n\n• Left Haath (Index ${j}): ${leftLabel} (${origLeft.rating} ⭐)\n• Right Haath (Index ${j + 1}): ${rightLabel} (${origRight.rating} ⭐)\n\n🤔 Pata Karo: Tumhein ${leftLabel} (${origLeft.rating} ⭐) ${rightLabel} (${origRight.rating} ⭐) se ZYADA TASTY lagta hai!\n\n💡 Faisla: Kyunki ${leftLabel} tumhein zyada tasty lagta hai, isiliye isko Right side (Index ${j + 1}) me hona chahiye! Niche red button "Jagah Badal Do! 🔄" dabao!`,
          detailedReason: `Kyu jagah badalni hai?\n\n1. Left Haath (Index ${j}) par ${leftLabel} (${origLeft.rating}⭐) hai aur Right Haath (Index ${j + 1}) par ${rightLabel} (${origRight.rating}⭐) hai.\n2. ${leftLabel} tumhein zyada tasty lagta hai, isiliye isko Right side (Index ${j + 1}) me slide hona chahiye.\n3. Niche "Jagah Badal Do! 🔄" button dabao!`,
          lockedIndices: [...lockedIndices],
          isPassComplete: false,
          isFullySorted: false,
          passSwapsCount,
          actionType: 'compare-swap',
          buttonText: 'Jagah Badal Do! 🔄',
          dialogues: [
            {
              question: `Chef Uncle! Ab kaunsi seats compare ho rahi hain? Mere Left Haath me ${leftLabel} (Index ${j}) hai aur Right Haath me ${rightLabel} (Index ${j + 1}) hai!`,
              answer: `Dekho ${name}, hum Left Haath (Index ${j}) aur Right Haath (Index ${j + 1}) ke khane ko compare kar rahe hain! Kyunki ${leftLabel} zyada tasty hai (${origLeft.rating}⭐ > ${origRight.rating}⭐), isiliye red button 'Jagah Badal Do! 🔄' dabakar ise Right side (Index ${j + 1}) par slide kar do!`,
            },
          ],
        });

        // --- PHASE B: Action Step (After Swap) ---
        // Perform the swap on items array
        const temp = items[j];
        items[j] = items[j + 1];
        items[j + 1] = temp;
        passSwapsCount++;

        stepIndex++;
        const isThisPassLastCompare = j === n - i - 2;
        steps.push({
          stepIndex,
          passNumber,
          dishes: items.map((d) => ({ ...d })), // Array AFTER swap
          comparedIndices: [j, j + 1],
          swapped: true,
          explanation: `🎉 WOHOO! Magic Swap Ho Gaya, ${name}! 🪄\n\nDekho! ${leftLabel} (${origLeft.rating} ⭐ - zyada tasty khana) slid karke Right side (Index ${j + 1}) par chala gaya aur ${rightLabel} (${origRight.rating} ⭐) Left side (Index ${j}) par aa gaya!${isThisPassLastCompare ? `\n\n🎯 Round #${passNumber} Finish! Index ${n - 1 - i} (Seat #${n - 1 - i}) par ${leftLabel} Sahi Set 🎯 ho gaya!` : ''}\n\nAb agle neighbors dekhne ke liye green button "Agla Neighbor Dekho! 🚀" dabao!`,
          detailedReason: `Kya hua abhi?\n\n1. Both plates switched places in the array (Index ${j} ↔ Index ${j + 1})!\n2. Now ${leftLabel} (${origLeft.rating}⭐) is safely at Index ${j + 1}.\n3. Click "Agla Neighbor Dekho! 🚀" to check next neighbors!`,
          lockedIndices: [...lockedIndices],
          isPassComplete: isThisPassLastCompare,
          isFullySorted: false,
          passSwapsCount,
          actionType: 'swapped',
          buttonText: 'Agla Neighbor Dekho! 🚀',
          dialogues: [
            {
              question: `Yay Chef Uncle! Red button dabate hi ${leftLabel} Right side (Index ${j + 1}) par khisak gaya! Ab aage kya karna hai?`,
              answer: `Shabash ${name}! ${leftLabel} ab Right side (Index ${j + 1}) par chala gaya!${isThisPassLastCompare ? ` Round #${passNumber} finish ho gaya aur Index ${n - 1 - i} (Seat #${n - 1 - i}) par khana Sahi Set 🎯 ho gaya!` : ''} Ab 'Agla Neighbor Dekho! 🚀' dabakar aage badho!`,
            },
          ],
        });
      } else {
        // Keep Places step (Handles Equal Ratings properly)
        const isThisPassLastCompare = j === n - i - 2;
        const isEqualRating = origLeft.rating === origRight.rating;

        const keepExplanation = isEqualRating
          ? `👍 Yay! Dono Barabar Tasty Hain, ${name}! (Round #${passNumber})\n\n• Left Haath (Index ${j}): ${leftLabel} (${origLeft.rating} ⭐)\n• Right Haath (Index ${j + 1}): ${rightLabel} (${origRight.rating} ⭐)\n\n🌟 ${leftLabel} (${origLeft.rating} ⭐) aur ${rightLabel} (${origRight.rating} ⭐) DONO EQUALLY TASTY (barabar tasty) hain! Dono me se kisi ko aage khiskane ki zarurat nahi hai! Isiliye inhe bilkul mat chhedo!${isThisPassLastCompare ? `\n\n🎯 Round #${passNumber} Finish! Index ${n - 1 - i} par ${rightLabel} Sahi Set 🎯 ho gaya!` : ''}\n\nGreen button "Agla Neighbor Dekho! 🚀" dabakar aage badho!`
          : `👍 Yay! Yeh Toh Pehle Se Sahi Hai, ${name}! (Round #${passNumber})\n\n• Left Haath (Index ${j}): ${leftLabel} (${origLeft.rating} ⭐)\n• Right Haath (Index ${j + 1}): ${rightLabel} (${origRight.rating} ⭐)\n\n🌟 ${rightLabel} (${origRight.rating} ⭐) ${leftLabel} (${origLeft.rating} ⭐) se ZYADA TASTY hai, aur wo Right side (Index ${j + 1}) par hi baitha hai! Isiliye inhe bilkul mat chhedo!${isThisPassLastCompare ? `\n\n🎯 Round #${passNumber} Finish! Index ${n - 1 - i} par ${rightLabel} Sahi Set 🎯 ho gaya!` : ''}\n\nGreen button "Agla Neighbor Dekho! 🚀" dabakar aage badho!`;

        const keepQuestion = isEqualRating
          ? `Chef Uncle! Iss baar Left Haath me ${leftLabel} (Index ${j}) hai aur Right Haath me ${rightLabel} (Index ${j + 1}) hai... Dono ke stars barabar hain! Inki jagah kyu nahi badli?`
          : `Chef Uncle! Iss baar Left Haath me ${leftLabel} (Index ${j}) hai aur Right Haath me ${rightLabel} (Index ${j + 1}) hai... Inki jagah kyu nahi badli?`;

        const keepAnswer = isEqualRating
          ? `Dekho ${name}, ${leftLabel} aur ${rightLabel} DONO EQUALLY TASTY (barabar ${origLeft.rating}⭐) hain! Jab dono khane barabar tasty hote hain, toh Index badalne ki zarurat nahi hoti! Dono apni jagah par sahi hain! Green button 'Agla Neighbor Dekho! 🚀' dabakar aage badho!`
          : `Kyunki ${rightLabel} (${origRight.rating}⭐) ${leftLabel} (${origLeft.rating}⭐) se ZYADA TASTY hai aur wo Right side (Index ${j + 1}) ki Sahi Seat 🪑 par pehle se hi baitha hai! Isiliye inki jagah nahi badli! Green button 'Agla Neighbor Dekho! 🚀' dabakar aage badho!`;

        steps.push({
          stepIndex,
          passNumber,
          dishes: items.map((d) => ({ ...d })), // Array unchanged
          comparedIndices: [j, j + 1],
          swapped: false,
          explanation: keepExplanation,
          detailedReason: `Kyu jagah nahi badli?\n\n1. Left Haath (Index ${j}) par ${leftLabel} (${origLeft.rating}⭐) hai aur Right Haath (Index ${j + 1}) par ${rightLabel} (${origRight.rating}⭐) hai.\n2. ${isEqualRating ? 'Dono khane barabar tasty hain!' : `${rightLabel} pehle se hi zyada tasty hai.`}\n3. Isiliye hum inhe bilkul nahi chhedenge!`,
          lockedIndices: [...lockedIndices],
          isPassComplete: isThisPassLastCompare,
          isFullySorted: false,
          passSwapsCount,
          actionType: 'compare-keep',
          buttonText: 'Agla Neighbor Dekho! 🚀',
          dialogues: [
            {
              question: keepQuestion,
              answer: keepAnswer,
            },
          ],
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
        explanation: `🎉 WOHOO! Round #${passNumber} me humne poora Food Array dekha aur EK BHI plate hilani nahi padi! Iska matlab Array ki saari dishes Index 0 se Index ${n - 1} tak 100% PERFECTLY SET ho gayi hain!`,
        detailedReason: `Kaise pata chala ki game finish ho gaya?\n\nJab hum poori Array walk karte hain aur 0 plates badalni padti hain, tab saari dishes 100% sorted ho jaati hain!`,
        lockedIndices: Array.from({ length: n }, (_, idx) => idx),
        isPassComplete: true,
        isFullySorted: true,
        passSwapsCount: 0,
        actionType: 'finish',
        buttonText: 'Party Feast Enjoy Karo! 🎉',
        dialogues: [
          {
            question: `Chef Uncle! Maine poori Array (Table) walk kar li aur ek bhi plate hilani nahi padi! Kya game khatam ho gaya?`,
            answer: `Haan ${name}! 0 plates change hone ka matlab hai saara khana Smallest Star se Biggest Star tak 100% Sahi Seats (Indices) par Set 🎯 ho gaya! Ab Party Feast enjoy karo! 🥳`,
          },
        ],
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
      explanation: `🎉 WOHOO! Food Array ki sabhi plates Index 0 se Index ${n - 1} tak Smallest Star se Biggest Star tak perfectly set ho gayi hain!`,
      detailedReason: 'Har ek tasty dish apni sahi Index seat par hai. Ab party feast enjoy karo! 😋',
      lockedIndices: Array.from({ length: n }, (_, idx) => idx),
      isPassComplete: true,
      isFullySorted: true,
      passSwapsCount: 0,
      actionType: 'finish',
      buttonText: 'Party Feast Enjoy Karo! 🎉',
      dialogues: [
        {
          question: `Chef Uncle! Maine poori Array walk kar li aur saara khana set ho gaya! Kya game khatam ho gaya?`,
          answer: `Haan ${name}! Sabhi dishes Index 0 se Index ${n - 1} tak Smallest Star se Biggest Star tak 100% Sahi Set 🎯 ho gayi hain! Now enjoy the Party Feast! 🥳`,
        },
      ],
    });
  }

  return steps;
}
