import { CraftStep, GuidedQuestion, GrowthStageDetail } from '../types';

export const CRAFT_MATERIALS = [
  {
    id: 'jar',
    name: 'Un borcan de sticlă transparent',
    emoji: '🫙',
    detail: 'Borcan de gem spălat bine și uscat — noua căsuță a lui Bobocel prin care putem spiona rădăcinile!',
    category: 'Căsuța'
  },
  {
    id: 'napkin',
    name: 'Prosoape de hârtie sau vată moale',
    emoji: '🧻',
    detail: 'Salteaua pufoasă a lui Bobocel pe care o menținem umedă ca o piscină răcoroasă.',
    category: 'Așternut'
  },
  {
    id: 'beans',
    name: '3 - 4 boabe de fasole uscată',
    emoji: '🫘',
    detail: 'Bobocel și frații lui somnoroși din cămara bucătăriei (fasole albă sau pestriță).',
    category: 'Personajele'
  },
  {
    id: 'water',
    name: 'Apă proaspătă',
    emoji: '💧',
    detail: 'Băutura magică care trezește boabele din somnul lor adânc.',
    category: 'Hrana'
  },
  {
    id: 'journal',
    name: 'Un caiet mic sau fișe pentru jurnal',
    emoji: '📓',
    detail: 'Jurnalul de explorator unde notăm și desenăm fiecare schimbare a lui Bobocel.',
    category: 'Misiunea'
  },
  {
    id: 'crayons',
    name: 'Creioane colorate și carioci',
    emoji: '🖍️',
    detail: 'Pentru a desena codița albă, tulpina verde și soarele zâmbitor!',
    category: 'Artă'
  },
  {
    id: 'label',
    name: 'Etichetă sau abțibild personalizat',
    emoji: '🏷️',
    detail: '„Grădina Fermecată a lui [Nume Copil]” — o lipim mândri pe sticlă!',
    category: 'Decor'
  }
];

export const CRAFT_STEPS: CraftStep[] = [
  {
    number: 1,
    title: 'Pregătește interiorul borcanului',
    shortDesc: 'Prosopelul umed pe peretele borcanului',
    detailedText:
      'Umezește bine un prosop de hârtie (sau mai multe straturi de vată) sub robinet, stoarce excesul (să fie umed, nu băltoacă!) și lipește-l cu grijă pe toată suprafața interioară a borcanului, presându-l ușor de sticlă.',
    funTip: 'Sfat haios: Asigură-te că prosopelul stă bine lipit de pereți, ca o tapiterie de castel!',
    iconName: 'Sparkles'
  },
  {
    number: 2,
    title: 'Așază-l pe Bobocel și pe frații lui',
    shortDesc: 'Strecoară boabele la jumătatea înălțimii',
    detailedText:
      'Strecoară cu degețelele 3-4 boabe de fasole între prosopul umed și peretele de sticlă, la o distanță de câțiva centimetri una de cealaltă, la aproximativ jumătatea borcanului. Astfel vei putea vedea clar cum crapă coaja lui Bobocel!',
    funTip: 'Sfat haios: Lasă spațiu între ele, ca fiecare boabă să aibă loc să se întindă și să nu-și dea coate!',
    iconName: 'Bean'
  },
  {
    number: 3,
    title: 'Adaugă puțină apă pe fund',
    shortDesc: '2-3 cm de apă la fundul borcanului',
    detailedText:
      'Toarnă cu grijă puțină apă la fundul borcanului (aproximativ 2-3 cm). Hârtia va trage apa în sus ca printr-un pai magic (prin capilaritate!), fără ca boabele să stea înecate în apă.',
    funTip: 'Sfat haios: Dacă boabele stau complet sub apă, se vor sufoca! Ele au nevoie și de aer proaspăt pentru a respira.',
    iconName: 'Droplets'
  },
  {
    number: 4,
    title: 'Așază borcanul la lumină',
    shortDesc: 'Pe pervaz, luminat dar ferit de caniculă',
    detailedText:
      'Pune borcanul într-un loc călduț și luminos, lângă o fereastră, dar nu în bătaia unui soare arzător toată ziua, ca să nu se usuce prea repede hârtia.',
    funTip: 'Sfat haios: Bobocel vrea să facă plajă blândă, nu să fie copt la cuptor!',
    iconName: 'Sun'
  },
  {
    number: 5,
    title: 'Creează Jurnalul lui Bobocel',
    shortDesc: 'Desenează zilnic ce observi',
    detailedText:
      'În fiecare zi (sau la două zile), deschide jurnalul și desenează ce s-a schimbat: Ziua 1 (Bobul doarme și se umflă?), Ziua 3-4 (S-a crăpat coaja? A apărut rădăcina albă?), Ziua 7 (Ce culoare are tulpina? Au apărut frunze?).',
    funTip: 'Sfat haios: Fă-i lui Bobocel o față zâmbitoare în desen în fiecare zi!',
    iconName: 'BookOpen'
  },
  {
    number: 6,
    title: 'Menține umezeala zilnic',
    shortDesc: 'Fii grădinarul responsabil!',
    detailedText:
      'Verificați zilnic împreună dacă prosopul e încă jilav și umed. Adăugați cu o linguriță sau o seringă curată/stropitoare câțiva stropi de apă când e nevoie. Exact ca grădinarul iubitor din poveste!',
    funTip: 'Sfat haios: Dacă atingi prosopul și e rece și umed la deget, e perfect!',
    iconName: 'HeartHandshake'
  }
];

