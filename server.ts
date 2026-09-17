import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Modality } from '@google/genai';

function pcmToWav(pcmBuffer: Buffer, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Buffer {
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = pcmBuffer.length;
  const header = Buffer.alloc(44);

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return geminiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Ensure cache folder exists
  const cacheDir = path.resolve(process.cwd(), 'public/audio/cache');
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  // Serve audio files with aggressive caching for instant playback
  app.use('/audio', express.static(path.resolve(process.cwd(), 'public/audio'), {
    maxAge: '30d',
    immutable: true
  }));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', model: 'gemini-3.1-flash-tts-preview', voice: 'Kore' });
  });

  // TTS Endpoint: synthesize Romanian speech using Gemini TTS (voice: Kore)
  app.post('/api/tts', async (req, res) => {
    try {
      const { text, id } = req.body;
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text string is required' });
      }

      const trimmedText = text.trim();
      const hash = id || crypto.createHash('sha1').update(trimmedText).digest('hex');
      const filename = `${hash}.wav`;
      const filePath = path.join(cacheDir, filename);
      const publicUrl = `/audio/cache/${filename}`;

      // 1. Check disk cache
      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
        return res.json({ url: publicUrl, cached: true });
      }

      // 2. Synthesize using Gemini TTS with model fallbacks
      const ai = getGeminiClient();
      const modelsToTry = [
        'gemini-2.5-flash-preview-tts',
        'gemini-2.5-pro-preview-tts',
        'gemini-3.1-flash-tts-preview',
      ];

      let b64Audio: string | null | undefined = null;
      for (const model of modelsToTry) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents: [{ parts: [{ text: trimmedText }] }],
            config: {
              responseModalities: [Modality.AUDIO],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Kore' }
                }
              }
            }
          });
          b64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
          if (b64Audio) break;
        } catch (modelErr) {
          console.warn(`Model ${model} failed in /api/tts:`, (modelErr as Error)?.message || modelErr);
        }
      }

      if (!b64Audio) {
        return res.status(502).json({ error: 'No audio returned from Gemini TTS models' });
      }

      const pcmBuffer = Buffer.from(b64Audio, 'base64');
      const wavBuffer = pcmToWav(pcmBuffer);

      // Save to disk cache
      fs.writeFileSync(filePath, wavBuffer);

      return res.json({ url: publicUrl, cached: false });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error('Error generating TTS:', errorMsg);
      return res.status(500).json({ error: 'Failed to synthesize speech', details: errorMsg });
    }
  });

  // Vite middleware in dev, static files in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
