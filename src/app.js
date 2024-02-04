let formjs = document.querySelector("#form");
formjs.addEventListener("submit", replacingFunction);
function replacingFunction(event) {
  event.preventDefault();
  let cityjs = document.querySelector("#city");

  cityweather(cityjs.value);
}
function cityweather(city) {
  let apikey = "2710a7433443ato3f2a46b02f714f1fe";
  let apiurl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;
  axios.get(apiurl).then(refresh);
}
function refresh(response) {
  let currenttime = document.querySelector("#time");
  let currentdescription = document.querySelector("#description");
  let currenthumadity = document.querySelector("#humadity");
  let currenticon = document.querySelector("#icon");
  let currentwind = document.querySelector("#wind");
  let date = new Date(response.data.time * 1000);
  let oldDegree = document.querySelector("#current");
  let newdegree = response.data.temperature.current;
  oldDegree.innerHTML = Math.round(newdegree);
  let header = document.querySelector("#head");
  header.innerHTML = response.data.city;
  currenttime.innerHTML = formatedate(date);
  currentdescription.innerHTML = response.data.condition.description;
  currenthumadity.innerHTML = `${response.data.temperature.humidity}%`;
  currentwind.innerHTML = `${response.data.wind.speed}km/h`;
  currenticon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
  getdata(response.data.city);
}
function formatedate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}${hours}:${minutes}`;
}
function getdata(city) {
  apikey = `2710a7433443ato3f2a46b02f714f1fe`;
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=metric`;
  axios(apiUrl).then(displayforecast);
}
function displayforecast(response) {
  console.log(response);

  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="forecast-Days"> <div class="forcastDay">${formatDay(
          day.time
        )}
        </div>
            <img src="${day.condition.icon_url}" class="forcastIcon">
            
            <div class="forcastDegree">
              <span id="forcastMax">${Math.round(
                day.temperature.maximum
              )} </span
              ><span id="forcastMin" class="forcastMin"> ${Math.round(
                day.temperature.minimum
              )}</span>
            </div>
          </div>
        </div> `;
    }
  });
  let forecast = document.querySelector("#forcast");
  forecast.innerHTML = forecastHTML;
}
function formatDay(milisec) {
  let date = new Date(milisec * 1000);
  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[date.getDay()];
}
cityweather("Kabul");
