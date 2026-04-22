/* ================================================================
   IRONVEIL RECORDS — script.js
   ================================================================
   UPDATE EACH SONG BELOW:
     cover : relative path to your cover image
             e.g. "5_GeneticAlgorithms/AI Music/Made of Everything/cover.jpg"
             Change .png to .jpg if that is your file extension.
     audio : relative path to your audio file
             e.g. "5_GeneticAlgorithms/AI Music/Made of Everything/track.wav"
             Change .wav to .mp3 if needed.
     tool  : the AI tool used to generate this song
             e.g. "Suno AI", "Udio", "Stable Audio"
   ================================================================ */

const SONGS = [
  {
    title: "Made of Everything",
    cover: "5_GeneticAlgorithms/AI Music/Made of Everything/cover.png",
    audio: "5_GeneticAlgorithms/AI Music/Made of Everything/audio.wav",
    tool:  "[AI Tool Used]",
    year:  "2026",
    desc:  '"Made of Everything" feels expansive and emotionally layered, with a sense of scale that suggests memory, identity, and many conflicting pieces trying to coexist in one body. Its immersive atmosphere and broader emotional sweep make it a strong fit for playlists built around self-reckoning, transformation, and the feeling of carrying too much and somehow still holding together.',
  },
  {
    title: "Man in the Glass",
    cover: "5_GeneticAlgorithms/AI Music/Man in the Glass/cover.png",
    audio: "5_GeneticAlgorithms/AI Music/Man in the Glass/audio.wav",
    tool:  "[AI Tool Used]",
    year:  "2026",
    desc:  "\"Man in the Glass\" feels like a dark, cinematic confrontation with identity, loss, and the version of yourself that still waits on the other side of regret. Its reflective atmosphere and emotional weight make it a strong fit for playlists built around survivor's guilt, inner conflict, and late-night reckoning.",
  },
  {
    title: "The Letting",
    cover: "5_GeneticAlgorithms/AI Music/The Letting/cover.png",
    audio: "5_GeneticAlgorithms/AI Music/The Letting/audio.wav",
    tool:  "[AI Tool Used]",
    year:  "2026",
    desc:  '"The Letting" feels like a slow burning, emotionally weighty track that leans into release rather than collapse, carrying a steady sense of tension through a broader, more dynamic arc. Its polished atmosphere and lingering gravity make it a strong fit for playlists built around surrender, aftermath, and the hard calm that follows emotional rupture.',
  },
  {
    title: "Salt the Earth",
    cover: "5_GeneticAlgorithms/AI Music/Salt the Earth/cover.png",
    audio: "5_GeneticAlgorithms/AI Music/Salt the Earth/audio.wav",
    tool:  "[AI Tool Used]",
    year:  "2026",
    desc:  '"Salt the Earth" feels like a larger, more scorched emotional statement than a quiet mood piece, with a dense, forceful presence that suggests aftermath, ruin, and resolve rather than simple sadness. Its sustained intensity and broader scale make it a strong fit for playlists built around reckoning, bitterness, endurance, and the long shadow left after something has been burned down.',
  },
  {
    title: "Find Me in the Dark",
    cover: "5_GeneticAlgorithms/AI Music/Find Me in the Dark/cover.png",
    audio: "5_GeneticAlgorithms/AI Music/Find Me in the Dark/audio.wav",
    tool:  "[AI Tool Used]",
    year:  "2026",
    desc:  '"Find Me in the Dark" feels like a slow-burning, nocturnal track with more emotional range than a straight mood piece, unfolding with a larger sense of space and release. Its shadowed atmosphere and lingering intensity make it a strong fit for playlists built around longing, isolation, and the need to be reached when everything else has gone dim.',
  },
  {
    title: "Where We Meet",
    cover: "5_GeneticAlgorithms/AI Music/Where We Meet/cover.png",
    audio: "5_GeneticAlgorithms/AI Music/Where We Meet/audio.wav",
    tool:  "[AI Tool Used]",
    year:  "2026",
    desc:  '"Where We Meet" feels like a cinematic, emotionally centered track that pairs reflective atmosphere with a quiet sense of connection and inevitability. Its polished, immersive mood makes it a strong fit for playlists built around distance, longing, reunion, and late-night emotional clarity.',
  },
  {
    title: "Stolen Shadow",
    cover: "5_GeneticAlgorithms/AI Music/Stolen Shadow/cover.png",
    audio: "5_GeneticAlgorithms/AI Music/Stolen Shadow/audio.wav",
    tool:  "[AI Tool Used]",
    year:  "2026",
    desc:  '"Stolen Shadow" feels like a dark, slow-burning track with a tense, cinematic edge, carrying the sense of something intimate slipping just out of reach. Its brooding atmosphere and steady emotional pressure make it a strong fit for playlists built around loss, pursuit, and the parts of yourself that disappear in the dark.',
  },
  {
    title: "Not Far Now",
    cover: "5_GeneticAlgorithms/AI Music/Not_Far_Now/cover.png",
    audio: "5_GeneticAlgorithms/AI Music/Not_Far_Now/audio.wav",
    tool:  "[AI Tool Used]",
    year:  "2026",
    desc:  '"Not Far Now" feels like a cinematic, forward-moving track that balances late-night reflection with a quiet sense of hope. Its polished atmosphere and steady emotional lift make it a strong fit for playlists built around perseverance, distance, and the feeling of finally nearing the light.',
  },
  {
    title: "Rusted Halo",
    cover: "5_GeneticAlgorithms/AI Music/Rusted Halo/cover.png",
    audio: "5_GeneticAlgorithms/AI Music/Rusted Halo/audio.wav",
    tool:  "[AI Tool Used]",
    year:  "2026",
    desc:  '"Rusted Halo" feels like a dark, slow-burning track with a worn metallic edge, balancing heaviness and polish in a way that suggests tension without losing control. Its steady intensity and brooding atmosphere make it well suited for playlists built around nocturnal alternative moods, emotional grit, and cinematic weight.',
  },
  {
    title: "Crossroad Waltz",
    cover: "5_GeneticAlgorithms/AI Music/Crossroad Waltz/cover.png",
    audio: "5_GeneticAlgorithms/AI Music/Crossroad Waltz/audio.wav",
    tool:  "[AI Tool Used]",
    year:  "2026",
    desc:  '"Crossroad Waltz" feels like a cinematic, emotionally layered track that carries more movement and release than its title first suggests, balancing reflection with a steady sense of momentum. Its polished atmosphere and broader dynamic sweep make it a strong fit for playlists built around turning points, distance, and the uneasy grace of choosing a way forward.',
  },
];

