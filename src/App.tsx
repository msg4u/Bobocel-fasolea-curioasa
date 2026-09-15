import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StoryView } from './components/StoryView';
import { JarSimulator } from './components/JarSimulator';
import { GardenerJournal } from './components/GardenerJournal';
import { CraftGuide } from './components/CraftGuide';
import { ScienceLab } from './components/ScienceLab';
import { GrowthStage } from './types';
import { soundEngine, speakRomanian } from './utils/audio';
import storyHeroImg from './assets/images/bobocel_jar_scene_1789471500619.jpg';
import mascotImg from './assets/images/bobocel_yellow_bean_1789471488121.jpg';
import { BobocelAvatar } from './components/BobocelAvatar';
import { Sparkles, Heart, HelpCircle, BookOpen, Droplet, SunMedium } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<'story' | 'simulator' | 'journal' | 'craft' | 'lab'>('story');
  const [currentDay, setCurrentDay] = useState<GrowthStage>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [gardenerName, setGardenerName] = useState<string>(() => {
    return localStorage.getItem('bobocel_gardener_name') || 'Matei';
  });
  const [showTickleToast, setShowTickleToast] = useState(false);

  useEffect(() => {
    localStorage.setItem('bobocel_gardener_name', gardenerName);
  }, [gardenerName]);

  useEffect(() => {
    soundEngine.soundEnabled = soundEnabled;
  }, [soundEnabled]);

  const handleTickleMascot = () => {
    soundEngine.playGiggle();
    setShowTickleToast(true);
    speakRomanian('Hihihi! Mă gâdili la burtică! Mulțumesc că ai grijă de mine!');
    setTimeout(() => {
      setShowTickleToast(false);
    }, 2500);
  };

  const handleGoToSimulatorFromStory = (day: number) => {
    const validDay = (day === 0 || day === 1 || day === 2 || day === 4 || day === 7 || day === 14) ? (day as GrowthStage) : 1;
    setCurrentDay(validDay);
    setActiveTab('simulator');
    soundEngine.playPop();
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-emerald-50/40 to-sky-50 text-stone-900 flex flex-col font-sans">
      {/* Top Friendly Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          soundEngine.playPop();
          setActiveTab(tab);
        }}
        gardenerName={gardenerName}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onTickleMascot={handleTickleMascot}
      />

      {/* Floating Tickle Toast */}
      {showTickleToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-400 border-2 border-amber-600 text-amber-950 px-5 py-2.5 rounded-2xl shadow-xl font-heading font-extrabold text-sm sm:text-base flex items-center gap-2 animate-bounce">
          <span>🤭</span>
          <span>Hihihi! Bobocel chicotește fericit: „Gâdili-gâdili!”</span>
        </div>
      )}

      {/* Hero Welcome Ribbon for Kids */}
      <section className="max-w-6xl mx-auto px-4 pt-4 pb-2 w-full">
        <div className="relative rounded-3xl bg-linear-to-r from-amber-200/90 via-emerald-200/80 to-teal-100 p-4 sm:p-5 border-2 border-amber-300 shadow-sm flex flex-wrap items-center justify-between gap-4 overflow-hidden">
          {/* Background art glow */}
          <div className="flex items-center gap-4 z-10">
            <div
              onClick={handleTickleMascot}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-md border-2 border-white bg-linear-to-b from-amber-100 to-amber-200 cursor-pointer hover:scale-110 active:scale-95 transition-transform flex items-center justify-center p-1 group"
              title="Apasă pe Bobocel ca să-l gâdili!"
            >
              <BobocelAvatar size="100%" className="group-hover:rotate-6 transition-transform" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-black text-xl sm:text-2xl lg:text-3xl text-amber-950 tracking-tight">
                  Bobocel, Fasolea Care Voia Să Vadă Lumea
                </h1>
                <span className="hidden md:inline-block text-xl">🌱</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-800 font-semibold mt-0.5 max-w-xl">
                Aventura magică a unui bob curios: pune-l în borcan, udă-i prosopelul, ține-i jurnalul și privește-l cum crește spre soare!
              </p>
            </div>
          </div>

          {/* Quick Action Pills */}
          <div className="flex items-center gap-2 z-10 ml-auto">
            <button
              onClick={() => {
                soundEngine.playWaterDrop();
                setActiveTab('simulator');
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-sky-50 text-sky-900 border border-sky-300 font-bold text-xs shadow-xs transition-transform active:scale-95"
            >
              <Droplet className="w-3.5 h-3.5 text-sky-600 fill-sky-600" />
              <span>Udă-l pe Bobocel!</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playSunChime();
                setActiveTab('journal');
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
            >
              <SunMedium className="w-3.5 h-3.5" />
              <span>Jurnalul Tău 📓</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Tab Content View */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {activeTab === 'story' && (
          <div className="space-y-6">
            <StoryView onGoToSimulator={handleGoToSimulatorFromStory} />

            {/* Visual Hero Book Cover Banner */}
            <div className="bg-white/80 rounded-3xl p-5 border-2 border-amber-200 shadow-sm flex flex-col md:flex-row items-center gap-5">
              <img
                src={storyHeroImg}
                alt="Ilustrația Bobocel în borcan"
                referrerPolicy="no-referrer"
                className="w-full md:w-64 h-44 rounded-2xl object-cover border-2 border-amber-300 shadow-md"
              />
              <div className="space-y-2 text-left">
                <span className="text-xs font-black uppercase text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  Poveste & Știință Împreună
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-amber-950">
                  Cum transformăm povestea într-o activitate reală acasă?
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  Copilul devine personajul din poveste — grădinarul grijuliu care umezește prosopul din borcan și desenează în fiecare zi în caiet cum Bobocel se trezește, își crapă coaja și își întinde rădăcina și tulpina spre soare!
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => {
                      soundEngine.playPop();
                      setActiveTab('craft');
                    }}
                    className="text-xs font-bold text-purple-800 bg-purple-100 hover:bg-purple-200 px-3 py-1.5 rounded-xl border border-purple-300 transition-colors"
                  >
                    ✂️ Vezi Pașii de Construcție
                  </button>
                  <button
                    onClick={() => {
                      soundEngine.playPop();
                      setActiveTab('simulator');
                    }}
                    className="text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-xl border border-emerald-300 transition-colors"
                  >
                    🫙 Deschide Borcanul Fermecat
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'simulator' && (
          <JarSimulator
            currentDay={currentDay}
            onSelectDay={setCurrentDay}
            gardenerName={gardenerName}
          />
        )}

        {activeTab === 'journal' && (
          <GardenerJournal
            gardenerName={gardenerName}
            setGardenerName={setGardenerName}
          />
        )}

        {activeTab === 'craft' && (
          <CraftGuide gardenerName={gardenerName} />
        )}

        {activeTab === 'lab' && (
          <ScienceLab />
        )}
      </main>

      {/* Cheerful Footer */}
      <footer className="mt-auto border-t-2 border-amber-200 bg-amber-100/60 py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-stone-700 font-bold text-xs sm:text-sm">
            <span>🌱</span>
            <span>„Bobocel, fasolea care voia să vadă lumea”</span>
            <span className="text-stone-400">•</span>
            <span className="text-emerald-700">Activitate educativă de germinare</span>
          </div>

          <p className="text-xs font-medium text-stone-500 flex items-center justify-center gap-1">
            Făcut cu dragoste pentru micii grădinari curioși! <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </footer>
    </div>
  );
}
