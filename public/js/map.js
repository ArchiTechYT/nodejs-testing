const geoForm = document.querySelector("#weather-form");

geoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let lat = latElem.value;
  let long = longElem.value;
  createMap(lat, long);
});

function createMap(lat, long) {
  var map = L.map("leaflet-map").setView([lat, long], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
}
