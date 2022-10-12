const allMusic = [
    {
        name: "1. Awful",
        artist: "josh pan",
        img: "music__View01",
        audio: "music_audio01"
    },
    {
        name: "2. Black Mass",
        artist: "Brian Bolger",
        img: "music__View02",
        audio: "music_audio02"
    },
    {
        name: "3. Busy City",
        artist: "TrackTribe",
        img: "music__View03",
        audio: "music_audio03"
    },
    {
        name: "4. Dead Forest",
        artist: "Brian Bolger",
        img: "music__View04",
        audio: "music_audio04"
    },
    {
        name: "5. Disco Climax",
        artist: "An Jone",
        img: "music__View05",
        audio: "music_audio05"
    },
    {
        name: "6. Dulce Reggaeton",
        artist: "An Jone",
        img: "music__View06",
        audio: "music_audio06"
    },
    {
        name: "7. Floating Home",
        artist: "Brian Bolger",
        img: "music__View07",
        audio: "music_audio07"
    },
    {
        name: "8. Manifest It",
        artist: "NEFFEX",
        img: "music__View08",
        audio: "music_audio08"
    },
    {
        name: "9. Pressure Cooker",
        artist: "Jeremy Korpas",
        img: "music__View09",
        audio: "music_audio09"
    },
    {
        name: "10. The Thought of You",
        artist: "TrackTribe",
        img: "music__View10",
        audio: "music_audio10"
    },
]

const musicWrap = document.querySelector(".music__wrap");
const musicView = musicWrap.querySelector(".music__view .img img");
const musicName = musicWrap.querySelector(".music__view .title h3");
const musicArtist = musicWrap.querySelector(".music__view .title p");
const musicAudio = musicWrap.querySelector("#main-audio");
const musicPlay = musicWrap.querySelector("#control-play");
const musicPrevBtn = musicWrap.querySelector("#control-prev");
const musicNextBtn = musicWrap.querySelector("#control-next");
const musicProgress = musicWrap.querySelector(".progress");
const musicProgressBar = musicWrap.querySelector(".progress .bar");
const musicProgressCurrent = musicWrap.querySelector(".progress .timer .current");
const musicProgressDuration = musicWrap.querySelector(".progress .timer .duration");
const musicRepeat = musicWrap.querySelector("#control-repeat");
const musicListBtn = musicWrap.querySelector('#control-list');
const musicList = musicWrap.querySelector('.music__list');
const musicListUl = musicWrap.querySelector('.music__list ul');

let musicIndex = 1;

//음악 재생
function loadMusic(num) {
    musicName.innerText = allMusic[num - 1].name;
    musicArtist.innerText = allMusic[num - 1].artist;
    musicView.src = `../assets/img/${allMusic[num - 1].img}.png`;
    musicView.alt = allMusic[num - 1].name;
    musicAudio.src = `../assets/audio/${allMusic[num - 1].audio}.mp3`;
}

//재생 버튼
function playMusic() {
    musicWrap.classList.add("paused")
    musicPlay.setAttribute("title", "정지")
    musicPlay.setAttribute("class", "stop")
    musicAudio.play();
};

//정지 버튼
function pauseMusic() {
    musicWrap.classList.remove("paused")
    musicPlay.setAttribute("title", "재생")
    musicPlay.setAttribute("class", "play")
    musicAudio.pause();
}

//이전 곡 듣기 버튼
function prevMusic() {
    musicIndex == 1 ? musicIndex = allMusic.length : musicIndex--;
    loadMusic(musicIndex);
    playMusic();
}
//다음 곡 듣기 버튼
function nextMusic() {
    musicIndex == allMusic.length ? musicIndex = 1 : musicIndex++;
    loadMusic(musicIndex);
    playMusic();
}

//뮤직 진행바
musicAudio.addEventListener("timeupdate", e => {
    // console.log(e)

    const currentTime = e.target.currentTime;       //현재 재생되는 시간
    const duration = e.target.duration;             //오디오 총 길이
    let progressWidth = (currentTime / duration) * 100;   //전체 길이에서 현재 진행되는 시간을 백분위로 나눔
    musicProgressBar.style.width = `${progressWidth}%`;


    //전체시간
    musicAudio.addEventListener("loadeddata", () => {
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration / 60); //전체 시간을 분단위로 쪼갬
        let totalSec = Math.floor(audioDuration % 60); //남은 초를 저장
        if (totalSec < 10) totalSec = `0${totalSec}`;    //초가 한자릿수일때 0 붙임
        musicProgressDuration.innerText = `${totalMin}:${totalSec}`;    //완성된 시간 문자열을 출력
    });




    //진행시간
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) currentSec = `0${currentSec}`;
    musicProgressCurrent.innerText = `${currentMin}:${currentSec}`;
});

//진행 버튼 클릭
musicProgress.addEventListener("click", (e) => {
    let progressWidth = musicProgress.clientWidth;  //진행바 전체 길이
    let clickedOffsetX = e.offsetX;                 //진행바 기준으로 측정되는 x좌표
    let songDuration = musicAudio.duration;         //오디오 전체 길이

    musicAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration; //백분위로 나눈 숫자에 다시 전체 길이를 곱해서 현재 재생값으로 바꿈

});

//반복 버튼 클릭
musicRepeat.addEventListener("click",()=>{
    let getAttr = musicRepeat.getAttribute("class");

    switch(getAttr){
        case "repeat" :
            musicRepeat.setAttribute("class","repeat_one");
            musicRepeat.setAttribute("title","한곡 반복");
        break;
        case "repeat_one" :
            musicRepeat.setAttribute("class","shuffle");
            musicRepeat.setAttribute("title","랜덤 반복");
        break;
        case "shuffle" :
            musicRepeat.setAttribute("class","repeat");
            musicRepeat.setAttribute("title","전체 반복");
        break;
    }
});

//오디오가 끝나면
musicAudio.addEventListener("ended",()=>{
    let getAttr = musicRepeat.getAttribute("class");

    switch(getAttr){
        case "repeat" :
            nextMusic();
        break;
        case "repeat_one" :
            playMusic();
        break;
        case "shuffle" :
            let randomIndex = Math.floor(Math.random() * allMusic.length +1); // 랜덤 인덱스 생성

            do {
                randomIndex = Math.floor(Math.random() * allMusic.length + 1);
            } while (musicIndex == randomIndex)
            musicIndex = randomIndex;   //현재 인덱스를 랜덤 인덱스로 변경
            loadMusic(musicIndex);      //랜덤 인덱스가 반영된 현재 인덱스 값으로 음악을 다시 로드함
            playMusic();                //로드한 음악을 재생
        break;
    }
});

// 뮤직 리스트 버튼 클릭

musicListBtn.addEventListener("click",()=>{
    musicList.classList.add("swhow");
});

//뮤직 리스트 구현하기
for(let i = 0; i < allMusic.length; i++){
    let li = `
        <li>
            <strong>${allMusic[i].name}</strong>
            <em>${allMusic[i].artist}</em>
            <span>재생시간</span>
        </li>
    `;

    musicListUl.innerHTML += li;
}


// 플레이 버튼 클릭
musicPlay.addEventListener("click", () => {
    const isMusicPauesd = musicWrap.classList.contains("paused")
    isMusicPauesd ? pauseMusic() : playMusic();

})

//이전곡 버튼 클릭
musicPrevBtn.addEventListener("click", () => {
    prevMusic();
})
//다음곡 버튼 클릭
musicNextBtn.addEventListener("click", () => {
    nextMusic();
})



window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playMusic();

})
