"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

///////////////////////////////////////////////////////////////

// Geolocation API
let map, mapEvent;

// Refactoring for project architecture
class App {
  constructor() {}

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this._loadMap, function () {
        alert("Couldn't get you location");
      });
  }
  _loadMap(position) {
    // console.log(position);
    let { latitude } = position.coords;
    let { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    // Displaying a map using LEAFLET Library
    let coords = [latitude, longitude];
    map = L.map("map").setView(coords, 12); // 100 is the zoom level
    // console.log(map);
    L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      // fr/hot map tiles from openstreetmap (replce with org)
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Displaying a map Marker :
    // Handling clicks on map

    map.on("click", function (mapE) {
      mapEvent = mapE;
      // on method is from the leaflet library
      form.classList.remove("hidden");
      inputDistance.focus();
    });
  }
  _showForm() {}
  _toggleElevationField() {}
  _newWorkout() {}
}

//////////////////////////////////////////////////////////////

// Rendering workout input form

form.addEventListener("click", function (e) {
  e.preventDefault();
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      "";
  // Display marker
  console.log(mapEvent);
  let { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxwidth: 250,
        minwidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("Workout")
    .openPopup();
});

inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});

/////////////////////////////////////////////////////////////
