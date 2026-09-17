import React, { useState } from 'react';
import { GROWTH_STAGES } from '../data/guideData';
import { SIBLING_BEANS } from '../data/storyData';
import { GrowthStage } from '../types';
import { soundEngine, speakRomanian } from '../utils/audio';
import { Droplets, Sun, Sparkles, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface JarSimulatorProps {
  currentDay: GrowthStage;
  onSelectDay: (day: GrowthStage) => void;
  gardenerName: string;
}

export function JarSimulator({ currentDay, onSelectDay, gardenerName }: JarSimulatorProps) {
  const [waterLevel, setWaterLevel] = useState<number>(75); // 0 to 100%
  const [sunlight, setSunlight] = useState<'normal' | 'bright' | 'shade'>('bright');
  const [isWatering, setIsWatering] = useState<boolean>(false);
  const [selectedBeanIndex, setSelectedBeanIndex] = useState<number>(0);
  const [bubbleMessage, setBubbleMessage] = useState<string>(
    'Bună! Sunt Bobocel! Udă-mi prosopelul și dă-mi lumină caldă ca să cresc mare!'
  );

  const currentStageDetail =
    GROWTH_STAGES.find((s) => s.day === currentDay) || GROWTH_STAGES[0];

  const handleWaterPlant = () => {
    soundEngine.playWaterDrop();
    setIsWatering(true);
    setWaterLevel((prev) => Math.min(100, prev + 15));
    const msg = 'Plop-plop! Ai adăugat stropi proaspeți de apă! Prosopelul e bine umezit!';
    setBubbleMessage(msg);
    speakRomanian(msg, undefined, 'action_water');

    setTimeout(() => {
      setIsWatering(false);
    }, 900);
  };

  const handleSunToggle = () => {
    soundEngine.playSunChime();
    const msg = 'Soarele călduț strălucește frumos! Bobocel zâmbește bucuros spre lumină!';
    if (sunlight === 'shade') {
      setSunlight('normal');
    } else if (sunlight === 'normal') {
      setSunlight('bright');
    } else {
      setSunlight('shade');
    }
    setBubbleMessage(msg);
    speakRomanian(msg, undefined, 'action_sun');
  };

  const handleBeanClick = (index: number) => {
    setSelectedBeanIndex(index);
    soundEngine.playGiggle();
    const bean = SIBLING_BEANS[index];

    if (index === 0) {
      setBubbleMessage(currentStageDetail.bobocelSpeech);
      speakRomanian(currentStageDetail.bobocelSpeech, undefined, `stage_${currentDay}`);
    } else {
      const messages = [
        `Eu sunt ${bean.name}! ${bean.personality}!`,
        `${bean.name}: Vreau și eu puțină apă pe prosopel!`,
        `${bean.name}: Bobocel este fratele meu cel mai viteaz!`
      ];
      const msg = messages[Math.floor(Math.random() * messages.length)];
      setBubbleMessage(msg);
      speakRomanian(msg);
    }
  };

  const handleNextDay = () => {
    const stages: GrowthStage[] = [0, 1, 2, 4, 7, 14];
    const currentIndex = stages.indexOf(currentDay);
    if (currentIndex < stages.length - 1) {
      const nextDay = stages[currentIndex + 1];
      onSelectDay(nextDay);
      soundEngine.playSprout();

      if (nextDay === 14) {
        soundEngine.playFanfare();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      }
    }
  };

  const handleReset = () => {
    soundEngine.playPop();
    onSelectDay(0);
    setWaterLevel(60);
    setBubbleMessage('Bobocel s-a întors la început, dormind cuminte în sac!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner with interactive stage stepper */}
      <div className="bg-white/90 rounded-3xl p-4 sm:p-5 border-2 border-emerald-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-emerald-950 flex items-center gap-2">
              <span>Borcanul Fermecat</span>
              <span className="text-sm font-normal text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Simulatorul Creșterii
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Alege ziua sau apasă pe butoane pentru a vedea cum germinează Bobocel!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-next-growth-step"
              onClick={handleNextDay}
              disabled={currentDay === 14}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all ${
                currentDay === 14
                  ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
              }`}
            >
              <span>Următoarea Zi</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="btn-reset-simulator"
              onClick={handleReset}
              className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-colors"
              title="Resetează la Ziua 0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Day Pills Bar */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {GROWTH_STAGES.map((st) => {
            const isSelected = currentDay === st.day;
            const isCompleted = currentDay > st.day;
            return (
              <button
                key={st.day}
                id={`btn-stage-${st.day}`}
                onClick={() => {
                  soundEngine.playPop();
                  onSelectDay(st.day);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-102 ring-2 ring-emerald-300'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider">{st.label}</span>
                <span className="text-[11px] font-medium truncate max-w-full text-center">
                  {st.day === 0
                    ? 'Somn'
                    : st.day === 1
                    ? 'Umflare'
                    : st.day === 2
                    ? 'Crăpare'
                    : st.day === 4
                    ? 'Rădăcină'
                    : st.day === 7
                    ? 'Tulpiniță'
                    : 'Plăntuță'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage: The Big Jar & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* The Glass Jar Stage */}
        <div className="lg:col-span-7 bg-linear-to-b from-sky-50 via-amber-50/50 to-emerald-50 rounded-3xl p-6 border-3 border-amber-200 shadow-lg relative flex flex-col items-center min-h-[500px]">
          {/* Sunlight Glow Background based on sunlight state */}
          <div
            className={`absolute -top-6 -right-6 w-48 h-48 rounded-full blur-2xl transition-all duration-700 pointer-events-none ${
              sunlight === 'bright'
                ? 'bg-amber-300/60'
                : sunlight === 'normal'
                ? 'bg-amber-200/30'
                : 'bg-stone-300/20'
            }`}
          />

          {/* Bobocel Speech Bubble on Top of Jar */}
          <div className="w-full max-w-md bg-white/95 border-2 border-emerald-400 rounded-2xl p-3 mb-4 shadow-sm relative flex items-start gap-2.5 animate-float-gentle">
            <div className="text-2xl shrink-0">💬</div>
            <div className="flex-1">
              <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider block">
                {SIBLING_BEANS[selectedBeanIndex].name} vorbește:
              </span>
              <p className="text-sm font-bold text-stone-800 leading-snug">
                {bubbleMessage}
              </p>
            </div>
            <button
              onClick={() => speakRomanian(bubbleMessage, undefined, selectedBeanIndex === 0 ? `stage_${currentDay}` : undefined)}
              className="text-stone-400 hover:text-emerald-700 p-1"
              title="Ascultă ce spune"
            >
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </button>
          </div>

          {/* Water droplets falling animation when watering */}
          {isWatering && (
            <div className="absolute top-24 z-20 flex gap-4 pointer-events-none animate-bounce">
              <span className="text-2xl">💧</span>
              <span className="text-xl">💧</span>
              <span className="text-3xl">💧</span>
            </div>
          )}

          {/* JAR CONTAINER SVG / Visual Representation */}
          <div className="relative w-72 sm:w-80 h-96 flex items-center justify-center">
            {/* Glass Jar Outer Outline */}
            <svg viewBox="0 0 280 360" className="w-full h-full drop-shadow-xl select-none">
              {/* Jar Lid Ring */}
              <rect x="60" y="8" width="160" height="14" rx="4" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
              <path d="M70 22 L75 35 L205 35 L210 22 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />

              {/* Glass Body */}
              <rect
                x="40"
                y="35"
                width="200"
                height="300"
                rx="28"
                fill="rgba(255, 255, 255, 0.45)"
                stroke="#64748b"
                strokeWidth="3.5"
              />

              {/* Wet Paper Towel Inside against the glass */}
              <path
                d="M50 55 C55 60, 50 120, 52 180 C50 240, 55 315, 60 325 L220 325 C225 315, 230 240, 228 180 C230 120, 225 60, 230 55 Z"
                fill="#e0f2fe"
                stroke="#bae6fd"
                strokeWidth="2"
                strokeDasharray="4 3"
                opacity="0.85"
              />

              {/* Water reservoir at bottom of the jar (2-3 cm) */}
              <path
                d="M43 285 Q140 288 237 285 L237 315 Q140 335 43 315 Z"
                fill={waterLevel > 30 ? 'rgba(56, 189, 248, 0.45)' : 'rgba(224, 242, 254, 0.2)'}
                stroke="#0284c7"
                strokeWidth="1.5"
              />
              <text x="140" y="308" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369a1">
                💧 Apă pe fund (capilaritate)
              </text>

              {/* Glass Highlights / Reflections */}
              <path
                d="M52 60 Q50 180 54 300"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M62 70 Q60 140 63 200"
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Custom Kid Label on the Jar */}
              <g id="jar-custom-label">
                <rect
                  x="75"
                  y="225"
                  width="130"
                  height="45"
                  rx="10"
                  fill="#fef3c7"
                  stroke="#f59e0b"
                  strokeWidth="2"
                />
                <text x="140" y="242" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e">
                  🌱 Căsuța lui Bobocel
                </text>
                <text x="140" y="258" textAnchor="middle" fontSize="9" fontWeight="extrabold" fill="#15803d">
                  Grădinar: {gardenerName || 'Copil Isteț'}
                </text>
              </g>

              {/* BEANS INSIDE THE JAR */}

              {/* Sibling Bean 1: Bobiță (left) */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => handleBeanClick(1)}
              >
                <ellipse cx="80" cy="165" rx="16" ry="12" fill="#86efac" stroke="#15803d" strokeWidth="2" />
                <circle cx="75" cy="163" r="1.5" fill="#14532d" />
                <circle cx="83" cy="163" r="1.5" fill="#14532d" />
                <path d="M76 168 Q79 170 82 168" stroke="#14532d" strokeWidth="1" fill="none" />
                {currentDay >= 4 && (
                  <path d="M80 175 Q82 195 80 210" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                )}
              </g>

              {/* Sibling Bean 2: Bobolina (right) */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => handleBeanClick(2)}
              >
                <ellipse cx="200" cy="165" rx="16" ry="12" fill="#fbcfe8" stroke="#be185d" strokeWidth="2" />
                <circle cx="195" cy="163" r="1.5" fill="#831843" />
                <circle cx="203" cy="163" r="1.5" fill="#831843" />
                <path d="M196 168 Q200 171 204 168" stroke="#831843" strokeWidth="1" fill="none" />
                {currentDay >= 4 && (
                  <path d="M200 175 Q198 195 202 215" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                )}
              </g>

              {/* Sibling Bean 3: Boabă-Vitează (upper right) */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => handleBeanClick(3)}
              >
                <ellipse cx="180" cy="120" rx="14" ry="10" fill="#ddd6fe" stroke="#6d28d9" strokeWidth="2" />
                <circle cx="176" cy="119" r="1.5" fill="#4c1d95" />
                <circle cx="183" cy="119" r="1.5" fill="#4c1d95" />
                {currentDay >= 4 && (
                  <path d="M180 128 Q182 145 180 160" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />
                )}
              </g>

              {/* MAIN HERO: BOBOCEL IN THE CENTER */}
              <g
                id="bobocel-jar-hero"
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleBeanClick(0)}
              >
                {/* ROOTS OF BOBOCEL GROWING DOWN */}
                {currentDay >= 4 && (
                  <g className="transition-all duration-700">
                    {/* Primary taproot */}
                    <path
                      d={
                        currentDay === 4
                          ? 'M140 180 Q145 220 138 270'
                          : currentDay === 7
                          ? 'M140 180 Q146 230 138 290 Q130 305 120 310'
                          : 'M140 180 Q146 230 138 290 Q120 310 90 315'
                      }
                      fill="none"
                      stroke="#f8fafc"
                      strokeWidth={currentDay === 14 ? '6' : '4.5'}
                      strokeLinecap="round"
                    />
                    {/* Lateral branch roots */}
                    {currentDay >= 7 && (
                      <>
                        <path d="M141 210 Q160 230 170 240" fill="none" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
                        <path d="M139 235 Q120 255 110 265" fill="none" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
                        <path d="M139 265 Q155 280 165 290" fill="none" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
                      </>
                    )}
                    {/* Fine root hairs for stage 14 */}
                    {currentDay === 14 && (
                      <>
                        <path d="M142 195 Q155 200 162 202" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                        <path d="M138 215 Q122 218 115 220" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                        <path d="M140 248 Q158 252 165 258" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                      </>
                    )}
                  </g>
                )}

                {/* STEM OF BOBOCEL GROWING UP TOWARDS SUN */}
                {currentDay >= 7 && (
                  <g className="transition-all duration-700">
                    <path
                      d={
                        currentDay === 7
                          ? 'M140 135 Q145 90 148 50'
                          : 'M140 135 Q145 80 152 20 Q155 10 160 0'
                      }
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth={currentDay === 14 ? '6.5' : '4.5'}
                      strokeLinecap="round"
                    />

                    {/* Stage 7 baby leaves */}
                    {currentDay === 7 && (
                      <g>
                        <path
                          d="M148 50 Q170 42 172 58 Q158 65 148 52"
                          fill="#22c55e"
                          stroke="#15803d"
                          strokeWidth="2"
                        />
                        <path
                          d="M148 52 Q126 40 124 56 Q138 65 148 54"
                          fill="#4ade80"
                          stroke="#15803d"
                          strokeWidth="2"
                        />
                      </g>
                    )}

                    {/* Stage 14 big leaves bursting out of the jar! */}
                    {currentDay === 14 && (
                      <g className="animate-pulse-soft">
                        {/* Leaf pair 1 */}
                        <path
                          d="M150 75 Q185 60 190 85 Q168 95 150 80"
                          fill="#15803d"
                          stroke="#14532d"
                          strokeWidth="2"
                        />
                        <path
                          d="M148 80 Q110 65 105 90 Q128 100 148 82"
                          fill="#22c55e"
                          stroke="#14532d"
                          strokeWidth="2"
                        />
                        {/* Top leaves above jar rim */}
                        <path
                          d="M158 5 Q195 -15 200 15 Q175 25 158 8"
                          fill="#22c55e"
                          stroke="#14532d"
                          strokeWidth="2"
                        />
                        <path
                          d="M158 5 Q115 -15 110 15 Q135 25 158 8"
                          fill="#4ade80"
                          stroke="#14532d"
                          strokeWidth="2"
                        />
                      </g>
                    )}
                  </g>
                )}

                {/* BOBOCEL BEAN BODY - Curved Kidney Bean matching user reference */}
                <g transform="translate(108, 120) scale(0.32)">
                  {/* Kidney bean body */}
                  <path
                    d="M55 42
                       C75 44, 98 62, 108 80
                       C118 97, 130 98, 148 102
                       C175 108, 188 132, 178 156
                       C168 180, 135 186, 102 178
                       C68 170, 36 150, 24 116
                       C12 80, 30 42, 55 42 Z"
                    fill={currentDay === 0 ? '#eab308' : '#facc15'}
                    stroke="#0f172a"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                  {/* Sheen */}
                  <path
                    d="M40 58 C32 80, 34 110, 48 132"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.65"
                  />

                  {/* Waist creases */}
                  <g stroke="#0f172a" strokeWidth="4" strokeLinecap="round" fill="none">
                    <path d="M96 82 Q105 88 114 85" />
                    <path d="M90 92 Q103 100 114 96" />
                  </g>

                  {/* Top Sprout (2 leaves with veins) */}
                  <g>
                    <path d="M58 48 Q55 35 62 26" fill="none" stroke="#15803d" strokeWidth="4.5" strokeLinecap="round" />
                    <path d="M59 27 C42 16, 26 24, 28 39 C38 48, 54 40, 59 27 Z" fill="#22c55e" stroke="#0f172a" strokeWidth="3" />
                    <path d="M62 26 C68 9, 88 10, 94 24 C94 38, 77 42, 62 26 Z" fill="#16a34a" stroke="#0f172a" strokeWidth="3" />
                  </g>

                  {/* Shell crack line if Day >= 2 */}
                  {currentDay >= 2 && (
                    <path
                      d="M80 70 L86 82 L78 94 L86 104"
                      stroke="#78350f"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  )}

                  {/* Freckles */}
                  <g fill="#92400e" opacity="0.65">
                    <circle cx="36" cy="100" r="1.5" />
                    <circle cx="41" cy="103" r="1.5" />
                    <circle cx="70" cy="95" r="1.5" />
                    <circle cx="75" cy="98" r="1.5" />
                  </g>

                  {/* Face */}
                  {currentDay === 0 ? (
                    // Sleeping lashes
                    <g stroke="#0f172a" strokeWidth="4" strokeLinecap="round" fill="none">
                      <path d="M38 90 Q46 98 54 90" />
                      <path d="M60 84 Q68 92 76 84" />
                      <path d="M46 95 L46 101" strokeWidth="2.5" />
                      <path d="M68 89 L68 95" strokeWidth="2.5" />
                      <text x="95" y="70" fontSize="22" fontWeight="bold" fill="#854d0e">z</text>
                    </g>
                  ) : (
                    <g>
                      {/* Left Eye: Eyelashes + Green Iris + Sparkle */}
                      <path d="M37 80 L30 75" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                      <path d="M41 77 L36 70" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                      <path d="M46 76 L44 68" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="46" cy="85" r="10" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" />
                      <circle cx="47" cy="85" r="7" fill="#10b981" />
                      <circle cx="47" cy="85" r="4.5" fill="#0f172a" />
                      <circle cx="44.5" cy="82.5" r="2" fill="#ffffff" />

                      {/* Right Eye: Eyelashes + Green Iris + Sparkle */}
                      <path d="M66 73 L62 65" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                      <path d="M71 72 L70 63" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                      <path d="M76 74 L78 66" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="70" cy="79" r="9" fill="#ffffff" stroke="#0f172a" strokeWidth="3.5" />
                      <circle cx="70.5" cy="79" r="6.2" fill="#10b981" />
                      <circle cx="70.5" cy="79" r="4" fill="#0f172a" />
                      <circle cx="68.5" cy="76.8" r="1.8" fill="#ffffff" />

                      {/* Happy open smile with pink tongue */}
                      <path
                        d="M48 103 Q64 94 77 101 C78 116, 56 122, 48 103 Z"
                        fill="#0f172a"
                        stroke="#0f172a"
                        strokeWidth="3.5"
                      />
                      <path d="M55 113 Q65 106 72 109 C70 117, 58 118, 55 113 Z" fill="#f43f5e" />
                    </g>
                  )}
                </g>
              </g>
            </svg>
          </div>

          <div className="text-center text-xs font-bold text-stone-500 mt-2">
            💡 Apasă pe Bobocel sau pe frații lui din borcan ca să auzi ce spun!
          </div>
        </div>

        {/* Right Column: Interactive Care Station & Facts */}
        <div className="lg:col-span-5 space-y-4">
          {/* Care Action Tools */}
          <div className="bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-sm space-y-4">
            <h3 className="font-heading text-lg font-bold text-amber-950 flex items-center gap-2">
              <span>Uneltele Grădinarului</span>
              <span className="text-xs font-normal text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                Îngrijește-l zilnic
              </span>
            </h3>

            {/* Tool 1: Watering Can */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-sky-50 border border-sky-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-xs">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-sky-950">Stropitoarea cu Apă</h4>
                  <p className="text-xs text-sky-800">
                    Umezește prosopelul ({waterLevel}% umed)
                  </p>
                </div>
              </div>
              <button
                id="btn-water-action"
                onClick={handleWaterPlant}
                className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs transition-transform active:scale-95 flex items-center gap-1"
              >
                <span>Udați!</span>
                <span className="text-sm">💦</span>
              </button>
            </div>

            {/* Tool 2: Sunlight Window */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-amber-950">Fereastra cu Lumină</h4>
                  <p className="text-xs text-amber-800 capitalize">
                    Stare: {sunlight === 'bright' ? 'Soare cald ☀️' : sunlight === 'normal' ? 'Lumină blândă 🌤️' : 'Umbră ☁️'}
                  </p>
                </div>
              </div>
              <button
                id="btn-sun-toggle"
                onClick={handleSunToggle}
                className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
              >
                Schimbă
              </button>
            </div>

            {/* Sibling Beans Switcher */}
            <div className="pt-2 border-t border-stone-200">
              <span className="text-xs font-bold text-stone-600 block mb-2">
                Alege bobul pe care vrei să-l spionezi:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {SIBLING_BEANS.map((bean, idx) => (
                  <button
                    key={bean.name}
                    onClick={() => handleBeanClick(idx)}
                    className={`p-2 rounded-xl text-left border text-xs font-bold transition-all flex items-center gap-2 ${
                      selectedBeanIndex === idx
                        ? 'bg-amber-100 border-amber-400 text-amber-950 shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: bean.color }}
                    />
                    <span className="truncate">{bean.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Current Stage Educational Breakdown */}
          <div className="bg-emerald-50/90 rounded-3xl p-5 border-2 border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-950 text-xs font-extrabold uppercase">
                {currentStageDetail.label}
              </span>
              <span className="text-xs font-bold text-emerald-800">
                🌱 Etapa Biologică
              </span>
            </div>

            <h3 className="font-heading text-lg font-bold text-emerald-950">
              {currentStageDetail.title}
            </h3>

            <p className="text-xs sm:text-sm text-emerald-900 font-medium leading-relaxed bg-white/70 p-3 rounded-xl border border-emerald-200/80">
              {currentStageDetail.beanState}
            </p>

            <div className="text-xs text-stone-700 bg-white/90 p-3 rounded-xl border border-emerald-300">
              <strong className="text-emerald-900 font-bold block mb-1">
                🔬 Ce se întâmplă științific:
              </strong>
              {currentStageDetail.scientificExplanation}
            </div>

            <div className="text-xs text-amber-900 bg-amber-100/80 p-3 rounded-xl border border-amber-300 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Misiunea ta de azi: </strong>
                {currentStageDetail.gardenerTask}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
