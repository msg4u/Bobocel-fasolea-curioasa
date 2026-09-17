import fs from 'fs';
import path from 'path';
import { GoogleGenAI, Modality } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('Missing GEMINI_API_KEY');
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

function pcmToWav(pcmBuffer, sampleRate = 24000, numChannels = 1, bitsPerSample = 16) {
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

const storyClips = [
  {
    filename: 'story_1.wav',
    text: 'Visul din Sacul cu Minuni. Într-un sac de bucătărie, printre multe alte boabe de fasole, stătea un bob mic și curios pe nume Bobocel. Toate celelalte boabe dormeau liniștite, tari și uscate, dar Bobocel visa mereu cu ochii deschiși: Vreau să văd lumea de afară! Vreau să cresc mare, mărișor și voinic!'
  },
  {
    filename: 'story_2.wav',
    text: 'Căsuța de Sticlă și Prosopelul Moale. Într-o zi, o mână caldă și prietenoasă de copil l-a luat pe Bobocel din sac și l-a așezat cu multă grijă lângă peretele unui borcan de sticlă, pe un prosop moale și umed. Bobocel a căscat uimit: Ce e asta? Mă simt ciudat și răcoros! Simt cum apa îmi pătrunde încet în cămășuță!'
  },
  {
    filename: 'story_3.wav',
    text: 'Poc! Cămășuța se Crapă! A doua zi, Bobocel a simțit cum coaja lui tare începe să se desfacă ușurel. S-a auzit un mic țârrr-poc! Coaja i se crăpase puțin pe o parte. Aoleu, mă rup în două! Oare o să pățesc ceva rău?!'
  },
  {
    filename: 'story_4.wav',
    text: 'Piciorușul Alb: Rădăcinuța Exploratoare. A treia zi, din crăpătura lui Bobocel a apărut ceva mic, alb și lucios, ca un firicel subțire și mătăsos, care a început să crească hotărât în jos, spre fundul borcanului! Ce e asta caraghioasă care-mi iese din burtică? O codiță? O mânuță?'
  },
  {
    filename: 'story_5.wav',
    text: 'Spre Soare: Tulpinița Mândră! Zilele treceau, iar rădăcina lui Bobocel creștea tot mai mult în jos, ca o mânuță care se agăța bine. Apoi, într-o dimineață aurie, Bobocel a simțit ceva nou-nouț împingând în sus, spre lumină: o tulpină verde, crocantă și mândră! Uraaa! Acum văd lumina soarelui! Ce călduț și bine este afară!'
  },
  {
    filename: 'story_6.wav',
    text: 'Visul Devine Realitate: Micul Grădinar. În fiecare zi, copilul care avea grijă de el venea să-l picure cu stropitoarea, să-l admire și să noteze în jurnalul său magic tot ce vedea. Iar Bobocel creștea, creștea, creștea: dintr-un bob uscat a devenit o plantă adevărată, gata să vadă lumea mare! Mulțumesc, dragul meu grădinar! Împreună suntem o echipă de neoprit!'
  }
];

const outDir = path.resolve('public/audio');

async function synthesize(text) {
  const modelsToTry = [
    'gemini-2.5-flash-preview-tts',
    'gemini-2.5-pro-preview-tts',
    'gemini-3.1-flash-tts-preview'
  ];

  for (const model of modelsToTry) {
    try {
      console.log(`Trying ${model}...`);
      const response = await ai.models.generateContent({
        model,
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }
            }
          }
        }
      });
      const b64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (b64) return Buffer.from(b64, 'base64');
    } catch (err) {
      console.warn(`Model ${model} failed:`, err.message || err);
    }
  }
  return null;
}

async function run() {
  for (let i = 0; i < storyClips.length; i++) {
    const item = storyClips[i];
    const targetFile = path.join(outDir, item.filename);
    if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 5000) {
      console.log(`[${i + 1}/${storyClips.length}] Already exists: ${item.filename}`);
      continue;
    }

    console.log(`[${i + 1}/${storyClips.length}] Generating ${item.filename}...`);
    const pcm = await synthesize(item.text);
    if (pcm) {
      const wav = pcmToWav(pcm);
      fs.writeFileSync(targetFile, wav);
      console.log(`✓ Generated and saved ${item.filename} (${wav.length} bytes)`);
    } else {
      console.error(`Failed to generate ${item.filename}`);
    }
    // Small pause
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log('Finished story clips generation!');
}

run();
