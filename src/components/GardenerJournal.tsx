import React, { useState, useRef, useEffect } from 'react';
import { JournalEntry } from '../types';
import { soundEngine } from '../utils/audio';
import { PenTool, Eraser, CheckSquare, Printer, Sparkles, PlusCircle, Trash2, Heart, Award } from 'lucide-react';
import { BobocelAvatar } from './BobocelAvatar';
import confetti from 'canvas-confetti';

interface GardenerJournalProps {
  gardenerName: string;
  setGardenerName: (name: string) => void;
}

const DEFAULT_ENTRIES: JournalEntry[] = [
  {
    id: 'entry-1',
    dayNumber: 1,
    date: 'Ziua 1',
    gardenerNotes: 'Bobocel doarme pe prosopelul umed. S-a umflat puțin și e mai gras decât ieri!',
    moistureLevel: 'umed-perfect',
    sunshine: 'lumina-buna',
    heightMm: 12,
    rootSeen: false,
    stemSeen: false,
    selectedSticker: '🌱'
  },
  {
    id: 'entry-2',
    dayNumber: 3,
    date: 'Ziua 3',
    gardenerNotes: 'Ura! I-a crăpat cămășuța pe burtă și a scos un picioruș mic și alb (rădăcina)! Merge spre fundul borcanului.',
    moistureLevel: 'umed-perfect',
    sunshine: 'soare-plin',
    heightMm: 18,
    rootSeen: true,
    stemSeen: false,
    selectedSticker: '✨'
  },
  {
    id: 'entry-3',
    dayNumber: 7,
    date: 'Ziua 7',
    gardenerNotes: 'Rădăcina e albă și are multe firicele. Tulpina verde s-a înălțat spre gura borcanului și are două frunzulițe bebeluș!',
    moistureLevel: 'umed-perfect',
    sunshine: 'soare-plin',
    heightMm: 45,
    rootSeen: true,
    stemSeen: true,
    selectedSticker: '🏆'
  }
];

const STICKERS = ['🌱', '💧', '☀️', '🐞', '🌸', '✨', '🐛', '🏆', '⭐', '❤️'];
const PEN_COLORS = ['#1e293b', '#16a34a', '#f59e0b', '#0284c7', '#dc2626', '#8b5cf6', '#78350f'];

