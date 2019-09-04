let appId = "7de2ff0ea3b6cc205010428ee7718147";
let units = "matric";
let searchMethod ;
let searchInput = document.getElementById("searchInput");
function getSearchMethod(searchTerm){
	if(searchTerm.length == 5 && Number.parseInt(searchTerm)+'' == searchTerm){
		searchMethod="zip";
	}else{
		searchMethod = "q";
	}
}

function searchweather(searchTerm){
	getSearchMethod(searchTerm);
	let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+appId;

	fetch(searchLink).then(result =>{
		return result.json();
	}).then(result => {
		init(result);
	})
}

function init(resultFromServer){
	console.log(resultFromServer);
	switch(resultFromServer.weather[0].main){
		case "Clear":
			document.body.style.backgroundImage = 'url("sunny.jpeg")';
		break;

		case "Clouds":
			document.body.style.backgroundImage = 'url("cloudy.jpeg")';
		break;

		case "Rain":
		case "Drizzle":
		case "Mist":
			document.body.style.backgroundImage = 'url("rainy.jpeg")';
		break;

		case "Thunderstorm":
			document.body.style.backgroundImage = 'url("storm.jpeg")';
		break;

		case "Snow":
			document.body.style.backgroundImage = 'url("snow.jpeg")';
		break;

		default:
			break;

	}

	let weatherDescriptionHeader = document.getElementById("weatherDescriptionHeader");
	let temperatureElement = document.getElementById("temperature");
	let humidityElement = document.getElementById("humidity");
	let windspeedElement = document.getElementById("windSpeed");
	let cityHeader = document.getElementById("city-name");
	let weatherIcon = document.getElementById("documentIconImg");

	weatherIcon.src = "http://openweathermap.org/img/w/"+resultFromServer.weather[0].icon+".png";
	let resultDescription = resultFromServer.weather[0].description;
	weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase()+resultDescription.slice(1);
	
	temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp - 273)+'&#176';
	windspeedElement.innerHTML = "Winds at " + Math.floor(resultFromServer.wind.speed) +"m/s";
	cityHeader.innerHTML = resultFromServer.name;
	humidityElement.innerHTML = "humidity levels at " + resultFromServer.main.humidity + "%";
	
}

document.getElementById("searchBtn").addEventListener("click",()=>{
	let searchTerm = document.getElementById("searchInput").value;
	if(searchTerm){
		searchweather(searchTerm);
	}
})