/* ================================================================
   PLAYER ENGINE — no need to edit below this line
   ================================================================ */

const TL  = document.getElementById('TL');
const AU  = document.getElementById('AU');
const PL  = document.getElementById('player');
const PB  = document.getElementById('PB');
const PF  = document.getElementById('PF');
const BPL = document.getElementById('BPL');
const BPV = document.getElementById('BPV');
const BNX = document.getElementById('BNX');
const IPL = document.getElementById('IPL');
const IPS = document.getElementById('IPS');
const PN  = document.getElementById('PN');
const PCI = document.getElementById('PCI');
const PC  = document.getElementById('PC');
const PT  = document.getElementById('PT');
const VS  = document.getElementById('VS');

let cur = -1;

function fmt(s) {
  if (!s || !isFinite(s)) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

function pad(n) {
  return String(n).padStart(2, '0');
}

/* ── Build track list ── */
SONGS.forEach((s, i) => {
  const wrap = document.createElement('div');
  wrap.className = 'tw';

  const row = document.createElement('div');
  row.className = 'tr';
  row.style.animationDelay = `${i * 65}ms`;

  row.innerHTML = `
    <button class="nbtn" data-i="${i}" title="Play ${s.title}">
      <span class="ntxt">${pad(i + 1)}</span>
      <svg class="psvg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
    </button>
    <div class="cc">
      <div class="cph" id="ph${i}">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
      </div>
      <img class="cimg" id="ci${i}" src="${s.cover}" alt="${s.title}"
        onload="this.classList.add('on'); document.getElementById('ph${i}').style.display='none';"
        onerror="this.style.display='none';">
    </div>
    <div class="tmeta">
      <div class="tttl">${s.title}</div>
      <div class="tsub">${s.year} · Cinematic · ${s.tool}</div>
    </div>
    <div class="tyr">${s.year}</div>
  `;

  const det = document.createElement('div');
  det.className = 'td';
  det.innerHTML = `
    <p class="tdesc">${s.desc}</p>
    <span class="tbadge">Generated with: ${s.tool}</span>
  `;

  /* click row = expand/collapse description */
  row.addEventListener('click', (e) => {
    if (e.target.closest('.nbtn')) return;
    const wasOpen = det.classList.contains('open');
    document.querySelectorAll('.td.open').forEach(d => d.classList.remove('open'));
    if (!wasOpen) det.classList.add('open');
  });

  /* click number button = play */
  row.querySelector('.nbtn').addEventListener('click', (e) => {
    e.stopPropagation();
    play(i);
  });

  wrap.appendChild(row);
  wrap.appendChild(det);
  TL.appendChild(wrap);
});

/* ── Play a track by index ── */
function play(i) {
  const s = SONGS[i];

  /* mark active row */
  document.querySelectorAll('.tr').forEach(r => r.classList.remove('active'));
  TL.querySelectorAll('.tr')[i].classList.add('active');

  /* toggle if same track, otherwise load new */
  if (cur === i) {
    AU.paused ? AU.play() : AU.pause();
    return;
  }

  cur = i;
  AU.src = s.audio;
  AU.load();
  AU.play().catch(() => {});

  /* update player bar info */
  PN.textContent = s.title;
  PL.classList.add('up');

  /* update player cover */
  PCI.classList.remove('on');
  const tmp = new Image();
  tmp.onload  = () => { PCI.src = s.cover; PCI.classList.add('on'); };
  tmp.onerror = () => { PCI.classList.remove('on'); };
  tmp.src = s.cover;
}

/* ── Audio events ── */
AU.addEventListener('play',  () => { IPL.style.display = 'none';  IPS.style.display = 'block'; });
AU.addEventListener('pause', () => { IPL.style.display = 'block'; IPS.style.display = 'none';  });
AU.addEventListener('ended', () => play((cur + 1) % SONGS.length));

AU.addEventListener('timeupdate', () => {
  if (!AU.duration) return;
  PF.style.width = `${(AU.currentTime / AU.duration) * 100}%`;
  PC.textContent = fmt(AU.currentTime);
});

AU.addEventListener('loadedmetadata', () => {
  PT.textContent = fmt(AU.duration);
});

/* ── Controls ── */
BPL.addEventListener('click', () => {
  if (cur === -1) play(0);
  else AU.paused ? AU.play() : AU.pause();
});

BPV.addEventListener('click', () => {
  if (AU.currentTime > 3) { AU.currentTime = 0; return; }
  play((cur - 1 + SONGS.length) % SONGS.length);
});

BNX.addEventListener('click', () => play((cur + 1) % SONGS.length));

PB.addEventListener('click', (e) => {
  if (AU.duration) AU.currentTime = (e.offsetX / PB.offsetWidth) * AU.duration;
});

VS.addEventListener('input', () => { AU.volume = VS.value; });

AU.volume = 0.8;
