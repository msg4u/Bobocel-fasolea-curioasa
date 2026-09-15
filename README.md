# Bobocel – Fasolea Curioasă 🧠🌱

**Bobocel – Fasolea Curioasă** este o aplicație web educațională și interactivă, concepută special pentru copii cu vârste între **4 și 7 ani**. Proiectul transformă etapele biologice ale germinării într-o călătorie emoțională captivantă, ajutându-i pe cei mici să înțeleagă botanica prin puterea poveștilor.

Aplicația rulează și interacționează cu utilizatorii prin intermediul platformei Google AI Studio.

🔗 **Link Aplicație:** [https://bobocel-fasolea-curioasa.ai.studio/](https://bobocel-fasolea-curioasa.ai.studio/)

---

## 🚀 Conceptul Narativ și Științific

Aplicația folosește tehnica *gamification* și povestea pentru a explica fenomene științifice riguroase:
- **Metamorfoza Biologică:** Copiii urmăresc transformarea reală a unei semințe (umflare, crăpare, apariția rădăcinii și dezvoltarea tulpinii).
- **Identificare Emoțională:** Dorința personajului Bobocel de „a vedea lumea” devine motorul narativ principal.
- **Explicarea Tropismului:** Curiozitatea lui Bobocel explică, pe înțelesul copiilor, mișcările orientate ale plantelor (tropismul) către stimuli vitali precum lumina și apa.

---

## 🛠️ Tehnologii utilizate

Stiva tehnologică modernă asigură performanță ridicată și o interfață fluidă, esențială pentru captarea atenției copiilor:

- **[Vite](https://vitejs.dev)** – Manager de build ultra-rapid pentru aplicații frontend.
- **[TypeScript](https://typescript.org)** – Adaugă tipizare statică pentru un cod stabil și ușor de întreținut.
- **[Bun](https://bun.sh)** – Runtime JavaScript all-in-one și manager de pachete ultra-rapid.

---

## 💻 Instalare și Rulare Locală

Urmează acești pași pentru a configura și rula proiectul în mediul tău local:

### 1. Clonarea repository-ului
```bash
git clone https://github.com
cd Bobocel-fasolea-curioasa
```

### 2. Instalarea dependențelor
Folosind **Bun** (recomandat, conform fișierului de blocare):
```bash
bun install
```
Sau prin **npm**:
```bash
npm install
```

### 3. Configurarea variabilelor de mediu
Generează fișierul `.env` local pornind de la cel de exemplu pentru a configura integrarea cu Google AI Studio:
```bash
cp .env.example .env
```

### 4. Rularea în modul de dezvoltare
Pornește serverul local:
```bash
bun run dev
# sau
npm run dev
```
Accesează adresa afișată în terminal (de regulă `http://localhost:5173`) pentru a vedea aplicația în browser.

### 5. Compilarea pentru producție
Pentru a genera fișierele optimizate în folderul `dist`:
```bash
bun run build
# sau
npm run build
```

---

## 📁 Structura Proiectului

```text
├── src/               # Codul sursă (componente interactive, stiluri, poveste)
├── .env.example       # Model pentru configurarea cheilor API
├── bun.lock           # Fișierul de blocare a dependențelor pentru Bun
├── index.html         # Punctul principal de intrare în aplicație
├── metadata.json      # Metadatele aplicației pentru Google AI Studio
├── package.json       # Scripturile proiectului și lista de dependințe
├── tsconfig.json      # Configurația compilatorului TypeScript
└── vite.config.ts     # Setările și plugin-urile pentru Vite
```

---

## 📝 Licență și Contribuții

Acest repository a fost generat pornind de la template-ul oficial `google-gemini/aistudio-repository-template`.

Dacă dorești să contribui la extinderea poveștii lui Bobocel, să îmbunătățești animațiile sau să adaugi noi elemente interactive pentru copii, te invităm să deschizi un **Issue** sau să trimiți un **Pull Request**.

Concept creat cu ❤️ pentru copii și părinți deopotrivă.
