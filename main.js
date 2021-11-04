// Get all locations from localStorage, or default empty array if not exists
function getLocations() {
  return JSON.parse(window.localStorage.getItem('locations')) || []
}

// Append new location to localStorage
function addLocation(name, lat, lng) {
  const locations = getLocations()
  const newLocation = {name, lat, lng}

  locations.push(newLocation)

  window.localStorage.setItem('locations', JSON.stringify(locations))
}

// Initialize the map
const cityMap = L.map('map')
  .setView([51.505, -0.09], 13)

// Set map tile from openstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(cityMap)

// When user click somewhere on the map
cityMap.on('click', (e) => {
  L.marker(e.latlng).addTo(cityMap)

  const name = prompt('Nama tempatnya apa kak?')

  addLocation(name, e.latlng.lat, e.latlng.lng)
})

// Show existings locations on map as marker
getLocations().forEach(location => {
  L.marker([location.lat, location.lng])
    .addTo(cityMap)
    .bindPopup(location.name || '-')
    .openPopup();
})
