import { StoryPage } from '../types';

export const STORY_PAGES: StoryPage[] = [
  {
    id: 1,
    title: 'Visul din Sacul cu Minuni',
    badge: 'Capitolul 1: Începutul',
    storyText:
      'Într-un sac de bucătărie, printre multe alte boabe de fasole, stătea un bob mic și curios pe nume Bobocel. Toate celelalte boabe dormeau liniștite, tari și uscate, dar Bobocel visa mereu cu ochii deschiși!',
    dialogueQuote: '„Vreau să văd lumea de afară! Vreau să cresc mare, mărișor și voinic!”',
    speaker: 'Bobocel',
    bobocelExpression: 'curious',
    dayEquivalent: 'Ziua 0',
    funFact: 'Știai că boabele de fasole uscate sunt de fapt mici semințe care dorm adânc până primesc apă călduță?',
    soundType: 'snore'
  },
  {
    id: 2,
    title: 'Căsuța de Sticlă și Prosopelul Moale',
    badge: 'Capitolul 2: Călătoria',
    storyText:
      'Într-o zi, o mână caldă și prietenoasă de copil l-a luat pe Bobocel din sac și l-a așezat cu multă grijă lângă peretele unui borcan de sticlă, pe un prosop moale și umed. Bobocel a căscat uimit!',
    dialogueQuote: '„Ce e asta? Mă simt ciudat și răcoros! Simt cum apa îmi pătrunde încet în cămășuță!”',
    speaker: 'Bobocel',
    bobocelExpression: 'surprised',
    dayEquivalent: 'Ziua 1',
    funFact: 'Fenomenul se numește „imbibiție”! Bobocel bea apă prin porii mici ai cojii lui și se umflă ca un balonaș.',
    soundType: 'water'
  },
  {
    id: 3,
    title: 'Poc! Cămășuța se Crapă!',
    badge: 'Capitolul 3: Marele Pas',
    storyText:
      'A doua zi, Bobocel a simțit cum coaja lui tare începe să se desfacă ușurel. S-a auzit un mic „țârrr-poc!”. Coaja i se crăpase puțin pe o parte.',
    dialogueQuote: '„Aoleu, mă rup în două! Oare o să pățesc ceva rău?!”',
    speaker: 'Bobocel speriat',
    bobocelExpression: 'worried',
    dayEquivalent: 'Ziua 2',
    funFact: 'Nu te speria, Bobocel! Cămășuța veche s-a crăpat pentru că înăuntru viața bate la ușă. Este primul pas spre o plantă uriașă!',
    soundType: 'crack'
  },
  {
    id: 4,
    title: 'Piciorușul Alb: Rădăcinuța Exploratoare',
    badge: 'Capitolul 4: Căutarea comorilor',
    storyText:
      'A treia zi, din crăpătura lui Bobocel a apărut ceva mic, alb și lucios, ca un firicel subțire și mătăsos, care a început să crească hotărât în jos, spre fundul borcanului!',
    dialogueQuote: '„Ce e asta caraghioasă care-mi iese din burtică? O codiță? O mânuță?”',
    speaker: 'Bobocel mirat',
    bobocelExpression: 'curious',
    dayEquivalent: 'Ziua 3 - 4',
    funFact: 'Este rădăcina! Plantele știu mereu unde e „jos” datorită gravitației. Rădăcina aleargă după apă și săruri minerale bune.',
    soundType: 'sprout'
  },
  {
    id: 5,
    title: 'Spre Soare: Tulpinița Mândră!',
    badge: 'Capitolul 5: Lumina Zâmbește',
    storyText:
      'Zilele treceau, iar rădăcina lui Bobocel creștea tot mai mult în jos, ca o mânuță care se agăța bine. Apoi, într-o dimineață aurie, Bobocel a simțit ceva nou-nouț împingând în sus, spre lumină — o tulpină verde, crocantă și mândră!',
    dialogueQuote: '„Uraaa! Acum văd lumina soarelui! Ce călduț și bine este afară!”',
    speaker: 'Bobocel fericit',
    bobocelExpression: 'proud',
    dayEquivalent: 'Ziua 6 - 7',
    funFact: 'Acesta este „fototropismul”! Tulpina și frunzele iubesc atât de mult soarele, încât fac acrobații doar ca să-i prindă razele!',
    soundType: 'sun'
  },
  {
    id: 6,
    title: 'Visul Devine Realitate: Micul Grădinar',
    badge: 'Capitolul 6: Victoria lui Bobocel',
    storyText:
      'În fiecare zi, copilul care avea grijă de el venea să-l picure cu stropitoarea, să-l admire și să noteze în jurnalul său magic tot ce vedea. Iar Bobocel creștea, creștea, creștea — dintr-un bob uscat a devenit o plantă adevărată, gata să vadă lumea mare!',
    dialogueQuote: '„Mulțumesc, dragul meu grădinar! Împreună suntem o echipă de neoprit!”',
    speaker: 'Bobocel & Copilul',
    bobocelExpression: 'ecstatic',
    dayEquivalent: 'Ziua 14+',
    funFact: 'Când Bobocel devine prea mare pentru borcan, el este gata să fie mutat într-un ghiveci cu pământ roditor, unde poate face chiar noi păstăi!',
    soundType: 'cheer'
  }
];

export const SIBLING_BEANS = [
  { name: 'Bobocel', personality: 'Curiosul aventurier', color: '#f59e0b', status: 'Campionul borcanului!' },
  { name: 'Bobiță', personality: 'Somnorosul dulce', color: '#10b981', status: 'Se trezește mai greuț' },
  { name: 'Bobolina', personality: 'Dansatoarea veselă', color: '#ec4899', status: 'A scos o rădăcină ondulată' },
  { name: 'Boabă-Vitează', personality: 'Sportivul cățărător', color: '#8b5cf6', status: 'Se întinde spre lumină' }
];