export function GardenerJournal({ gardenerName, setGardenerName }: GardenerJournalProps) {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('bobocel_journal_entries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_ENTRIES;
      }
    }
    return DEFAULT_ENTRIES;
  });

  const [activeEntryIndex, setActiveEntryIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>('#16a34a');
  const [penSize, setPenSize] = useState<number>(4);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Daily care checklist state
  const [checklist, setChecklist] = useState({
    waterCheck: true,
    sunCheck: true,
    smileCheck: false,
    noteCheck: false
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    localStorage.setItem('bobocel_journal_entries', JSON.stringify(entries));
  }, [entries]);

  // Set up canvas when index changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const currentDrawing = entries[activeEntryIndex]?.drawingUrl;
    if (currentDrawing) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = currentDrawing;
    }
  }, [activeEntryIndex]);

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = penSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveCurrentCanvas();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    soundEngine.playPop();
    saveCurrentCanvas();
  };

  const saveCurrentCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    setEntries((prev) => {
      const updated = [...prev];
      if (updated[activeEntryIndex]) {
        updated[activeEntryIndex] = {
          ...updated[activeEntryIndex],
          drawingUrl: dataUrl
        };
      }
      return updated;
    });
  };

  const handleStamp = (emoji: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.font = '36px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 60 + Math.random() * 160, 60 + Math.random() * 100);
    soundEngine.playPop();
    saveCurrentCanvas();
  };

  const handleAddNewEntry = () => {
    const nextDay = entries.length > 0 ? entries[entries.length - 1].dayNumber + 2 : 1;
    const newEntry: JournalEntry = {
      id: `entry-${Date.now()}`,
      dayNumber: nextDay,
      date: `Ziua ${nextDay}`,
      gardenerNotes: 'Azi l-am vizitat pe Bobocel! Coaja și frunzele arată minunat!',
      moistureLevel: 'umed-perfect',
      sunshine: 'soare-plin',
      heightMm: 20 + nextDay * 5,
      rootSeen: true,
      stemSeen: nextDay >= 6,
      selectedSticker: '🌱'
    };
    soundEngine.playPop();
    setEntries([...entries, newEntry]);
    setActiveEntryIndex(entries.length);
  };

  const handleDeleteCurrentEntry = () => {
    if (entries.length <= 1) return;
    soundEngine.playPop();
    const updated = entries.filter((_, idx) => idx !== activeEntryIndex);
    setEntries(updated);
    setActiveEntryIndex(Math.max(0, activeEntryIndex - 1));
  };

  const handlePrint = () => {
    soundEngine.playFanfare();
    confetti({ particleCount: 50 });
    window.print();
  };

  const currentEntry = entries[activeEntryIndex] || entries[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner: Child Gardener Badge & Custom Jar Label */}
      <div className="bg-linear-to-r from-amber-100 via-emerald-100 to-sky-100 rounded-3xl p-5 border-2 border-amber-300 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-amber-200 text-amber-950 flex items-center justify-center shadow-md border-2 border-amber-400 overflow-hidden p-0.5">
            <BobocelAvatar size="48px" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              Jurnalul Oficial al Micului Grădinar
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm sm:text-base font-bold text-stone-700">Grădina lui / a:</span>
              <input
                id="input-gardener-name"
                type="text"
                value={gardenerName}
                onChange={(e) => setGardenerName(e.target.value)}
                placeholder="Scrie numele tău..."
                className="bg-white/90 font-heading font-extrabold text-amber-950 px-3 py-1 rounded-xl border border-amber-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-base sm:text-lg max-w-[200px]"
              />
            </div>
          </div>
        </div>

        <button
          id="btn-print-journal"
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>Printează Fișa de Desen 🖨️</span>
        </button>
      </div>

      {/* Main Journal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Days Selector & Daily Checklist */}
        <div className="lg:col-span-4 space-y-4">
          {/* Day Entries List */}
          <div className="bg-white rounded-3xl p-4 border-2 border-amber-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading font-bold text-base text-amber-950">
                Pagini din Jurnal
              </h3>
              <button
                id="btn-add-journal-page"
                onClick={handleAddNewEntry}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Adaugă Zi</span>
              </button>
            </div>

            <div className="space-y-1.5">
              {entries.map((entry, idx) => {
                const isActive = activeEntryIndex === idx;
                return (
                  <button
                    key={entry.id}
                    onClick={() => {
                      soundEngine.playPop();
                      setActiveEntryIndex(idx);
                    }}
                    className={`w-full text-left p-3 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-amber-100/90 border-amber-400 text-amber-950 font-bold shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-amber-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{entry.selectedSticker}</span>
                      <div>
                        <span className="text-sm font-bold block">{entry.date}</span>
                        <span className="text-[11px] text-stone-500 truncate max-w-[150px] block">
                          {entry.gardenerNotes}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {entry.heightMm} mm
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Care Checklist */}
          <div className="bg-emerald-50 rounded-3xl p-4 border-2 border-emerald-200 shadow-sm space-y-3">
            <h4 className="font-heading font-bold text-sm text-emerald-950 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <span>Grijă Zilnică pentru Bobocel</span>
            </h4>
            <div className="space-y-2 text-xs font-semibold text-emerald-900">
              <label className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-emerald-200 cursor-pointer hover:bg-white">
                <input
                  type="checkbox"
                  checked={checklist.waterCheck}
                  onChange={(e) => setChecklist({ ...checklist, waterCheck: e.target.checked })}
                  className="rounded-sm text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Am verificat dacă prosopelul e umed 💧</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-emerald-200 cursor-pointer hover:bg-white">
                <input
                  type="checkbox"
                  checked={checklist.sunCheck}
                  onChange={(e) => setChecklist({ ...checklist, sunCheck: e.target.checked })}
                  className="rounded-sm text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Borcanul are lumină la fereastră ☀️</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-emerald-200 cursor-pointer hover:bg-white">
                <input
                  type="checkbox"
                  checked={checklist.smileCheck}
                  onChange={(e) => {
                    if (e.target.checked) soundEngine.playGiggle();
                    setChecklist({ ...checklist, smileCheck: e.target.checked });
                  }}
                  className="rounded-sm text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>I-am zis o vorbă caldă sau un pupic! 💖</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-emerald-200 cursor-pointer hover:bg-white">
                <input
                  type="checkbox"
                  checked={checklist.noteCheck}
                  onChange={(e) => setChecklist({ ...checklist, noteCheck: e.target.checked })}
                  className="rounded-sm text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Am notat schimbările în jurnal 📝</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Active Entry Details & Drawing Canvas */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-sm space-y-5">
            {/* Header of Active Entry */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl text-amber-950">
                  {currentEntry.date}
                </span>
                <span className="text-2xl">{currentEntry.selectedSticker}</span>
              </div>

              {/* Sticker Selector */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1">
                <span className="text-xs font-bold text-stone-500 mr-1">Abțibild:</span>
                {STICKERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      soundEngine.playPop();
                      setEntries((prev) => {
                        const copy = [...prev];
                        copy[activeEntryIndex].selectedSticker = s;
                        return copy;
                      });
                    }}
                    className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-transform ${
                      currentEntry.selectedSticker === s
                        ? 'bg-amber-200 scale-120 ring-1 ring-amber-400'
                        : 'hover:bg-stone-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {entries.length > 1 && (
                <button
                  onClick={handleDeleteCurrentEntry}
                  className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Șterge această pagină"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Questions from the prompt answered as observations */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wide block mb-1">
                  Ce a văzut micul grădinar azi? (Notițele tale):
                </label>
                <textarea
                  id="textarea-gardener-notes"
                  rows={2}
                  value={currentEntry.gardenerNotes}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEntries((prev) => {
                      const copy = [...prev];
                      copy[activeEntryIndex].gardenerNotes = val;
                      return copy;
                    });
                  }}
                  className="w-full p-3 rounded-2xl bg-amber-50/50 border border-amber-300 text-sm text-amber-950 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  placeholder="Scrie ce face Bobocel azi..."
                />
              </div>

              {/* Observation Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
                <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-900">
                  <span className="block text-[10px] text-sky-600 uppercase">Umezeală:</span>
                  <span>{currentEntry.moistureLevel === 'umed-perfect' ? 'Umed perfect 💦' : 'Uscat'}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                  <span className="block text-[10px] text-amber-600 uppercase">Lumină:</span>
                  <span>{currentEntry.sunshine === 'soare-plin' ? 'Soare plin ☀️' : 'Lumină bună 🌤️'}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-800">
                  <span className="block text-[10px] text-stone-500 uppercase">Rădăcină albă:</span>
                  <span>{currentEntry.rootSeen ? 'Vizibilă! 🤍' : 'Nu încă'}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <span className="block text-[10px] text-emerald-600 uppercase">Tulpiniță verde:</span>
                  <span>{currentEntry.stemSeen ? 'A apărut! 🌿' : 'În burtică'}</span>
                </div>
              </div>
            </div>

            {/* Drawing Canvas Section: "Desenează-l pe Bobocel!" */}
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-emerald-600" />
                  <span className="font-heading font-bold text-sm text-stone-800">
                    Caietul de Desen: Cum arată Bobocel azi?
                  </span>
                </div>

                {/* Stamp tools */}
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-stone-400">Ștampile:</span>
                  {['🫘', '🌱', '☀️', '💧', '❤️'].map((stamp) => (
                    <button
                      key={stamp}
                      onClick={() => handleStamp(stamp)}
                      className="text-sm px-1.5 py-0.5 rounded-md hover:bg-stone-100 border border-stone-200 transition-transform active:scale-90"
                      title={`Pune ștampila ${stamp}`}
                    >
                      {stamp}
                    </button>
                  ))}
                  <button
                    onClick={clearCanvas}
                    className="flex items-center gap-1 text-xs font-bold text-stone-600 hover:text-rose-600 bg-stone-100 hover:bg-rose-50 px-2.5 py-1 rounded-lg ml-1"
                  >
                    <Eraser className="w-3.5 h-3.5" />
                    <span>Curăță</span>
                  </button>
                </div>
              </div>

              {/* Color & Size Picker */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-50 p-2.5 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-stone-600 mr-1">Culoare:</span>
                  {PEN_COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`w-6 h-6 rounded-full transition-transform ${
                        selectedColor === c ? 'scale-125 ring-2 ring-stone-900 shadow-xs' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-600">Grosime:</span>
                  {[2, 4, 8].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setPenSize(sz)}
                      className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                        penSize === sz ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200'
                      }`}
                    >
                      {sz === 2 ? 'Subțire' : sz === 4 ? 'Mediu' : 'Gros'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Canvas Area */}
              <div className="flex justify-center">
                <canvas
                  id="drawing-canvas"
                  ref={canvasRef}
                  width={420}
                  height={220}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full max-w-[440px] h-[220px] bg-white rounded-2xl border-2 border-dashed border-amber-300 shadow-inner cursor-crosshair touch-none"
                />
              </div>
              <p className="text-[11px] text-center text-stone-500 font-medium">
                🎨 Desenează cu degetul sau mouse-ul! Poți desena coaja crăpată, rădăcinuța albă sau soarele!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
