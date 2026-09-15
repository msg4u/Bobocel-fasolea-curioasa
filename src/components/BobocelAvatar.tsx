import React from 'react';

interface BobocelAvatarProps {
  className?: string;
  size?: number | string;
  expression?: 'happy' | 'sleepy' | 'curious' | 'surprised' | 'worried' | 'proud' | 'ecstatic';
  hasCrack?: boolean;
  hasRoot?: boolean;
  rootStage?: 'none' | 'small' | 'medium' | 'deep';
  hasStem?: boolean;
  stemStage?: 'none' | 'sprout' | 'tall' | 'full';
  showSproutOnHead?: boolean;
}

export function BobocelAvatar({
  className = '',
  size = '100%',
  expression = 'happy',
  hasCrack = false,
  hasRoot = false,
  rootStage = 'none',
  hasStem = false,
  stemStage = 'none',
  showSproutOnHead = true
}: BobocelAvatarProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`select-none ${className}`}
      style={{ width: size, height: size }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients matching the yellow bean from user image */}
        <radialGradient id="beanGlow" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fffb7a" />
          <stop offset="45%" stopColor="#ffeb3b" />
          <stop offset="85%" stopColor="#fbc02d" />
          <stop offset="100%" stopColor="#f57f17" />
        </radialGradient>

        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="40%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>

        <linearGradient id="eyeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="60%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>

        <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="5" stdDeviation="3" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Ground drop shadow */}
      <ellipse cx="115" cy="188" rx="55" ry="7" fill="#000000" opacity="0.12" />

      {/* SPROUT ON HEAD (2 green leaves with stem, exact to user image) */}
      {showSproutOnHead && (
        <g id="head-sprout" filter="url(#softShadow)">
          {/* Stem connecting head to leaves */}
          <path
            d="M58 48 Q55 35 62 26"
            fill="none"
            stroke="#15803d"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Left Leaf */}
          <path
            d="M59 27 C42 16, 26 24, 28 39 C38 48, 54 40, 59 27 Z"
            fill="url(#leafGrad)"
            stroke="#0f172a"
            strokeWidth="2.5"
          />
          {/* Leaf vein */}
          <path d="M36 34 Q46 31 56 29" stroke="#14532d" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M42 33 Q43 27 46 25" stroke="#14532d" strokeWidth="1" fill="none" />
          <path d="M48 31 Q50 37 53 38" stroke="#14532d" strokeWidth="1" fill="none" />

          {/* Right Leaf */}
          <path
            d="M62 26 C68 9, 88 10, 94 24 C94 38, 77 42, 62 26 Z"
            fill="url(#leafGrad)"
            stroke="#0f172a"
            strokeWidth="2.5"
          />
          {/* Leaf vein */}
          <path d="M66 26 Q78 22 88 23" stroke="#14532d" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M74 24 Q76 16 80 15" stroke="#14532d" strokeWidth="1" fill="none" />
          <path d="M78 23 Q80 30 84 32" stroke="#14532d" strokeWidth="1" fill="none" />
        </g>
      )}

      {/* WHITE ROOT GROWING DOWN (Optional for growth stages) */}
      {hasRoot && (
        <g id="bean-roots">
          <path
            d={
              rootStage === 'small'
                ? 'M85 155 Q82 175 78 190'
                : rootStage === 'medium'
                ? 'M85 155 Q78 178 72 196 Q65 205 60 210'
                : 'M85 155 Q78 180 70 205 Q60 220 45 225'
            }
            fill="none"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {(rootStage === 'medium' || rootStage === 'deep') && (
            <>
              <path d="M80 175 Q92 188 98 195" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <path d="M75 190 Q65 198 58 202" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}
        </g>
      )}

      {/* GREEN STEM GROWING TALL (Optional for growth stages) */}
      {hasStem && (
        <g id="bean-extra-stem">
          <path
            d="M60 30 Q65 5 70 -20"
            fill="none"
            stroke="#16a34a"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M70 -20 Q95 -35 105 -15 Q85 0 70 -18"
            fill="#22c55e"
            stroke="#15803d"
            strokeWidth="2.5"
          />
          <path
            d="M70 -18 Q45 -35 35 -15 Q55 0 70 -16"
            fill="#4ade80"
            stroke="#15803d"
            strokeWidth="2.5"
          />
        </g>
      )}

      {/* KIDNEY BEAN BODY (Exact kidney bean curve from user reference) */}
      <path
        d="M55 42
           C75 44, 98 62, 108 80
           C118 97, 130 98, 148 102
           C175 108, 188 132, 178 156
           C168 180, 135 186, 102 178
           C68 170, 36 150, 24 116
           C12 80, 30 42, 55 42 Z"
        fill="url(#beanGlow)"
        stroke="#0f172a"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Highlight sheen along top left curve */}
      <path
        d="M40 58 C32 80, 34 110, 48 132"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="50" cy="50" r="2.5" fill="#ffffff" opacity="0.8" />

      {/* DISTINCTIVE WAIST FOLD CREASE LINES (matching image) */}
      <g stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" fill="none">
        {/* Upper crease line */}
        <path d="M96 82 Q105 88 114 85" />
        {/* Middle crease line */}
        <path d="M90 92 Q103 100 114 96" />
        {/* Lower shorter crease line */}
        <path d="M85 102 Q94 107 101 106" />
      </g>

      {/* CRACK IN COAT IF REQUESTED */}
      {hasCrack && (
        <path
          d="M80 70 L86 82 L78 94 L86 104"
          stroke="#78350f"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      )}

      {/* FRECKLES UNDER EYES (tiny dots matching user image) */}
      <g fill="#92400e" opacity="0.65">
        <circle cx="36" cy="100" r="1" />
        <circle cx="41" cy="103" r="1.1" />
        <circle cx="38" cy="106" r="0.9" />
        <circle cx="43" cy="108" r="1" />

        <circle cx="68" cy="94" r="1" />
        <circle cx="73" cy="96" r="1.1" />
        <circle cx="70" cy="99" r="0.9" />
        <circle cx="76" cy="100" r="1" />
      </g>

      {/* NOSE (tiny cute curved mark) */}
      <path
        d="M58 87 Q61 89 63 87"
        fill="none"
        stroke="#78350f"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* EYES AND EYELASHES (Exact green eyes with lashes from image) */}
      {expression === 'sleepy' ? (
        // Closed sleeping eyes
        <g stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" fill="none">
          <path d="M38 90 Q46 98 54 90" />
          <path d="M60 84 Q68 92 76 84" />
          {/* Eyelashes */}
          <path d="M42 94 L39 99" strokeWidth="2" />
          <path d="M46 95 L46 101" strokeWidth="2" />
          <path d="M50 94 L53 99" strokeWidth="2" />

          <path d="M64 88 L61 93" strokeWidth="2" />
          <path d="M68 89 L68 95" strokeWidth="2" />
          <path d="M72 88 L75 93" strokeWidth="2" />

          <text x="95" y="70" fontSize="18" fontWeight="bold" fill="#854d0e">z</text>
          <text x="106" y="58" fontSize="14" fontWeight="bold" fill="#854d0e">z</text>
        </g>
      ) : (
        <g id="open-eyes">
          {/* LEFT EYE */}
          <g>
            {/* 3 Eyelashes */}
            <path d="M37 80 L30 75" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M41 77 L36 70" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M46 76 L44 68" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

            {/* White base */}
            <circle cx="46" cy="85" r="10" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
            {/* Green Iris */}
            <circle cx="47" cy="85" r="7" fill="url(#eyeGrad)" />
            {/* Pupil */}
            <circle cx="47" cy="85" r="4.5" fill="#0f172a" />
            {/* Highlight Sparkles */}
            <circle cx="44.5" cy="82.5" r="2.2" fill="#ffffff" />
            <circle cx="48.5" cy="87.5" r="1" fill="#ffffff" />
          </g>

          {/* RIGHT EYE */}
          <g>
            {/* 3 Eyelashes */}
            <path d="M66 73 L62 65" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M71 72 L70 63" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M76 74 L78 66" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

            {/* White base */}
            <circle cx="70" cy="79" r="9" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
            {/* Green Iris */}
            <circle cx="70.5" cy="79" r="6.2" fill="url(#eyeGrad)" />
            {/* Pupil */}
            <circle cx="70.5" cy="79" r="4" fill="#0f172a" />
            {/* Highlight Sparkles */}
            <circle cx="68.5" cy="76.8" r="2" fill="#ffffff" />
            <circle cx="72" cy="81" r="0.9" fill="#ffffff" />
          </g>
        </g>
      )}

      {/* MOUTH (Wide cheerful open smile from user image) */}
      {expression === 'sleepy' ? (
        <path d="M52 108 Q57 111 62 108" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ) : expression === 'surprised' || expression === 'worried' ? (
        <ellipse cx="60" cy="106" rx="6" ry="8" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
      ) : (
        <g id="happy-mouth">
          {/* Open mouth with dark interior and pink tongue */}
          <path
            d="M48 103 Q64 94 77 101 C78 116, 56 122, 48 103 Z"
            fill="#0f172a"
            stroke="#0f172a"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Tongue */}
          <path
            d="M55 113 Q65 106 72 109 C70 117, 58 118, 55 113 Z"
            fill="#f43f5e"
          />
          {/* Cheek smile dimple */}
          <path d="M46 100 Q48 103 48 106" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M76 98 Q79 101 78 104" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
