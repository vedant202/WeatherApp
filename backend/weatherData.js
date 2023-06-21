import fetch from "node-fetch";

const fetchWeatherData=async(city)=>{
  const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='+city;
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '74b1ad9b44mshd985744aeba8fcap1ae5cfjsn47cbbaee5d05',
    'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
  }
};
let response ,wather_result;
try {
	response = await fetch(url, options);
	wather_result = await response.json();
	console.log(wather_result);
} catch (error) {
	console.error(error);
}
return wather_result;
}


export {fetchWeatherData};