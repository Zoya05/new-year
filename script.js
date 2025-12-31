/* ===============================
   HOLD TO REVEAL (index.html)
================================ */

let holdTimer;
let heartInterval = null;

const box = document.getElementById("box");

if (box) {
  box.addEventListener("mousedown", startHold);
  box.addEventListener("touchstart", startHold, { passive: true });

  box.addEventListener("mouseup", cancelHold);
  box.addEventListener("mouseleave", cancelHold);
  box.addEventListener("touchend", cancelHold);
}

function startHold() {
  holdTimer = setTimeout(() => {
    box.innerHTML = `
      <p class="reveal">
        𝐌𝐲 𝐋𝐨𝐯𝐞.... 𝐈 𝐰𝐚𝐧𝐭 𝐭𝐨 𝐬𝐭𝐚𝐫𝐭 𝐦𝐲 𝐟𝐢𝐫𝐬𝐭 𝐦𝐨𝐦𝐞𝐧𝐭 𝐨𝐟 𝐧𝐞𝐰 𝐲𝐞𝐚𝐫 𝐰𝐢𝐭𝐡 𝐘𝐨𝐮 💌💋❣️<br>
        ʜᴀᴘᴘʏ ɴᴇᴡ ʏᴇᴀʀ 💫<br>
        ✨ᴍᴏᴠɪɴɢ ᴛᴏɢᴇᴛʜᴇʀ ɪɴᴛᴏ 2026✨<br>
        𝐀𝐥𝐰𝐚𝐲𝐬 𝐌𝐮𝐌𝐮 & 𝐙𝐮𝐙𝐮🤍<br><br>
        <span style="font-size:18px;opacity:0.7;">— From Zo 💌</span>
      </p>
      <br><br>
      <a href="memories.html" style="color:white;text-decoration:none;">
        Tap here 🤍
      </a>
    `;

    startHearts();
  }, 900);
}

function cancelHold() {
  clearTimeout(holdTimer);
}

/* ===============================
   FLOATING HEARTS
================================ */

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart-float";
  heart.innerText = "💗";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 6000);
}

function startHearts() {
  if (!heartInterval) {
    heartInterval = setInterval(createHeart, 500);
  }
}

function stopHearts() {
  clearInterval(heartInterval);
  heartInterval = null;
}

/* ===============================
   MEMORIES PAGE
================================ */

const playBtn = document.getElementById("play-btn");     // ✅ fixed
const video = document.getElementById("intro-video");
const music = document.getElementById("bg-music");
const img = document.getElementById("album-img");       // ✅ fixed
const yearTitle = document.getElementById("yearTitle");

const albums = [
  { year: "2020", photos: ["photos 2020 1.jpg"] },
  { year: "2023", photos: ["photos 2023 1.jpg","photos 2023 2.jpg","photos 2023 3.jpg","photos 2023 4.jpg","photos 2023 5.jpg"] },
  { year: "2024", photos: ["photos 2024 1.jpg","photos 2024 2.jpg","photos 2024 3.jpg","photos 2024 4.jpg","photos 2024 5.jpg"] },
  { year: "2025", photos: ["photos 2025 1.jpg","photos 2025 2.jpg","photos 2025 3.jpg","photos 2025 4.jpg"] }
];

let albumIndex = 0;
let photoIndex = 0;

/* Start hearts automatically on memories page */
if (document.body.contains(playBtn)) {
  startHearts();
}

if (playBtn) {
  playBtn.onclick = () => {
    playBtn.style.display = "none";
    stopHearts();                 // ❌ stop hearts during video
    video.style.display = "block";
    video.play();

    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
  };
}

if (video) {
  video.onended = () => {
    video.style.display = "none";
    if (music) music.play();
    startHearts();                // ✅ resume hearts
    showNextPhoto();
  };
}

function showNextPhoto() {
  if (albumIndex >= albums.length) return;

  const album = albums[albumIndex];
  yearTitle.innerText = album.year;

  img.src = album.photos[photoIndex];
  img.style.display = "block";

  photoIndex++;

  if (photoIndex >= album.photos.length) {
    albumIndex++;
    photoIndex = 0;
  }

  setTimeout(showNextPhoto, 3000);
}






