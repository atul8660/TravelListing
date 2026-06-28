// Initialize Leaflet map with OpenStreetMap
const map = L.map("map").setView(
  [listing.geometry.coordinates[1], listing.geometry.coordinates[0]],
  9
);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Add marker with popup
L.marker([listing.geometry.coordinates[1], listing.geometry.coordinates[0]])
  .bindPopup(
    `<b>${listing.title}</b><br><p>Exact Location will be provided after booking</p>`
  )
  .addTo(map)
  .openPopup();
