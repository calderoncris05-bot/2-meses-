const inicioFecha = new Date("2025-12-10");

// Función para iniciar la visualización del contenido
function iniciar() {
  inicio.style.display = "none";
  contenido.style.display = "block";
}

/* TIMER */
const y = document.getElementById("y"),
      m = document.getElementById("m"),
      d = document.getElementById("d"),
      h = document.getElementById("h"),
      min = document.getElementById("min"),
      s = document.getElementById("s");

setInterval(() => {
  let diff = new Date() - inicioFecha;
  let sec = Math.floor(diff / 1000);
  let mi = Math.floor(sec / 60);
  let ho = Math.floor(mi / 60);
  let di = Math.floor(ho / 24);
  y.textContent = Math.floor(di / 365);
  di %= 365;
  m.textContent = Math.floor(di / 30);
  d.textContent = di % 30;
  h.textContent = ho % 24;
  min.textContent = mi % 60;
  s.textContent = sec % 60;
}, 1000);

/* MUSICA REAL */
const audio = document.getElementById("audio");
const barra = document.getElementById("barra");
const album = document.getElementById("album");
const currentTimeDisplay = document.getElementById("currentTime");
const durationTimeDisplay = document.getElementById("durationTime");

function playPause() {
  if (audio.paused) {
    audio.play();
    album.style.animationPlayState = "running";
  } else {
    audio.pause();
    album.style.animationPlayState = "paused";
  }
}

audio.addEventListener("timeupdate", () => {
  barra.value = (audio.currentTime / audio.duration) * 100;
  let currentMinutes = Math.floor(audio.currentTime / 60);
  let currentSeconds = Math.floor(audio.currentTime % 60);
  let durationMinutes = Math.floor(audio.duration / 60);
  let durationSeconds = Math.floor(audio.duration % 60);

  // Mostrar tiempo en formato MM:SS
  currentTimeDisplay.textContent = `${formatTime(currentMinutes)}:${formatTime(currentSeconds)}`;
  durationTimeDisplay.textContent = `${formatTime(durationMinutes)}:${formatTime(durationSeconds)}`;
});

barra.addEventListener("input", () => {
  audio.currentTime = (barra.value / 100) * audio.duration;
});

// Formateo de tiempo para mostrar siempre dos dígitos
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

/* Cambiar canción */
const canciones = [
  { nombre: "Reik - Pero Te Conocí", src: "music/Reik.mp3" },
  { nombre: "Eres Tú - Matisse, Reik", src: "music/Eres Tu.mp3" },
  { nombre: "Carlos Rivera - Solo Tú", src: "music/Solo Tu.mp3" },
  { nombre: "Luis Fonsi - Llegaste Tú", src: "music/Llegaste tu.mp3" },
  { nombre: "Ed Sheeran - Perfect", src: "music/Perfect.mp3" },
  { nombre: "Yung Kai - Blue", src: "music/Blue.mp3" },
  { nombre: "Ed Sheeran - Photograph ", src: "music/Photograph.mp3" },
];

let indiceCancion = 0;

function cambiarCancionAdelante() {
  indiceCancion = (indiceCancion + 1) % canciones.length;

  // Cambiar la fuente del audio y el nombre de la canción
  audio.src = canciones[indiceCancion].src;
  document.getElementById("songName").textContent = canciones[indiceCancion].nombre;

  // Reproducir la nueva canción
  audio.play();
  album.style.animationPlayState = "running";
}

function cambiarCancionAtras() {
  indiceCancion = (indiceCancion - 1 + canciones.length) % canciones.length;

  // Cambiar la fuente del audio y el nombre de la canción
  audio.src = canciones[indiceCancion].src;
  document.getElementById("songName").textContent = canciones[indiceCancion].nombre;

  // Reproducir la nueva canción
  audio.play();
  album.style.animationPlayState = "running";
}

let rot = 0, start = 0, drag = false;
const cil = document.getElementById("cilindro");


const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;

if (isTouchDevice) {
  cil.addEventListener("touchstart", e => {
    drag = true;
    start = e.touches[0].clientX;
  });

  cil.addEventListener("touchmove", e => {
    if (!drag) return;
    rot += (e.touches[0].clientX - start) * 0.4;
    cil.style.transform = `rotateY(${rot}deg)`;
    start = e.touches[0].clientX;
  });

  document.addEventListener("touchend", () => drag = false);

} else {
  cil.addEventListener("mousedown", e => {
    drag = true;
    start = e.clientX;
  });

  document.addEventListener("mouseup", () => drag = false);

  document.addEventListener("mousemove", e => {
    if (!drag) return;
    rot += (e.clientX - start) * 0.4;
    cil.style.transform = `rotateY(${rot}deg)`;
    start = e.clientX;
  });
}

/* corazones */
setInterval(() => {
  let c = document.createElement("div");
  c.className = "corazon-flotante";
  c.innerHTML = "❤️";
  c.style.left = Math.random() * 100 + "vw";
  c.style.fontSize = 15 + Math.random() * 25 + "px";
  document.body.appendChild(c);
  setTimeout(() => c.remove(), 6000);
}, 400);

/* CARTA */
function abrirCarta() {
  const carta = document.querySelector(".carta");
  carta.classList.toggle("open");
}



