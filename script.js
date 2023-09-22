const img = document.querySelector('img')
const title = document.querySelector('#title')
const artist = document.querySelector('#artist')
const music = document.querySelector('audio')

const progressContainer = document.querySelector('#progress-container')
const progress = document.querySelector('#progress')

const currentTimeEl = document.querySelector('#current-time')
const durationEl = document.querySelector('#duration')

const prevBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const nextBtn = document.querySelector('#next')

const songs = [
    {
        name: 'fieldtrip',
        displayName: 'fieldtrip',
        artist: 'Esqq',
        //link: 'https://soundcloud.com/dq_qb/fieldtrip',
        soundcloud: '<iframe height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1621621086&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"></div>',
    },
    {
        name: 'Rabbits',
        displayName: 'Rabbits',
        artist: 'Paradís',
    },
    {
        name: 'José Mercado',
        displayName: 'José Mercado',
        artist: 'Serú Girán',
    },
    {
        name: 'Na Wesiliu Pid Chatoju',
        displayName: 'Na Wesiliu Pid Chatoju',
        artist: 'Pawlo Humeniuk',
    },

]

let isPlaying = false;
const player = document.querySelector('.player-container')
const soundcloud = ducument.querySelector ('.soundcloud')

function playSong() {
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play()
}
function pauseSong() {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause()
}

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  if (song.soundcloud) {
  player.classList.add('hide')
  soundcloud.innerHTML = song.soundcloud
  soundcloud.classList.remove('hide')
  } else {
  player.classList.remove('hide')
  soundcloud.classList.add('hide')
  }

  // Check if a SoundCloud link is provided
  if (song.link) {
    // Fetch and play the SoundCloud track
    //fetchAndPlaySoundcloudTrack(song.link);
  } else {
    // Load a local audio file
    music.src = `music/${song.name}.wav`;
  }

  img.src = `img/${song.name}.jpg`;
}

let songIndex = 0;

function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

//Wowzers
function updateProgressBar(e) {
    if (isPlaying) {
        const { currentTime, duration } = e.srcElement
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`
        //Calculate display for duration
        const durationMinutes = Math.floor(duration / 60)
        // remainder %
        let durationSec = Math.floor(duration % 60)
        if (durationSec < 10) {
            durationSec = `0${durationSec}`
        }
        //Delay switching duration to avoid NaN
        if (durationSec) {
            durationEl.textContent = `${durationMinutes}:${durationSec}`
        }
        //Calculate display for currentTime
        const currentMinutes = Math.floor(currentTime / 60)
        // remainder %
        let currentSec = Math.floor(currentTime % 60)
        if (currentSec < 10) {
            currentSec = `0${currentSec}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSec}`
    }
}

function setProgressBar(e) {
  const { duration } = music;

  // Ensure that duration is a finite number
  if (isFinite(duration)) {
    // Calculate the new currentTime based on the click position
    const newTime = (e.offsetX / this.clientWidth) * duration;

    // Check if newTime is finite and within the valid time range
    if (isFinite(newTime) && newTime >= 0 && newTime <= duration) {
      music.currentTime = newTime;
    }
  }
}


// Bottom
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

loadSong(songs[songIndex])

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
music.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', setProgressBar)