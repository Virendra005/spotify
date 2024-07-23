// console.log("hello")
// async function getsongs(){
//     let a= await fetch("http://127.0.0.1:5500/songs/")
//     let resp = await a.text()
//     console.log(resp)
//     let div= document.createElement("div")
//     div.innerHtml =resp
//    let as= div.getElementsByTagName("a")
//    let songs=[]
//    for (let index = 0; index < as.length; index++) {
//     const element = as[index];
//     if(element.href.endsWith(".mp3")){
//         songs.push(element.href)
//     }
    
//    }
//    return songs

// }
// async function main(){
//     let songs= await getsongs()
//     console.log(songs)
//     let songul=document.querySelector(".songlist").getElementsByTagName("ul")[0]
//     for (const song of songs) {
//         songul.innerHtml=new songul.innerHtml + song;
        
//     }

//     var audio = new Audio(songs[0]);
//     audio.play();
//     audio.addEventListener("loadeddata", ()=>{
//         let duration =audio.duration;
//         console.log(duration)
//     });

// }
// main()
//ddddddddddddddddddddddddddddddddddd
let currentsong =new Audio();
var songs;
let currfolder;
function secondsToMinutesSeconds(seconds){
    if(isNaN(seconds) || seconds<0){
        return "00:00";
    }
    const minutes =Math.floor(seconds/60);
    const remainingSeconds =Math.floor(seconds%60);
    const formattoMinutes =String(minutes).padStart(2, '0');
    const formattoSeconds =String(remainingSeconds).padStart(2, '0');
    return `${formattoMinutes}:${formattoSeconds}`;
    
}

async function getsongs(folder){
    currfolder=folder;

    let a = await fetch(`http://127.0.0.1:5500/${folder}/`)
        let response = await a.text();
        console.log(response)
        var div = document.createElement("div")
        div.innerHTML=response;
        let as = div.getElementsByTagName("a")
         songs=[];
        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if(element.href.endsWith(".mp3")){
                songs.push(element.href.split(`/${folder}/`)[1]);//href spelling mistake write herf
            }
        }
        // console.log(songs)
        // return songs
        // console.log(as)
        // //show all the songs in playlist
var songUL=document.querySelector(".songlist").getElementsByTagName("ul")[0]
songUL.innerHTML=""
    for (const song of songs) {
        songUL.innerHTML= songUL.innerHTML + `<li> <img class="invert" src="music.svg" alt="">
        <div class="info">
          <div>${song.replaceAll("%20", " ")}</div>
          <div>
            viru
          </div>
        </div>
        <div class="playnow">
          <span>Play Now</span>
          <img class="invert" src="play.svg" alt="">
        </div> </li>`;
        
    }
    //attach an event listner to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        // console.log(e)
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
            
        })
    })
    //attach an event listner to play pause next and previous
    play.addEventListener("click", ()=>{
        if(currentsong.paused){
            currentsong.play()
            play.src="pause.svg"
        }
        else{
            currentsong.pause()
            play.src="play.svg"
        }
    })
    return songs
}
const playmusic =(track,pause=false) =>{
    // let audio=new Audio("/music/"+track)
    currentsong.src= `/${currfolder}/`+track
    if(!pause){
        currentsong.play();
        play.src="pause.svg"
    }
    // currentsong.play();
    document.querySelector(".songinfo").innerHTML=decodeURI(track)
    document.querySelector(".songtime").innerHTML="00:00 / 00:00"

}

async function displayalbums(){
    
    let a = await fetch(`http://127.0.0.1:5500/music/`)
        let response = await a.text();
        console.log(response)
        var div = document.createElement("div")
        div.innerHTML=response;
        let anchor = div.getElementsByTagName("a")
        let cardcontainer=document.querySelector(".cardcontainer")
        let array=Array.from(anchor)
        for (let index = 0; index < array.length; index++) {
            const e = array[index];
            
            if(e.href.includes("/music/")){
                let folder=e.href.split("/").slice(-1)[0]
                let a = await fetch(`http://127.0.0.1:5500/music/${folder}/info.json`)
                console.log(e.href.split("/"))
        let response = await a.json();
        console.log(response)
        console.log(folder)
        cardcontainer.innerHTML = cardcontainer.innerHTML + `<div data-folder="${folder}" class="card ">
        <div class="play">
          <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
            class="Svg-sc-ytk21e-0 bneLcE">
            <path d="M7.5 3.606L20.99 11.394L7.5 19.182V3.606Z" fill="black"></path>
          </svg>
        </div>
        <img src="/music/${folder}/cover.jpg" alt="">
        <h2>${response.title}</h2>
        <p>${response.discription}</p>
    
      </div>`
            }
        }

        
        Array.from(document.getElementsByClassName("card")).forEach(e=>{
            e.addEventListener("click", async item=>{
                console.log(item.currentTarget.dataset)
                songs= await getsongs(`music/${item.currentTarget.dataset.folder}`);
                playmusic(songs[0])
                
            })
        })
        
}
// getsongs()

