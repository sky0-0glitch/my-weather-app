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
  let oldDegree = document.querySelector("#current");
  let newdegree = response.data.temperature.current;
  oldDegree.innerHTML = Math.round(newdegree);
  let header = document.querySelector("#head");
  header.innerHTML = response.data.city;
}
cityweather("Kabul");
