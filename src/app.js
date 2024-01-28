let formjs = document.querySelector("#form");
formjs.addEventListener("submit", replacingFunction);
function replacingFunction(event) {
  event.preventDefault();
  let cityjs = document.querySelector("#city");
  let header = document.querySelector("#head");
  header.innerHTML = cityjs.value;
}
