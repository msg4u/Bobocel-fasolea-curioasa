import { Volume2, VolumeX, Sparkles, BookOpen, FlaskConical, PenTool, Scissors, Heart } from 'lucide-react';
import { BobocelAvatar } from './BobocelAvatar';

interface NavbarProps {
  activeTab: 'story' | 'simulator' | 'journal' | 'craft' | 'lab';
  setActiveTab: (tab: 'story' | 'simulator' | 'journal' | 'craft' | 'lab') => void;
  gardenerName: string;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  onTickleMascot: () => void;
}

export function Navbar({
  activeTab,
  setActiveTab,
  gardenerName,
  soundEnabled,
  setSoundEnabled,
  onTickleMascot
}: NavbarProps) {
  const tabs = [
    { id: 'story' as const, label: 'Povestea lui Bobocel', icon: BookOpen, emoji: '📖', color: 'from-amber-400 to-orange-500' },
    { id: 'simulator' as const, label: 'Borcanul Fermecat', icon: Sparkles, emoji: '🫙', color: 'from-emerald-400 to-teal-500' },
    { id: 'journal' as const, label: 'Jurnalul Grădinarului', icon: PenTool, emoji: '📝', color: 'from-sky-400 to-blue-500' },
    { id: 'craft' as const, label: 'Misiunea Practică', icon: Scissors, emoji: '✂️', color: 'from-purple-400 to-pink-500' },
    { id: 'lab' as const, label: 'Laboratorul Secret', icon: FlaskConical, emoji: '🔬', color: 'from-rose-400 to-amber-500' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-amber-50/95 backdrop-blur-md border-b-2 border-amber-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Logo & Bobocel Avatar */}
          <button
            id="btn-mascot-tickle"
            onClick={onTickleMascot}
            className="flex items-center gap-2.5 text-left group cursor-pointer transition-transform hover:scale-105 active:scale-95"
            title="Apasă ca să-l gâdili pe Bobocel!"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-linear-to-tr from-amber-300 via-amber-200 to-emerald-200 p-0.5 shadow-md border-2 border-amber-300 group-hover:border-emerald-400 transition-colors flex items-center justify-center overflow-hidden">
              <BobocelAvatar size="40px" className="animate-float-gentle" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-lg sm:text-xl text-amber-950 tracking-tight">
                  Bobocel
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Fasolea Curioasă
                </span>
              </div>
              <p className="text-xs font-semibold text-amber-800/80 flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                Grădinar: <span className="text-emerald-700 font-bold">{gardenerName || 'Micul Explorator'}</span>
              </p>
            </div>
          </button>

          {/* Quick Controls: Sound toggle & Kid badge */}
          <div className="flex items-center gap-2">
            <button
              id="btn-sound-toggle"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl border text-sm font-semibold transition-all flex items-center gap-1.5 shadow-xs ${
                soundEnabled
                  ? 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200'
                  : 'bg-stone-100 border-stone-300 text-stone-500 hover:bg-stone-200'
              }`}
              title={soundEnabled ? 'Oprește sunetele' : 'Pornește sunetele'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-700" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
              <span className="hidden md:inline text-xs font-bold">
                {soundEnabled ? 'Sunete: ON' : 'Sunete: MUT'}
              </span>
            </button>
          </div>
        </div>

        {/* Tab Navigation - Big, colorful, friendly buttons */}
        <nav className="flex items-center gap-1.5 sm:gap-2 mt-2.5 overflow-x-auto pb-1 scrollbar-none" aria-label="Navigare principală">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shadow-xs ${
                  isActive
                    ? 'bg-amber-900 text-white shadow-md scale-102 ring-2 ring-amber-400/40'
                    : 'bg-white/80 hover:bg-amber-100 text-amber-900 border border-amber-200/80 hover:scale-101'
                }`}
              >
                <span className="text-base sm:text-lg transition-transform group-hover:scale-120">{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
