let img = document.getElementById("img")
let audio = document.getElementById("audio")
let trackName = document.getElementById("track-name")
let trackArtist = document.getElementById("track-artist")
let back = document.getElementById("back")
let play = document.getElementById("play")
let foward = document.getElementById("foward")
let currentMusic = document.getElementById("current-time")
let totalMusic = document.getElementById("total-duration")
let progress = document.getElementById("progress")

let playing = false
let index = 0

let data = [
    {
        image: "assets/images/As It Was.png",
        title: "As It Was",
        artist: "Harry Styles",
        file: "assets/Musicas/Harry Styles - As It Was.mp3",
        background: "linear-gradient(35deg, #356b8c 0%, #e5d6bf 40%, #bf926b 100%)"
    },
    {
        image: "assets/images/Stay_-_The_Kid_Laroi_e_Justin_Bieber.png",
        title: "Stay",
        artist: "The Kid LAROI, Justin Bieber",
        file: "assets/Musicas/The Kid LAROI, Justin Bieber - Stay.mp3",
        background: "linear-gradient(328deg, #054a59 0%, #87a1b6 52%, #b2f7ff 100%)"
    },
    {
        image: "assets/images/Jack_Harlow_-_Come_Home_the_Kids_Miss_You.png",
        title: "First Class",
        artist: "Jack Harlow",
        file: "assets/Musicas/Jack Harlow - First Class.mp3",
        background: "linear-gradient(328deg, #B59F9D 0%, #F2EBEB 100%)"
    },
    {
        image: "assets/images/Montero_-_Lil_Nas_X.png",
        title: "THATS WHAT I WANT",
        artist: "Lil Nas X",
        file: "assets/Musicas/Lil Nas X - THATS WHAT I WANT.mp3",
        background: "linear-gradient(339deg, #db8cba 7%, #ddd 50%, #7ca0c4 100%)"
    }
]

localStorage.setItem("newData", JSON.stringify(data))
let musics = JSON.parse(localStorage.newData)

function RenderMe(){
    img.src = musics[index].image
    audio.src = musics[index].file
    document.body.style.backgroundImage = musics[index].background
    trackName.innerHTML = musics[index].title
    trackArtist.innerHTML = musics[index].artist
}
RenderMe()

function playPause(){
    playing ? goPause() : goPlay()
}
function goPause(){
    audio.pause()
    play.src = "assets/buttons/play-circle.svg"
    playing = false
}
function goPlay(){
    audio.play()
    play.src = "assets/buttons/pause-circle.svg"
    playing = true
}
function updateProgress(){
    let porcent = Math.floor((audio.currentTime / audio.duration) * 100)
    progress.value = porcent
    currentMusic.innerHTML = secondsInMinutes(Math.floor(audio.currentTime)
    )
    totalMusic.innerHTML = secondsInMinutes(Math.floor(audio.duration))
    if(audio.currentTime == audio.duration) {
        nextMusic()
    }
}
function changeProgress(){
    audio.currentTime = progress.value / progress.max * audio.duration
    goPlay()
    audio.play()
}
function secondsInMinutes(second) {
    let minutes = Math.floor(second / 60)
    let seconds = second % 60

    if(seconds < 10) {
        seconds = '0' + seconds
    }
    return minutes + ":" + seconds
}

function backMusic(){
    index --
    if(index < 0){
        index = musics.length - 1
    }
    RenderMe()
    goPlay()
}

function nextMusic(){
    index ++
    if(index > musics.length - 1){
        index = 0
    }
    RenderMe()
    goPlay()
}

play.addEventListener("click", playPause)
audio.addEventListener("timeupdate", updateProgress)
progress.addEventListener("change", changeProgress)
back.addEventListener("click", backMusic)
foward.addEventListener("click", nextMusic)