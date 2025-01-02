import { musicList } from "./musicList.js";

const wrapper = document.querySelector('.wrapper');
const currentSongImg = document.querySelector('#song-img');
const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.song-artist');
const currentTimeDisplay = document.querySelector('.current-time');
const totalDurationDisplay = document.querySelector('.total-time');
const mainSong = document.querySelector('.main-song');
const progressDiv = document.querySelector('.progress-div');
const progressBar = document.querySelector('.progress-line');
const playPause = document.querySelector('.play-pause');
const playPauseBtn = document.querySelector('#play-pause-button');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');

let songIndex = 2;

window.addEventListener('load', () => {
    loadSong(songIndex);
})

function loadSong(indexNumb) {
    songName.innerText = musicList[indexNumb - 1].name;
    artistName.innerText = musicList[indexNumb - 1].artist;
    currentSongImg.src = `./assets/images/${musicList[indexNumb - 1].img}.png`;
    mainSong.src = `./assets/audio/${musicList[indexNumb - 1].src}.mp3`
}

playPause.addEventListener('click', () => {
    const isSongPlay = wrapper.classList.contains('paused');
    isSongPlay ? pauseSong() : playSong();
});

function pauseSong() {
    wrapper.classList.remove('paused');
    playPauseBtn.classList.remove("fa-pause");
    playPauseBtn.classList.add("fa-play");
    mainSong.pause();
}

function playSong() {
    wrapper.classList.add('paused');
    playPauseBtn.classList.remove("fa-play");
    playPauseBtn.classList.add("fa-pause");
    mainSong.play();
}

prevButton.addEventListener('click', () => {
    playPrevSong();
});

function playPrevSong() {
    songIndex--;
    songIndex < 1 ? songIndex = musicList.length : songIndex = songIndex;
    loadSong(songIndex);
    playSong();
    playPauseBtn.classList.remove("fa-play");
    playPauseBtn.classList.add("fa-pause");
    mainSong.play();
}

nextButton.addEventListener('click', () => {
    playNextSong();
});

function playNextSong() {
    songIndex++;
    songIndex > musicList.length ? songIndex = 1 : songIndex = songIndex;
    loadSong(songIndex);
    playSong();
    playPauseBtn.classList.remove("fa-play");
    playPauseBtn.classList.add("fa-pause");
    mainSong.play();
}

mainSong.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`

    if(currentTime === duration) {
        playPauseBtn.classList.remove("fa-pause");
        playPauseBtn.classList.add("fa-play");
    }

    mainSong.addEventListener('loadeddata', () => {
        let audioDuration = mainSong.duration;

        let durationInMin = Math.floor(audioDuration / 60);
        let durationInSeconds = Math.floor(audioDuration % 60);
        if(durationInSeconds < 10) {
            durationInSeconds = `0${durationInSeconds}`
        }

        totalDurationDisplay.innerText = `${durationInMin}:${durationInSeconds}`
    })

    let currentSongInMin = Math.floor(currentTime / 60);
    let currentSongInSeconds = Math.floor(currentTime % 60);
    if(currentSongInSeconds < 10) {
        currentSongInSeconds = `0${currentSongInSeconds}`
    }

    currentTimeDisplay.innerText = `${currentSongInMin}:${currentSongInSeconds}`
})

progressDiv.addEventListener('click', (e) => {
    let progressWidthVal = progressDiv.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainSong.duration;

    mainSong.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;
    playSong();
})