export const GUIDED_QUESTIONS: GuidedQuestion[] = [
  {
    id: 'q1',
    question: 'Ce crezi că simte Bobocel când i se crapă coaja?',
    kidFriendlyPrompt: 'Oare îl doare sau e bucuros că iese din hăinuța veche?',
    deepMeaning:
      'Ajută copilul să empatizeze cu schimbarea și creșterea. În natură, creșterea implică desfacerea învelișului vechi (tegumentul), iar teama inițială a lui Bobocel se transformă în mândrie.',
    answerHint:
      '„La început s-a speriat puțin crezând că se rupe, dar apoi a simțit libertate! Este exact ca atunci când ție îți rămân pantofiorii mici pentru că ai crescut!”'
  },
  {
    id: 'q2',
    question: 'De ce crezi că rădăcina crește în jos, și nu în sus ca tulpina?',
    kidFriendlyPrompt: 'Cum știe rădăcina unde e fundul borcanului dacă e într-o căsuță de sticlă?',
    deepMeaning:
      'Introduce conceptul de gravitropism (geotropism). Celulele din vârful rădăcinii simt atracția pământului și știu că adânc în pământ se află apa și hrana stabilă.',
    answerHint:
      '„Rădăcina are mici senzori magici de gravitație care îi spun: mergi în jos ca să te ancorezi bine și să găsești băuturică delicioasă!”'
  },
  {
    id: 'q3',
    question: 'Ce s-ar întâmpla cu Bobocel dacă uităm să-l udăm câteva zile?',
    kidFriendlyPrompt: 'Dacă prosopelul devine uscat ca un biscuite?',
    deepMeaning:
      'Dezvoltă simțul responsabilității, al grijii față de alte ființe vii și înțelegerea rolului apei în fotosinteză și turgescență celulară.',
    answerHint:
      '„Fără apă, Bobocel ar deveni trist, s-ar ofili și nu ar mai putea împinge tulpina în sus. De aceea el are nevoie de un prieten grădinar de nădejde ca tine!”'
  },
  {
    id: 'q4',
    question: 'Cum crezi că se simte Bobocel acum, când vede în sfârșit lumina soarelui?',
    kidFriendlyPrompt: 'După ce a stat în sacul întunecos și a urcat spre marginea borcanului?',
    deepMeaning:
      'Explică fototropismul și bucuria îndeplinirii unui vis prin efort pas cu pas. Copilul leagă soarele de fotosinteză și viață.',
    answerHint:
      '„Este cel mai fericit din lume! Frunzele lui verzi sunt ca niște mici panouri solare care absorb lumina pentru a fabrica mâncare dulce pentru plantă.”'
  }
];

