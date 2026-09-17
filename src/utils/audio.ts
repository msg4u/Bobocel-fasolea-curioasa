// Kid-friendly Web Audio Synthesizer for Bobocel App

class SoundEngine {
  private ctx: AudioContext | null = null;
  public soundEnabled: boolean = true;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Water drop sound: cute "plop-pling"
  playWaterDrop() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  // Cute pop/crack when bean shell cracks
  playPop() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.09);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.11);
  }

  // Sun warmth chime: gentle ascending glockenspiel
  playSunChime() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    });
  }

  // Playful giggle / tickle sound
  playGiggle() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const freqs = [440, 554, 659, 554, 700];
    freqs.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.06;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    });
  }

  // Growth sprout whoosh
  playSprout() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.42);
  }

  // Fanfare for achievements
  playFanfare() {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const chord = [
      { f: 523.25, d: 0.12, t: 0 },
      { f: 523.25, d: 0.12, t: 0.14 },
      { f: 523.25, d: 0.12, t: 0.28 },
      { f: 659.25, d: 0.25, t: 0.42 },
      { f: 783.99, d: 0.4, t: 0.7 }
    ];

    chord.forEach(item => {
      const now = ctx.currentTime + item.t;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, now);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + item.d + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + item.d + 0.15);
    });
  }
}

export const soundEngine = new SoundEngine();

// Preloaded Audio Mappings for Gemini 3.1 Flash TTS (Voice: Kore)
export const PRELOADED_AUDIO_MAP: Record<string, string> = {
  tickle: '/audio/tickle.wav',
  stage_0: '/audio/stage_0.wav',
  stage_1: '/audio/stage_1.wav',
  stage_2: '/audio/stage_2.wav',
  stage_4: '/audio/stage_4.wav',
  stage_7: '/audio/stage_7.wav',
  stage_14: '/audio/stage_14.wav',
  action_water: '/audio/action_water.wav',
  action_sun: '/audio/action_sun.wav',
  story_1: '/audio/story_1.wav',
  story_2: '/audio/story_2.wav',
  story_3: '/audio/story_3.wav',
  story_4: '/audio/story_4.wav',
  story_5: '/audio/story_5.wav',
  story_6: '/audio/story_6.wav',
};

// Keyword mapping for instant 0ms matching of app speeches
const KEYWORD_MAP: Array<{ prefix: string; url: string }> = [
  { prefix: 'Hihihi! Mă gâdili', url: '/audio/tickle.wav' },
  { prefix: 'Zzz...', url: '/audio/stage_0.wav' },
  { prefix: 'Mmm, ce apă', url: '/audio/stage_1.wav' },
  { prefix: 'Aoleu, poc!', url: '/audio/stage_2.wav' },
  { prefix: 'Uite piciorușul', url: '/audio/stage_4.wav' },
  { prefix: 'Salutare, lumii mari!', url: '/audio/stage_7.wav' },
  { prefix: 'Sunt un voinic!', url: '/audio/stage_14.wav' },
  { prefix: 'Plop-plop!', url: '/audio/action_water.wav' },
  { prefix: 'Soarele călduț', url: '/audio/action_sun.wav' },
  { prefix: 'Visul din Sacul', url: '/audio/story_1.wav' },
  { prefix: 'Căsuța de Sticlă', url: '/audio/story_2.wav' },
  { prefix: 'Poc! Cămășuța', url: '/audio/story_3.wav' },
  { prefix: 'Piciorușul Alb', url: '/audio/story_4.wav' },
  { prefix: 'Spre Soare', url: '/audio/story_5.wav' },
  { prefix: 'Visul Devine Realitate', url: '/audio/story_6.wav' },
];

