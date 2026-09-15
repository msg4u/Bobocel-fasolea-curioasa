import { useState } from 'react';
import { STORY_PAGES } from '../data/storyData';
import { soundEngine, speakRomanian, stopSpeaking } from '../utils/audio';
import { ChevronLeft, ChevronRight, Volume2, Sparkles, Lightbulb, MessageCircle } from 'lucide-react';
import { BobocelAvatar } from './BobocelAvatar';
import confetti from 'canvas-confetti';

interface StoryViewProps {
  onGoToSimulator: (day: number) => void;
}

export function StoryView({ onGoToSimulator }: StoryViewProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [bobocelTickled, setBobocelTickled] = useState(false);

  const page = STORY_PAGES[currentPageIndex];

  const handleNext = () => {
    stopSpeaking();
    setIsSpeaking(false);
    if (currentPageIndex < STORY_PAGES.length - 1) {
      soundEngine.playPop();
      setCurrentPageIndex(currentPageIndex + 1);
    } else {
      soundEngine.playFanfare();
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handlePrev = () => {
    stopSpeaking();
    setIsSpeaking(false);
    if (currentPageIndex > 0) {
      soundEngine.playPop();
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handlePlayVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const fullText = `${page.title}. ${page.storyText} ${page.dialogueQuote || ''}`;
    speakRomanian(fullText, () => {
      setIsSpeaking(false);
    });
  };

  const handleTickleBobocel = () => {
    setBobocelTickled(true);
    soundEngine.playGiggle();
    setTimeout(() => setBobocelTickled(false), 700);
  };

  // Convert day string to growth stage for simulator shortcut
  const getSimulatorDay = (dayStr: string): number => {
    if (dayStr.includes('0')) return 0;
    if (dayStr.includes('1')) return 1;
    if (dayStr.includes('2')) return 2;
    if (dayStr.includes('3') || dayStr.includes('4')) return 4;
    if (dayStr.includes('6') || dayStr.includes('7')) return 7;
    return 14;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Story Book Frame */}
      <div className="bg-amber-50/80 rounded-3xl p-4 sm:p-7 border-3 border-amber-200 shadow-xl relative overflow-hidden">
        {/* Decorative corner leaves */}
        <div className="absolute top-2 left-3 text-2xl select-none opacity-40">🌱</div>
        <div className="absolute top-2 right-3 text-2xl select-none opacity-40">✨</div>

        {/* Header with chapter indicator and voice button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b-2 border-amber-200/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-amber-200 text-amber-900 font-bold text-xs uppercase tracking-wide">
              {page.badge}
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
              {page.dayEquivalent}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-voice-read"
              onClick={handlePlayVoice}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
                isSpeaking
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isSpeaking ? 'Oprește Vocea' : 'Citește cu Voce Tare'}</span>
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Bobocel Interactive Illustration / Character */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div
              id="bobocel-character-container"
              onClick={handleTickleBobocel}
              className={`relative cursor-pointer transition-transform duration-300 p-4 rounded-3xl bg-linear-to-b from-amber-100 to-amber-200/60 border-2 border-amber-300 shadow-inner flex flex-col items-center group ${
                bobocelTickled ? 'scale-115 rotate-6' : 'hover:scale-105'
              }`}
              title="Apasă pe Bobocel ca să-l gâdili!"
            >
              <div className="absolute -top-3 right-2 bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                Gâdilă-mă! 🤭
              </div>

              {/* Dynamic Expression Character matching yellow bean user reference */}
              <div className="w-48 h-48 flex items-center justify-center relative">
                {page.id >= 2 && (
                  <div className="absolute bottom-1 w-36 h-5 bg-sky-200/80 border border-sky-300 rounded-full blur-[1px]" />
                )}
                <BobocelAvatar
                  size="180px"
                  expression={page.bobocelExpression}
                  hasCrack={page.id >= 3}
                  hasRoot={page.id >= 4}
                  rootStage={page.id === 4 ? 'small' : page.id === 5 ? 'medium' : 'deep'}
                  hasStem={page.id >= 5}
                  stemStage={page.id === 5 ? 'sprout' : page.id === 6 ? 'tall' : 'none'}
                  showSproutOnHead={true}
                  className="drop-shadow-md"
                />
              </div>

              <div className="mt-2 text-xs font-black text-amber-900 bg-white/90 px-3 py-1 rounded-full border border-amber-300 shadow-xs flex items-center gap-1">
                <span>Stare:</span>
                <span className="text-emerald-700 font-bold capitalize">{page.bobocelExpression}</span>
              </div>
            </div>

            {/* Quick button to view in jar */}
            <button
              onClick={() => onGoToSimulator(getSimulatorDay(page.dayEquivalent))}
              className="mt-3 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-xl border border-emerald-300 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Spionează-l în Borcan!</span>
            </button>
          </div>

          {/* Story Text & Dialogue */}
          <div className="md:col-span-7 space-y-4">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-amber-950 leading-tight">
              {page.title}
            </h2>

            {/* Main paragraph */}
            <p className="text-base sm:text-lg text-amber-950/90 leading-relaxed font-medium bg-white/70 p-4 rounded-2xl border border-amber-200/80 shadow-xs">
              {page.storyText}
            </p>

            {/* Dialogue bubble */}
            {page.dialogueQuote && (
              <div className="bg-amber-200/70 border-2 border-amber-300 rounded-2xl p-3.5 relative shadow-xs">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 bg-amber-500 rounded-xl text-white shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-amber-900 block mb-0.5">
                      {page.speaker || 'Bobocel spune'}:
                    </span>
                    <p className="text-sm sm:text-base font-bold text-amber-950 italic">
                      {page.dialogueQuote}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Did you know box */}
            <div className="bg-emerald-50/90 border border-emerald-300 rounded-2xl p-3 text-xs sm:text-sm text-emerald-900 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-emerald-950">Știai că? </strong>
                {page.funFact}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Footer Controls */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t-2 border-amber-200/80">
          <button
            id="btn-prev-chapter"
            onClick={handlePrev}
            disabled={currentPageIndex === 0}
            className={`flex items-center gap-1 px-4 py-2.5 rounded-2xl font-bold text-sm transition-all ${
              currentPageIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-stone-200 text-stone-500'
                : 'bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-xs active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Înapoi</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {STORY_PAGES.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  stopSpeaking();
                  setIsSpeaking(false);
                  soundEngine.playPop();
                  setCurrentPageIndex(idx);
                }}
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all ${
                  idx === currentPageIndex
                    ? 'bg-amber-600 scale-125 ring-2 ring-amber-300'
                    : 'bg-amber-200 hover:bg-amber-300'
                }`}
                title={`Mergi la ${p.badge}`}
              />
            ))}
          </div>

          <button
            id="btn-next-chapter"
            onClick={handleNext}
            className="flex items-center gap-1 px-5 py-2.5 rounded-2xl font-bold text-sm bg-amber-600 hover:bg-amber-700 text-white shadow-md active:scale-95 transition-all"
          >
            <span>{currentPageIndex === STORY_PAGES.length - 1 ? 'Recitește 🌟' : 'Înainte'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
