const shuffleBtn = document.getElementById('shuffle');
const speed100Btn = document.getElementById('speed100');
const speed150Btn = document.getElementById('speed150');
const speed200Btn = document.getElementById('speed200');
const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('duration'),
progress = document.getElementById('progress'),
playerProgress = document.getElementById('player-progress'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play'),
restartBtn = document.getElementById("restart"),
background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'leão',
        cover: 'assets/1.png',
        artist: 'SΔ†IERF',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'preciso me encontrar',
        cover: 'assets/2.png',
        artist: 'SΔ†IERF',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'naquela mesa',
        cover: 'assets/3.png',
        artist: 'SΔ†IERF',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'gostava tanto de vc',
        cover: 'assets/4.png',
        artist: 'SΔ†IERF',
    },
    {
        path: 'assets/5.mp3',
        displayName: 'dormi na praça',
        cover: 'assets/5.jpg',
        artist: 'jdutra',
    },
    {
        path: 'assets/6.mp3',
        displayName: 'olha se você não me ama',
        cover: 'assets/6.jpg',
        artist: 'SΔ†IERF',
    },
    {
        path: 'assets/7.mp3',
        displayName: 'boate azul',
        cover: 'assets/7.jpg',
        artist: 'jdutra',
    },
    {
        path: 'assets/8.mp3',
        displayName: 'tuts tuts quero ver',
        cover: 'assets/8.jpg',
        artist: 'SΔ†IERF',
    },

    {
        path: 'assets/9.mp3',
        displayName: 'lá ele',
        cover: 'assets/9.jpg',
        artist: 'SΔ†IERF',
    },
    {
        path: 'assets/10.mp3',
        displayName: 'salada de fruta',
        cover: 'assets/10.jpg',
        artist: 'SΔ†IERF',
    },
    {
        path: 'assets/11.mp3',
        displayName: 'cheia de manias',
        cover: 'assets/11.jpg',
        artist: 'jdutra',
    },
    {
        path: 'assets/12.mp3',
        displayName: 'cilada',
        cover: 'assets/12.jpg',
        artist: 'jdutra',
    },
    {
        path: 'assets/13.mp3',
        displayName: 'deixa a vida me levar',
        cover: 'assets/13.jpg',
        artist: 'jdutra',
    },
    {
        path: 'assets/14.mp3',
        displayName: 'wave',
        cover: 'assets/14.jpg',
        artist: 'GabrielMzero',
    },
    {
        path: 'assets/15.mp3',
        displayName: 'amiga da minha mulher',
        cover: 'assets/15.jpg',
        artist: 'jdutra',
    },
    {
        path: 'assets/16.mp3',
        displayName: 'você me vira a cabeça',
        cover: 'assets/16.jpg',
        artist: 'jdutra',
    },
    {
        path: 'assets/17.mp3',
        displayName: 'como nossos pais',
        cover: 'assets/17.jpg',
        artist: 'jdutra',
    },
    {
        path: 'assets/18.mp3',
        displayName: 'evidências',
        cover: 'assets/18.jpg',
        artist: 'jdutra',
    },
    {
        path: 'assets/19.mp3',
        displayName: 'borboletas',
        cover: 'assets/19.jpg',
        artist: 'SΔ†IERF',
    },
    {
        path: 'assets/20.mp3',
        displayName: 'país tropical',
        cover: 'assets/20.jpg',
        artist: 'dillow',
    },
    {
        path: 'assets/21.mp3',
        displayName: 'estava aqui o tempo todo',
        cover: 'assets/21.jpg',
        artist: 'dillow',
    },
    {
        path: 'assets/22.mp3',
        displayName: 'deixa acontecer',
        cover: 'assets/22.jpg',
        artist: 'jdutra',
    },
];

let musicIndex = 0;
let isPlaying = false;
let isShuffled = false;

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 32) {
        togglePlay();
        event.preventDefault();
    } else if (event.keyCode === 39) {
        changeMusic(1);
    } else if (event.keyCode === 37) {
        changeMusic(-1);
    } else if (event.keyCode === 38) {
        if (music.volume < 1) music.volume += 0.1;
    } else if (event.keyCode === 40) {
        if (music.volume > 0) music.volume -= 0.1;
    }
});

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();   
}

function pauseMusic(){
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();   
}

function restartMusic() {
    music.currentTime = 0;
    playMusic();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const {duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime( duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime( currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar (e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

shuffleBtn.addEventListener('click', toggleShuffle);

function toggleShuffle() {
    isShuffled = !isShuffled; 
    if (isShuffled) {
        shuffleBtn.style.color = 'green';
        shuffleSongs();
    } else {
        shuffleBtn.style.color = '';
    }
}

function shuffleSongs() {
    for (let i = songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songs[i], songs[j]] = [songs[j], songs[i]];
    }

    if (isPlaying) {
        musicIndex = 0;
        loadMusic(songs[musicIndex]);
        playMusic();
    }
}

function changePlaybackSpeed(speed) {
    music.playbackRate = speed;
}

    music.playbackRate = 1.0; 

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
restartBtn.addEventListener("click", restartMusic);
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);
speed100Btn.addEventListener('click', () => changePlaybackSpeed(1.00));
speed150Btn.addEventListener('click', () => changePlaybackSpeed(1.5));
speed200Btn.addEventListener('click', () => changePlaybackSpeed(2.0));


loadMusic(songs[musicIndex]);