class SpeechEngine {
  private currentAudio: HTMLAudioElement | null = null;
  private currentOnEnd: (() => void) | null = null;
  private preloadedElements = new Map<string, HTMLAudioElement>();
  private textUrlCache = new Map<string, string>();
  private isSynthesizing = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initPreload();
    }
  }

  // Preload audio files so playback is 100% instant (0ms delay) on user click
  public initPreload() {
    if (typeof window === 'undefined') return;
    Object.values(PRELOADED_AUDIO_MAP).forEach((url) => {
      try {
        const audio = new Audio();
        audio.src = url;
        audio.preload = 'auto';
        this.preloadedElements.set(url, audio);
      } catch {
        // Ignore preload errors if any
      }
    });
  }

  // Find known pre-rendered URL
  private findPreloadedUrl(text: string, audioKey?: string): string | null {
    if (audioKey && PRELOADED_AUDIO_MAP[audioKey]) {
      return PRELOADED_AUDIO_MAP[audioKey];
    }
    const trimmed = text.trim();
    for (const item of KEYWORD_MAP) {
      if (trimmed.startsWith(item.prefix) || trimmed.includes(item.prefix)) {
        return item.url;
      }
    }
    if (this.textUrlCache.has(trimmed)) {
      return this.textUrlCache.get(trimmed)!;
    }
    return null;
  }

  public stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {
        // Ignore
      }
      this.currentAudio = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }
    this.currentOnEnd = null;
    this.isSynthesizing = false;
  }

  public speak(text: string, onEnd?: () => void, audioKey?: string) {
    this.stop();

    if (!text || typeof window === 'undefined') {
      if (onEnd) onEnd();
      return;
    }

    const resolvedUrl = this.findPreloadedUrl(text, audioKey);

    if (resolvedUrl) {
      // INSTANT PLAYBACK: Play immediately from preloaded audio element / cache
      this.playUrl(resolvedUrl, onEnd, text);
      return;
    }

    // Dynamic synthesis via server /api/tts using Gemini TTS with Kore voice
    this.isSynthesizing = true;
    fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text.trim(), id: audioKey }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`TTS server error: ${res.status}`);
        return res.json();
      })
      .then((data: { url?: string }) => {
        this.isSynthesizing = false;
        if (data?.url) {
          this.textUrlCache.set(text.trim(), data.url);
          this.playUrl(data.url, onEnd, text);
        } else {
          this.fallbackBrowserSpeech(text, onEnd);
        }
      })
      .catch((err) => {
        console.warn('TTS request error, falling back to browser voice:', err);
        this.isSynthesizing = false;
        // Fallback gracefully to Web Speech API if server TTS is unreachable
        this.fallbackBrowserSpeech(text, onEnd);
      });
  }

  private playUrl(url: string, onEnd?: () => void, fallbackText?: string) {
    try {
      let audio = this.preloadedElements.get(url);
      if (!audio) {
        audio = new Audio(url);
        this.preloadedElements.set(url, audio);
      }
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch {
        // Ignore
      }

      this.currentAudio = audio;
      this.currentOnEnd = onEnd || null;

      const handleEnd = () => {
        if (this.currentAudio === audio) {
          this.currentAudio = null;
        }
        if (this.currentOnEnd) {
          const cb = this.currentOnEnd;
          this.currentOnEnd = null;
          cb();
        }
      };

      audio.onended = handleEnd;
      audio.onerror = () => {
        console.warn('Audio playback error on url:', url);
        if (fallbackText) {
          this.fallbackBrowserSpeech(fallbackText, onEnd);
        } else {
          handleEnd();
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio play was interrupted or blocked:', err);
          if (fallbackText) {
            this.fallbackBrowserSpeech(fallbackText, onEnd);
          } else {
            handleEnd();
          }
        });
      }
    } catch (err) {
      console.error('Failed to play audio:', err);
      if (fallbackText) {
        this.fallbackBrowserSpeech(fallbackText, onEnd);
      } else if (onEnd) {
        onEnd();
      }
    }
  }

  private fallbackBrowserSpeech(text: string, onEnd?: () => void) {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      if (onEnd) onEnd();
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ro-RO';
      utterance.rate = 0.95;
      utterance.pitch = 1.15;
      const voices = window.speechSynthesis.getVoices();
      const roVoice = voices.find((v) => v.lang.startsWith('ro') || v.lang.includes('RO'));
      if (roVoice) utterance.voice = roVoice;
      utterance.onend = () => {
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        if (onEnd) onEnd();
      };
      window.speechSynthesis.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }
}

export const speechEngine = new SpeechEngine();

// Primary export used across all app components:
// Uses Gemini 3.1 Flash TTS (Voice: Kore) with instant 0ms pre-cached loading
export function speakRomanian(text: string, onEnd?: () => void, audioKey?: string) {
  speechEngine.speak(text, onEnd, audioKey);
}

export function stopSpeaking() {
  speechEngine.stop();
}
