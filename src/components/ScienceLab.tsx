import React, { useState } from 'react';
import { GUIDED_QUESTIONS } from '../data/guideData';
import { soundEngine, speakRomanian, stopSpeaking } from '../utils/audio';
import { Sparkles, Sun, Moon, HelpCircle, CheckCircle2, ChevronDown, ChevronUp, Award, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ScienceLab() {
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>('q1');
  const [activeListeningQuestionId, setActiveListeningQuestionId] = useState<string | null>(null);
  const [controlGroupView, setControlGroupView] = useState<'light' | 'dark' | 'compare'>('compare');
  const [quizScore, setQuizScore] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, boolean>>({});

  const quizQuestions = [
    {
      id: 1,
      question: 'De ce are nevoie Bobocel la început pentru a se trezi din somnul adânc?',
      options: [
        { text: 'De înghețată de vanilie 🍦', correct: false },
        { text: 'De apă și un prosopel umed 💧', correct: true },
        { text: 'De ochelari de soare 😎', correct: false }
      ],
      explanation: 'Corect! Apa pătrunde în coajă prin imbibiție și trezește bobul la viață!'
    },
    {
      id: 2,
      question: 'În ce direcție crește rădăcina cea albă?',
      options: [
        { text: 'În jos, spre pământ și apă (Gravitropism) ⬇️', correct: true },
        { text: 'În sus, spre nori ☁️', correct: false },
        { text: 'În cerc, făcând piruete 🌀', correct: false }
      ],
      explanation: 'Excelent! Rădăcina simte gravitația pământului și caută hrana adâncă!'
    },
    {
      id: 3,
      question: 'De ce își întinde tulpina verde gâtul spre fereastră?',
      options: [
        { text: 'Vrea să vadă vecinii de afară 🏢', correct: false },
        { text: 'Iubește lumina soarelui pentru hrană (Fototropism) ☀️', correct: true },
        { text: 'Îi place frigul de la geam ❄️', correct: false }
      ],
      explanation: 'Bravo! Frunzele folosesc lumina soarelui pentru fotosinteză!'
    }
  ];

  const handleAnswer = (qIndex: number, isCorrect: boolean) => {
    if (answeredQuestions[qIndex]) return;

    if (isCorrect) {
      soundEngine.playFanfare();
      setQuizScore((prev) => prev + 1);
      confetti({ particleCount: 50, spread: 60 });
    } else {
      soundEngine.playPop();
    }

    setAnsweredQuestions((prev) => ({ ...prev, [qIndex]: true }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-7">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-emerald-100 via-teal-50 to-sky-100 rounded-3xl p-5 sm:p-6 border-2 border-emerald-300 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-950 font-black text-xs uppercase tracking-wider inline-flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              Laboratorul Biologilor Isteți
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-emerald-950">
              Misterele Germinării & Ghidul Adultului
            </h2>
            <p className="text-sm sm:text-base text-emerald-900/80 font-medium max-w-2xl mt-1">
              Înțelege știința din spatele poveștii lui Bobocel prin dialoguri captivante și experimentul cu grup de control.
            </p>
          </div>
        </div>
      </div>

      {/* Control Group Experiment: Light vs Dark Closet */}
      <div className="bg-white rounded-3xl p-6 border-3 border-amber-200 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-xs font-bold uppercase">
              🧪 Experimentul Secret
            </span>
            <h3 className="font-heading text-xl font-black text-amber-950 mt-1">
              Bobocel la Lumină vs. Fratele din Dulapul Întunecat
            </h3>
          </div>

          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
            <button
              onClick={() => setControlGroupView('compare')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                controlGroupView === 'compare' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              Comparație ⚖️
            </button>
            <button
              onClick={() => setControlGroupView('light')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                controlGroupView === 'light' ? 'bg-amber-400 text-amber-950 shadow-xs' : 'text-stone-600'
              }`}
            >
              La Fereastră ☀️
            </button>
            <button
              onClick={() => setControlGroupView('dark')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                controlGroupView === 'dark' ? 'bg-slate-700 text-white shadow-xs' : 'text-stone-600'
              }`}
            >
              În Dulap 🚪
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          Plantați în paralel doi „Bobocei” — unul lângă fereastră și unul ascuns într-un dulap întunecat. Iată ce descoperă micii cercetători după 7 zile:
        </p>

        {/* Visual comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Light Plant: Bobocel */}
          {(controlGroupView === 'compare' || controlGroupView === 'light') && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-amber-900 flex items-center gap-1">
                  <Sun className="w-4 h-4 text-amber-600" />
                  Bobocel (La Fereastră cu Soare)
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Sănătos & Voinic
                </span>
              </div>

              {/* Plant SVG Illustration (Healthy green) */}
              <div className="h-44 bg-linear-to-b from-sky-100 to-amber-100 rounded-xl flex items-center justify-center p-2 border border-amber-200 relative overflow-hidden">
                <div className="absolute top-2 right-2 text-xl">☀️</div>
                <svg viewBox="0 0 160 140" className="w-36 h-36">
                  {/* Stem */}
                  <path d="M80 130 Q82 80 85 30" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
                  {/* Big green leaves */}
                  <path d="M85 30 Q115 15 120 38 Q100 48 85 35" fill="#22c55e" stroke="#166534" strokeWidth="2" />
                  <path d="M85 32 Q55 15 50 38 Q70 48 85 35" fill="#16a34a" stroke="#166534" strokeWidth="2" />
                  <path d="M82 70 Q105 58 110 75 Q95 82 82 72" fill="#22c55e" stroke="#166534" strokeWidth="1.5" />
                  {/* Bean base and roots */}
                  <ellipse cx="80" cy="125" rx="12" ry="8" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                  <path d="M80 130 Q82 138 80 140" stroke="#ffffff" strokeWidth="2" fill="none" />
                </svg>
              </div>

              <div className="text-xs space-y-1 text-amber-950">
                <p><strong>Culoare:</strong> Verde intens, plin de clorofilă proaspătă.</p>
                <p><strong>Tulpină:</strong> Robustă, scurtă și puternică.</p>
                <p><strong>Concluzie:</strong> Are destulă lumină pentru fotosinteză!</p>
              </div>
            </div>
          )}

          {/* Dark Plant: Sibling in the dark closet */}
          {(controlGroupView === 'compare' || controlGroupView === 'dark') && (
            <div className="p-4 rounded-2xl bg-stone-100 border-2 border-stone-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-stone-700 flex items-center gap-1">
                  <Moon className="w-4 h-4 text-stone-500" />
                  Fratele lui Bobocel (În Dulap)
                </span>
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  Etiolat (Alungit)
                </span>
              </div>

              {/* Plant SVG Illustration (Pale, tall, spindly, yellow) */}
              <div className="h-44 bg-linear-to-b from-stone-200 to-stone-300 rounded-xl flex items-center justify-center p-2 border border-stone-300 relative overflow-hidden">
                <div className="absolute top-2 right-2 text-xl">🚪</div>
                <svg viewBox="0 0 160 140" className="w-36 h-36">
                  {/* Very tall thin pale stem */}
                  <path d="M80 135 Q90 70 78 15" stroke="#fef08a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  {/* Tiny pale yellowish leaves */}
                  <path d="M78 15 Q95 5 95 18 Q85 22 78 18" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
                  <path d="M78 16 Q62 5 62 18 Q72 22 78 18" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
                  {/* Bean base */}
                  <ellipse cx="80" cy="130" rx="10" ry="7" fill="#fde047" stroke="#ca8a04" strokeWidth="1.2" />
                </svg>
              </div>

              <div className="text-xs space-y-1 text-stone-700">
                <p><strong>Culoare:</strong> Galben-palid / albicios (nu are clorofilă!).</p>
                <p><strong>Tulpină:</strong> Foarte lungă, subțire și fragilă (etiolată).</p>
                <p><strong>Concluzie:</strong> Tulpina s-a alungit disperată căutând o rază de soare!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Guided Questions for Parents and Teachers */}
      <div className="bg-white rounded-3xl p-6 border-2 border-purple-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-900 text-xs font-bold uppercase">
              👨‍👧 Ghid pentru Părinte / Educator
            </span>
            <h3 className="font-heading text-xl font-black text-purple-950 mt-1">
              Întrebările Fermecate din Poveste
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          Pune-i copilului aceste întrebări în timp ce udați sau priviți borcanul. Apasă pe fiecare pentru răspunsul și explicația științifică:
        </p>

        <div className="space-y-3">
          {GUIDED_QUESTIONS.map((q) => {
            const isExpanded = expandedQuestionId === q.id;
            return (
              <div
                key={q.id}
                className="border-2 rounded-2xl transition-colors overflow-hidden border-stone-200 hover:border-purple-300"
              >
                <button
                  onClick={() => {
                    soundEngine.playPop();
                    setExpandedQuestionId(isExpanded ? null : q.id);
                  }}
                  className="w-full text-left p-4 bg-stone-50/70 hover:bg-purple-50/50 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-stone-900">
                        {q.question}
                      </h4>
                      <p className="text-xs text-purple-700 italic mt-0.5">
                        {q.kidFriendlyPrompt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (activeListeningQuestionId === q.id) {
                          stopSpeaking();
                          setActiveListeningQuestionId(null);
                        } else {
                          setActiveListeningQuestionId(q.id);
                          const text = `${q.question}. ${q.answerHint}`;
                          speakRomanian(text, () => setActiveListeningQuestionId(null));
                        }
                      }}
                      className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                        activeListeningQuestionId === q.id
                          ? 'bg-purple-600 text-white animate-pulse'
                          : 'bg-purple-100 hover:bg-purple-200 text-purple-800'
                      }`}
                      title={activeListeningQuestionId === q.id ? 'Oprește vocea' : 'Ascultă întrebarea și răspunsul'}
                    >
                      {activeListeningQuestionId === q.id ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-purple-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 bg-white border-t border-purple-100 space-y-3 text-xs sm:text-sm">
                    <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-purple-950 font-medium">
                      <strong className="block text-purple-900 mb-1 font-bold">
                        Cum îi explici copilului:
                      </strong>
                      {q.answerHint}
                    </div>
                    <div className="text-stone-600 text-xs">
                      <strong className="text-stone-800">Conceptul biologic: </strong>
                      {q.deepMeaning}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Fun Kid Quiz */}
      <div className="bg-linear-to-b from-amber-50 to-orange-50 rounded-3xl p-6 border-3 border-amber-300 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-600" />
            <h3 className="font-heading text-lg sm:text-xl font-black text-amber-950">
              Mini-Quizul Grădinarului Isteț
            </h3>
          </div>
          <span className="text-xs font-black bg-amber-200 text-amber-900 px-3 py-1 rounded-full">
            Scor: {quizScore} / {quizQuestions.length} ⭐
          </span>
        </div>

        <div className="space-y-4">
          {quizQuestions.map((q, idx) => {
            const isAnswered = answeredQuestions[idx];
            return (
              <div key={q.id} className="bg-white p-4 rounded-2xl border border-amber-200 space-y-2.5">
                <p className="font-bold text-sm text-stone-900">
                  {idx + 1}. {q.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      disabled={isAnswered}
                      onClick={() => handleAnswer(idx, opt.correct)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                        isAnswered
                          ? opt.correct
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                            : 'bg-stone-50 border-stone-200 text-stone-400 opacity-60'
                          : 'bg-stone-50 hover:bg-amber-100 border-stone-200 text-stone-800'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>

                {isAnswered && (
                  <div className="text-xs text-emerald-800 font-bold flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
