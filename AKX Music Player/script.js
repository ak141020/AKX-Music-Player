// Song list (Add your songs here)
const songs = [
  { title: "Song One", artist: "Artist A", src: "songs/S1.mp3" },
  { title: "Song Two", artist: "Artist B", src: "songs/S2.mp3" },
  { title: "Song Three", artist: "Artist C", src: "songs/S3.mp3" }
];

let currentSongIndex = 0;
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const playlist = document.getElementById("playlist");

// Load songs into playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    loadSong(index);
    playSong();
  });
  playlist.appendChild(li);
});

// Load selected song
function loadSong(index) {
  currentSongIndex = index;
  audio.src = songs[index].src;
  songTitle.textContent = songs[index].title;
  songArtist.textContent = songs[index].artist;
}

// Play song
function playSong() {
  audio.play();
  playBtn.textContent = "⏸"; // change to pause icon
}

// Pause song
function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶";
}

// Play/Pause toggle
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

// Previous Song
prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
});

// Next Song
nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
});

// Progress Bar Update
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
});

// Seek song
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume Control
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Auto play next song
audio.addEventListener("ended", () => {
  nextBtn.click();
});

// Initialize first song
loadSong(currentSongIndex);
