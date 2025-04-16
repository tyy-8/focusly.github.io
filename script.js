const playPauseBtn = document.getElementById('playPauseBtn');
const audioPlayer = document.getElementById('audioPlayer');
const songName = document.getElementById('songName');
const categoryDropdown = document.getElementById('category');
const progress = document.getElementById('progress');
const currentTimeLabel = document.getElementById('current-time');
const durationLabel = document.getElementById('duration');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');


let playlist = [];
let currentTrack = 0;
let isPlaying = false;

const centerBox = document.querySelector('.center-box');

document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Get the center-box's current position
    const boxRect = centerBox.getBoundingClientRect();
    const boxX = boxRect.left + boxRect.width / 2;
    const boxY = boxRect.top + boxRect.height / 2;

    // Calculate the movement offset based on the cursor's position
    const offsetX = (mouseX - boxX) * 0.01;  // Change the multiplier to control the movement intensity
    const offsetY = (mouseY - boxY) * 0.01;

    // Apply the calculated offset to move the center-box slightly
    centerBox.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});
prevBtn.addEventListener('click', () => {
    if (!playlist.length) return;
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    playCurrentTrack();
});

nextBtn.addEventListener('click', () => {
    if (!playlist.length) return;
    currentTrack = (currentTrack + 1) % playlist.length;
    playCurrentTrack();
});


window.onload = function() {
    loadPlaylist("lofi");
    // why do you work like this11!!?11???1!!
    playPauseBtn.textContent = '▶';
    isPlaying = false;
};
audioPlayer.addEventListener('loadedmetadata', () => {
    progress.max = audioPlayer.duration;
    durationLabel.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener('timeupdate', () => {
    progress.value = audioPlayer.currentTime;
    currentTimeLabel.textContent = formatTime(audioPlayer.currentTime);
});

progress.addEventListener('input', () => {
    audioPlayer.currentTime = progress.value;
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}


categoryDropdown.addEventListener('change', () => {
    const category = categoryDropdown.value;
    loadPlaylist(category);
});

playPauseBtn.addEventListener('click', () => {
    if (!playlist.length) return;

    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.textContent = '▶';
    } else {
        audioPlayer.play();
        playPauseBtn.textContent = '⏸';
    }
    isPlaying = !isPlaying;
});

audioPlayer.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    playCurrentTrack();
});

function loadPlaylist(category) {
    const folders = {
        lofi: ['Blossom.mp3', "Let's Vibe.mp3", 'Summer Time.mp3', 'Time for yourself.mp3'],
        keenola: ['Party Girl.mp3', 'Bait Me.mp3', 'Belly Of The Beast.mp3', 'Boombox.mp3', 'Gasoline.mp3', "Love's Enemy.mp3", 'No Good.mp3', 'ONG!.mp3', 'Outlaw.mp3', 'Rigor Mortis.mp3', 'Sad AF.mp3', 'So Do I (Not Alone).mp3'],
    };

    if (!folders[category]) return;

    playlist = folders[category].map(file => `music/${category}/${file}`);
    currentTrack = 0;
    playCurrentTrack();
}

function playCurrentTrack() {
    if (!playlist.length) return;

    const currentFile = playlist[currentTrack];
    // Get the file name without the extension
    const fileName = currentFile.split('/').pop().replace(/\.mp3$/, '').replace(/[-_]/g, ' ');

    audioPlayer.src = currentFile;
    songName.textContent = fileName; // Display the file name without .mp3
    audioPlayer.play();
    playPauseBtn.textContent = '⏸';
    isPlaying = true;
}
