cityweather("Kabul");
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
  console.log(response.data);
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
