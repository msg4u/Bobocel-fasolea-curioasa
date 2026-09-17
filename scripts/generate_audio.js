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

const clips = [
  {
    filename: 'tickle.wav',
    text: 'Hihihi! Mă gâdili la burtică! Mulțumesc că ai grijă de mine!'
  },
  {
    filename: 'stage_0.wav',
    text: 'Zzz... Ce bine e la căldurică, dar visez la soare și la frunze verzi!'
  },
  {
    filename: 'stage_1.wav',
    text: 'Mmm, ce apă delicioasă! Burtica mea se umflă ca o gogoșică pufoasă!'
  },
  {
    filename: 'stage_2.wav',
    text: 'Aoleu, poc! Mi-a crăpat hăinuța! Dar nu mă doare, mă simt mai liber!'
  },
  {
    filename: 'stage_4.wav',
    text: 'Uite piciorușul meu alb! Cobor adânc ca să mă țin bine de sticlă și să beau apă!'
  },
  {
    filename: 'stage_7.wav',
    text: 'Salutare, lumii mari! Văd soarele! Frunzulițele mele verzi bat din palme de bucurie!'
  },
  {
    filename: 'stage_14.wav',
    text: 'Sunt un voinic! Am crescut mare exact cum visasem! Vreau o casă nouă cu pământ negru și bogat!'
  },
  {
    filename: 'action_water.wav',
    text: 'Plop-plop! Ai adăugat stropi proaspeți de apă! Prosopelul e bine umezit!'
  },
  {
    filename: 'action_sun.wav',
    text: 'Soarele călduț strălucește frumos! Bobocel zâmbește bucuros spre lumină!'
  },
  {
    filename: 'story_1.wav',
    text: 'Visul din Sacul cu Minuni. Într-un sac de bucătărie, printre multe alte boabe de fasole, stătea un bob mic și curios pe nume Bobocel. Toate celelalte boabe dormeau liniștite, tari și uscate, dar Bobocel visa mereu cu ochii deschiși! Vreau să văd lumea de afară! Vreau să cresc mare, mărișor și voinic!'
  },
  {
    filename: 'story_2.wav',
    text: 'Căsuța de Sticlă și Prosopelul Moale. Într-o zi, o mână caldă și prietenoasă de copil l-a luat pe Bobocel din sac și l-a așezat cu multă grijă lângă peretele unui borcan de sticlă, pe un prosop moale și umed. Bobocel a căscat uimit! Ce e asta? Mă simt ciudat și răcoros! Simt cum apa îmi pătrunde încet în cămășuță!'
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
    text: 'Spre Soare: Tulpinița Mândră! Zilele treceau, iar rădăcina lui Bobocel creștea tot mai mult în jos, ca o mânuță care se agăța bine. Apoi, într-o dimineață aurie, Bobocel a simțit ceva nou-nouț împingând în sus, spre lumină — o tulpină verde, crocantă și mândră! Uraaa! Acum văd lumina soarelui! Ce călduț și bine este afară!'
  },
  {
    filename: 'story_6.wav',
    text: 'Visul Devine Realitate: Micul Grădinar. În fiecare zi, copilul care avea grijă de el venea să-l picure cu stropitoarea, să-l admire și să noteze în jurnalul său magic tot ce vedea. Iar Bobocel creștea, creștea, creștea — dintr-un bob uscat a devenit o plantă adevărată, gata să vadă lumea mare! Mulțumesc, dragul meu grădinar! Împreună suntem o echipă de neoprit!'
  }
];

const outDir = path.resolve('public/audio');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log(`Starting generation of ${clips.length} audio clips with gemini-3.1-flash-tts-preview (voice: Kore)...`);
  for (let i = 0; i < clips.length; i++) {
    const item = clips[i];
    const targetFile = path.join(outDir, item.filename);
    if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 1000) {
      console.log(`[${i + 1}/${clips.length}] Already exists: ${item.filename}`);
      continue;
    }

    console.log(`[${i + 1}/${clips.length}] Generating ${item.filename}...`);
    let success = false;
    let attempts = 0;
    while (!success && attempts < 5) {
      attempts++;
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-tts-preview',
          contents: [{ parts: [{ text: item.text }] }],
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
        if (!b64) {
          console.error(`Failed to get audio data for ${item.filename}`);
          break;
        }

        const pcm = Buffer.from(b64, 'base64');
        const wav = pcmToWav(pcm);
        fs.writeFileSync(targetFile, wav);
        console.log(`✓ Saved ${item.filename} (${wav.length} bytes)`);
        success = true;
        // Wait 22 seconds between requests to stay safely under 3 requests/minute free tier limit
        console.log('Waiting 22 seconds for quota pacing...');
        await new Promise(res => setTimeout(res, 22000));
      } catch (err) {
        console.warn(`[Attempt ${attempts}] 429 or error for ${item.filename}:`, err.message || err);
        console.log('Waiting 45 seconds for rate limit reset...');
        await new Promise(res => setTimeout(res, 45000));
      }
    }
  }
  console.log('Audio generation completed!');
}

run();