// async function displayalbums(){
//     let a = await fetch(`http://127.0.0.1:5500/music/`)
//         let response = await a.text();
//         console.log(response)
//         var div = document.createElement("div")
//         div.innerHTML=response;
//         let anchor=div.getElementsByTagName("a")
       
//         Array.from(anchor).forEach(e=>{
//             if(e.href.includes("/music/"))
//             console.log(e.href.split("/").slice(-1)[0]) slice ma /music/ lakhvanu and slice ma -1 0 ni mistake hati
        
//         })
        
// }
async function main(){
     songs= await getsongs("/music/ncs");
    playmusic(songs[0],true)
console.log(songs)

displayalbums()

// //show all the songs in playlist
// var songUL=document.querySelector(".songlist").getElementsByTagName("ul")[0]
//     for (const song of songs) {
//         songUL.innerHTML= songUL.innerHTML + `<li> <img class="invert" src="music.svg" alt="">
//         <div class="info">
//           <div>${song.replaceAll("%20", " ")}</div>
//           <div>
//             viru
//           </div>
//         </div>
//         <div class="playnow">
//           <span>Play Now</span>
//           <img class="invert" src="play.svg" alt="">
//         </div> </li>`;
        
//     }
//     //attach an event listner to each song
//     Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
//         // console.log(e)
//         e.addEventListener("click", element=>{
//             console.log(e.querySelector(".info").firstElementChild.innerHTML)
//             playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
            
//         })
//     })
//     //attach an event listner to play pause next and previous
//     play.addEventListener("click", ()=>{
//         if(currentsong.paused){
//             currentsong.play()
//             play.src="pause.svg"
//         }
//         else{
//             currentsong.pause()
//             play.src="play.svg"
//         }
//     })
    currentsong.addEventListener("timeupdate", ()=>{
        console.log(currentsong.currentTime,currentsong.duration)
        document.querySelector(".songtime").innerHTML=
        `${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`
        document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100+"%";
    })
    document.querySelector('.seekbar').addEventListener("click", e=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left=percent+"%";
        currentsong.currentTime=((currentsong.duration)*percent)/100

    })
    document.querySelector(".hamburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left="0"
    })
    document.querySelector(".close").addEventListener("click", ()=>{
        document.querySelector(".left").style.left="-120%"
    })
    previous.addEventListener("click", ()=>{
        console.log(currentsong)
        console.log(songs.indexOf(currentsong.src.split("/").slice(-1)[0]))
        let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if((index-1)>=0){
            playmusic(songs[index-1])
        }
    })
    next.addEventListener("click", ()=>{
        // currentsong.src= `/music/${currfolder}`
        // console.log(currentsong)
        currentsong.pause()
        let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        console.log(songs.indexOf(currentsong.src.split("/").slice(-1)[0]))
        if((index+1) < songs.length){
            playmusic(songs[index+1])
        }
    })
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
        currentsong.volume=parseInt(e.target.value)/100
        if(currentsong.volume >0){
            document.querySelector(".volume>img").src=document.querySelector(".volume>img").src.replace("mute.svg","volume.svg")
        }

    })
    // Array.from(document.getElementsByClassName("card")).forEach(e=>{
    //     e.addEventListener("click", async item=>{
    //         console.log(item.currentTarget.dataset)
    //         songs= await getsongs(`music/${item.currentTarget.dataset.folder}`);
            
    //     })
    // })
    
// var audio = new Audio(songs[0]);
// audio.play();
// audio.addEventListener("loadeddata", ()=>{
//             let duration =audio.duration;
//             console.log(audio.duration, audio.currentSrc, audio.currentTime)
//         });

    document.querySelector(".volume>img").addEventListener("click",e=>{
        console.log(e.target)
        console.log("changing",e.target.src)
        if(e.target.src.includes("volume.svg")){
            e.target.src = e.target.src.replace("volume.svg" , "mute.svg")
            currentsong.volume=0;
            document.querySelector(".range").getElementsByTagName("input")[0].value=0;
            
        }
        else{
            e.target.src = e.target.src.replace("mute.svg" , "volume.svg")
            currentsong.volume=0.1;
            document.querySelector(".range").getElementsByTagName("input")[0].value=10;

        }

    })
}
main()