export const GROWTH_STAGES: GrowthStageDetail[] = [
  {
    day: 0,
    label: 'Ziua 0',
    title: 'Somnul cel dulce în sac',
    beanState: 'Bob mic, uscat și tare, dormind liniștit.',
    bobocelSpeech: 'Zzz... Ce bine e la căldurică, dar visez la soare și la frunze verzi!',
    scientificExplanation: 'Stadiul de latență (dormance): Bobul are o umiditate scăzută (sub 10%) și așteaptă semnalul apei.',
    gardenerTask: 'Pregătește borcanul curat și așternutul de șervețel moale.'
  },
  {
    day: 1,
    label: 'Ziua 1',
    title: 'Baia magică și umflarea',
    beanState: 'Bobul a absorbit apa, s-a mărit de aproape două ori și s-a rotunjit.',
    bobocelSpeech: 'Mmm, ce apă delicioasă! Burtica mea se umflă ca o gogoșică pufoasă!',
    scientificExplanation: 'Imbibiția: Apa pătrunde prin micropil, trezind enzimele care metabolizează amidonul.',
    gardenerTask: 'Verifică dacă prosopelul are destulă umezeală și nu s-a uscat.'
  },
  {
    day: 2,
    label: 'Ziua 2',
    title: 'Poc! Cămășuța se crapă',
    beanState: 'Coaja (tegumentul) a cedat sub presiunea internă și s-a despicat ușor.',
    bobocelSpeech: 'Aoleu, poc! Mi-a crăpat hăinuța! Dar nu mă doare, mă simt mai liber!',
    scientificExplanation: 'Ruperea tegumentului: Volumul cotiledoanelor crește și permite ieșirea radiculei embrionare.',
    gardenerTask: 'Privește atent prin lupă sau de aproape crăpătura din marginea bobului.'
  },
  {
    day: 4,
    label: 'Ziua 3-4',
    title: 'Rădăcinuța exploratoare (Geotropism)',
    beanState: 'O rădăcină albă, netedă, crește cu curaj în jos spre fundul borcanului.',
    bobocelSpeech: 'Uite piciorușul meu alb! Cobor adânc ca să mă țin bine de sticlă și să beau apă!',
    scientificExplanation: 'Creșterea radiculei orientată gravitațional (gravitropism pozitiv). Apar perii absorbanți fini.',
    gardenerTask: 'Măsoară lungimea rădăcinii cu o riglă transparentă pusă pe exteriorul borcanului!'
  },
  {
    day: 7,
    label: 'Ziua 6-7',
    title: 'Tulpinița curajoasă & Primele frunzulițe',
    beanState: 'Tulpina verde a ieșit din bob și se înalță mândră spre cer, purtând două frunze mici.',
    bobocelSpeech: 'Salutare, lumii mari! Văd soarele! Frunzulițele mele verzi bat din palme de bucurie!',
    scientificExplanation: 'Germinație epigeică: Hipocotilul se curbează și trage cotiledoanele în sus, căutând lumina (fototropism pozitiv).',
    gardenerTask: 'Rotește borcanul cu o jumătate de tură și vezi cum tulpina se întoarce din nou spre lumină în următoarele zile!'
  },
  {
    day: 14,
    label: 'Ziua 14+',
    title: 'Plăntuță adevărată gata de ghiveci!',
    beanState: 'Sistem radicular bogat, tulpină înaltă, frunze mari late și verzi.',
    bobocelSpeech: 'Sunt un voinic! Am crescut mare exact cum visasem! Vreau o casă nouă cu pământ negru și bogat!',
    scientificExplanation: 'Planta autonomă: Cotiledoanele s-au uscat, iar frunzele realizează fotosinteză completă.',
    gardenerTask: 'Marea Misiune: Plantează-l pe Bobocel într-un ghiveci cu pământ fertil pentru a culege păstăi!'
  }
];
