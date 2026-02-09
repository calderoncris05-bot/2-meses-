const inicioFecha = new Date("2025-12-10");

/* ELEMENTOS DEL REPRODUCTOR */
const audio = document.getElementById("audio");
const barra = document.getElementById("barra");
const album = document.getElementById("album");
const currentTimeDisplay = document.getElementById("currentTime");
const durationTimeDisplay = document.getElementById("durationTime");
const songNameDisplay = document.getElementById("songName");

/* LISTA DE CANCIONES (Ruta relativa directa) */
const canciones = [
  { nombre: "Reik - Pero Te Conocí", src: "music/reik.mp3" },
  { nombre: "Eres Tú - Matisse, Reik", src: "music/eres-tu.mp3" },
  { nombre: "Carlos Rivera - Solo Tú", src: "music/solo-tu.mp3" },
  { nombre: "Luis Fonsi - Llegaste Tú", src: "music/llegaste-tu.mp3" },
  { nombre: "Ed Sheeran - Perfect", src: "music/perfecto.mp3" },
  { nombre: "Yung Kai - Blue", src: "music/azul.mp3" },
  { nombre: "Ed Sheeran - Photograph", src: "music/fotografia.mp3" }
];

let indiceCancion = 0;

/* FUNCIONES PRINCIPALES */
function actualizarReproductor() {
  if (!audio) return;
  
  audio.pause();
  // El truco: Usar "./" asegura que busque dentro de la carpeta actual del proyecto
  audio.src = "./" + canciones[indiceCancion].src;
  songNameDisplay.textContent = canciones[indiceCancion].nombre;
  
  audio.load();
  
  // Intentar reproducir automáticamente tras cargar
  audio.oncanplay = () => {
    audio.play().catch(() => console.log("Clic para sonar..."));
    album.style.animationPlayState = "running";
  };
}

function iniciar() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("contenido").style.display = "block";
  actualizarReproductor();
}

function playPause() {
  if (audio.paused) {
    audio.play();
    album.style.animationPlayState = "running";
  } else {
    audio.pause();
    album.style.animationPlayState = "paused";
  }
}

function cambiarCancionAdelante() {
  indiceCancion = (indiceCancion + 1) % canciones.length;
  actualizarReproductor();
}

function cambiarCancionAtras() {
  indiceCancion = (indiceCancion - 1 + canciones.length) % canciones.length;
  actualizarReproductor();
}

/* ACTUALIZACIÓN DE BARRA Y TIEMPO */
audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    barra.value = (audio.currentTime / audio.duration) * 100;
    let curM = Math.floor(audio.currentTime / 60);
    let curS = Math.floor(audio.currentTime % 60);
    let durM = Math.floor(audio.duration / 60);
    let durS = Math.floor(audio.duration % 60);
    currentTimeDisplay.textContent = `${curM}:${curS < 10 ? '0' + curS : curS}`;
    durationTimeDisplay.textContent = `${durM}:${durS < 10 ? '0' + durS : durS}`;
  }
});

barra.addEventListener("input", () => {
  audio.currentTime = (barra.value / 100) * audio.duration;
});

/* CONTADOR DE TIEMPO (ANIVERSARIO) */
setInterval(() => {
  let diff = new Date() - inicioFecha;
  let sec = Math.floor(diff / 1000);
  document.getElementById("y").textContent = Math.floor(sec / (3600 * 24 * 365));
  document.getElementById("d").textContent = Math.floor((sec / (3600 * 24)) % 365);
  document.getElementById("h").textContent = Math.floor((sec / 3600) % 24);
  document.getElementById("min").textContent = Math.floor((sec / 60) % 60);
  document.getElementById("s").textContent = sec % 60;
}, 1000);

/* CARTA */
function abrirCarta() {
  document.querySelector(".carta").classList.toggle("open");
}










