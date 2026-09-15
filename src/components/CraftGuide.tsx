import React, { useState } from 'react';
import { CRAFT_MATERIALS, CRAFT_STEPS } from '../data/guideData';
import { soundEngine } from '../utils/audio';
import { CheckCircle, Circle, Scissors, Sparkles, Printer, Check, Info } from 'lucide-react';
import { BobocelAvatar } from './BobocelAvatar';
import confetti from 'canvas-confetti';

interface CraftGuideProps {
  gardenerName: string;
}

export function CraftGuide({ gardenerName }: CraftGuideProps) {
  const [checkedMaterials, setCheckedMaterials] = useState<Record<string, boolean>>({});
  const [activeStep, setActiveStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [labelSticker, setLabelSticker] = useState<string>('🌱');

  const toggleMaterial = (id: string) => {
    soundEngine.playPop();
    const next = { ...checkedMaterials, [id]: !checkedMaterials[id] };
    setCheckedMaterials(next);

    // Celebrate when all materials are gathered!
    const allChecked = CRAFT_MATERIALS.every((m) => next[m.id]);
    if (allChecked) {
      soundEngine.playFanfare();
      confetti({ particleCount: 70, spread: 60 });
    }
  };

  const toggleStep = (stepNumber: number) => {
    soundEngine.playPop();
    const next = { ...completedSteps, [stepNumber]: !completedSteps[stepNumber] };
    setCompletedSteps(next);

    if (stepNumber < 6 && next[stepNumber]) {
      setActiveStep(stepNumber + 1);
    } else if (next[6]) {
      soundEngine.playFanfare();
      confetti({ particleCount: 90, spread: 80 });
    }
  };

  const handlePrintLabel = () => {
    soundEngine.playFanfare();
    window.print();
  };

  const allMaterialsReady = CRAFT_MATERIALS.every((m) => checkedMaterials[m.id]);
  const currentStep = CRAFT_STEPS.find((s) => s.number === activeStep) || CRAFT_STEPS[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Introduction Banner */}
      <div className="bg-linear-to-r from-purple-100 via-pink-50 to-amber-100 rounded-3xl p-5 sm:p-6 border-2 border-purple-300 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-purple-200 text-purple-900 font-extrabold text-xs uppercase tracking-wider inline-flex items-center gap-1 mb-1.5">
            <Scissors className="w-3.5 h-3.5" />
            Activitate Practică
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-purple-950">
            Ai grijă de Bobocel și pregătește-i borcanul!
          </h2>
          <p className="text-sm sm:text-base text-purple-900/80 font-medium max-w-2xl mt-1">
            Transformă bucătăria într-un laborator de botanică magică! Copilul devine „grădinarul oficial al lui Bobocel”.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-print-craft-label"
            onClick={handlePrintLabel}
            className="px-4 py-2.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Printează Eticheta & Pașii</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Materials Checklist */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-amber-950 flex items-center gap-2">
                <span>Materiale Necesare</span>
                <span className="text-xs font-normal text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {Object.values(checkedMaterials).filter(Boolean).length} / {CRAFT_MATERIALS.length}
                </span>
              </h3>
            </div>

            <p className="text-xs text-stone-500">
              Bifează fiecare obiect pe măsură ce îl găsești în casă:
            </p>

            <div className="space-y-2">
              {CRAFT_MATERIALS.map((mat) => {
                const isChecked = !!checkedMaterials[mat.id];
                return (
                  <button
                    key={mat.id}
                    onClick={() => toggleMaterial(mat.id)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-amber-50/40'
                    }`}
                  >
                    <div className="text-2xl mt-0.5 shrink-0">{mat.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${isChecked ? 'line-through text-emerald-800' : ''}`}>
                          {mat.name}
                        </span>
                        {isChecked ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-stone-300 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">{mat.detail}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {allMaterialsReady && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-900 text-xs font-bold text-center animate-pulse">
                🎉 Ai strâns toate comorile! Ești gata de marea construcție!
              </div>
            )}
          </div>

          {/* Printable Jar Label Generator */}
          <div className="bg-amber-50/90 rounded-3xl p-5 border-2 border-amber-300 shadow-sm space-y-3">
            <h4 className="font-heading font-bold text-base text-amber-950 flex items-center gap-1.5">
              <span>🏷️ Eticheta Magică pentru Borcan</span>
            </h4>
            <p className="text-xs text-amber-900/80">
              Alege un simbol drag și lipește eticheta pe borcanul real:
            </p>

            <div className="flex items-center gap-2">
              {['🌱', '⭐', '🐞', '🌸', '✨', '🏆'].map((stk) => (
                <button
                  key={stk}
                  onClick={() => setLabelSticker(stk)}
                  className={`w-8 h-8 rounded-xl text-base flex items-center justify-center border transition-transform ${
                    labelSticker === stk
                      ? 'bg-amber-300 border-amber-500 scale-110 shadow-xs'
                      : 'bg-white border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {stk}
                </button>
              ))}
            </div>

            {/* Label Preview Container with dashed cut lines */}
            <div
              id="printable-jar-label"
              className="p-4 rounded-2xl bg-white border-2 border-dashed border-amber-400 text-center relative shadow-xs flex flex-col items-center"
            >
              <div className="w-14 h-14 -mb-1">
                <BobocelAvatar size="56px" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Căsuța de sticlă a lui Bobocel
              </span>
              <span className="font-heading text-lg font-black text-amber-950 block">
                Grădina lui: {gardenerName || 'Micul Explorator'}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold block mt-1">
                Data plantării: {new Date().toLocaleDateString('ro-RO')}
              </span>
              <div className="absolute -bottom-2.5 right-3 text-[10px] bg-amber-200 text-amber-900 px-1.5 rounded-sm font-mono">
                ✂️ decupează aici
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 6 Steps with Visual Carousel / List */}
        <div className="lg:col-span-7 space-y-4">
          {/* Active Step Card */}
          <div className="bg-white rounded-3xl p-6 border-3 border-purple-200 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-black text-xs uppercase">
                Pasul {currentStep.number} din 6
              </span>
              <button
                onClick={() => toggleStep(currentStep.number)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                  completedSteps[currentStep.number]
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-100 hover:bg-emerald-50 text-stone-700 border border-stone-200'
                }`}
              >
                {completedSteps[currentStep.number] ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Finalizat! 🎉</span>
                  </>
                ) : (
                  <span>Marchează ca gata</span>
                )}
              </button>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-black text-purple-950">
              {currentStep.title}
            </h3>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
              {currentStep.detailedText}
            </p>

            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-amber-950">Secretul Grădinarului: </strong>
                {currentStep.funTip}
              </div>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-stone-100">
              <button
                onClick={() => {
                  soundEngine.playPop();
                  setActiveStep(Math.max(1, activeStep - 1));
                }}
                disabled={activeStep === 1}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 disabled:opacity-40"
              >
                ← Pasul anterior
              </button>

              <div className="flex gap-1.5">
                {CRAFT_STEPS.map((s) => (
                  <button
                    key={s.number}
                    onClick={() => {
                      soundEngine.playPop();
                      setActiveStep(s.number);
                    }}
                    className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                      activeStep === s.number
                        ? 'bg-purple-700 text-white scale-110 shadow-xs'
                        : completedSteps[s.number]
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {s.number}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  soundEngine.playPop();
                  setActiveStep(Math.min(6, activeStep + 1));
                }}
                disabled={activeStep === 6}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-40"
              >
                Pasul următor →
              </button>
            </div>
          </div>

          {/* Quick Overview List of all 6 steps */}
          <div className="bg-white/80 rounded-3xl p-5 border-2 border-stone-200 shadow-sm space-y-2">
            <h4 className="font-heading font-bold text-sm text-stone-800">
              Harta completă a misiunii:
            </h4>
            <div className="space-y-1.5 text-xs">
              {CRAFT_STEPS.map((s) => (
                <div
                  key={s.number}
                  onClick={() => {
                    soundEngine.playPop();
                    setActiveStep(s.number);
                  }}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    activeStep === s.number
                      ? 'bg-purple-50 border-purple-300 font-bold text-purple-950'
                      : 'border-stone-100 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-900 text-[10px] font-black flex items-center justify-center">
                      {s.number}
                    </span>
                    <span>{s.shortDesc}</span>
                  </div>
                  {completedSteps[s.number] && (
                    <span className="text-emerald-600 text-xs">✓ gata</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Practical Advice: Transplanting */}
          <div className="bg-emerald-50 border border-emerald-300 rounded-3xl p-4 text-xs text-emerald-950 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-200 text-emerald-900 shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-sm font-bold block mb-1">
                Sfat practic pentru mai târziu (după 2-3 săptămâni):
              </strong>
              Dacă vrei ca planta să continue să crească sănătos și să facă păstăi cu fasole nouă, transplanteaz-o într-un ghiveci cu pământ adevărat! Povestește-i copilului: <em>„Bobocel a crescut destul de mare încât are nevoie de o casă nouă, cu pământ bogat!”</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
