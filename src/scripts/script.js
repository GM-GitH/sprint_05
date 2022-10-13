//------------------------------------------------------ NAVBAR DROPDOWN
const menu = document.querySelector(".navbar__menu");
const menuItems = document.querySelectorAll(".navbar__menu__li");
const burger = document.querySelector(".navbar__burger");
const closeIcon = document.querySelector(".navbar__burger__close");
const menuIcon = document.querySelector(".navbar__burger__open");

function toggleMenu() {
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  } else {
    menu.classList.add("hidden");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  }
}

burger.addEventListener("click", toggleMenu);
menuItems.forEach(function (li) {
  li.addEventListener("click", toggleMenu);
});

//------------------------------------------------------ GOOGLE MAPS
import { locations } from "../data/markers.js";

const markLatLng = { lat: 40.416668, lng: -3.704064 };
function initMap() {
  // const bounds = new google.maps.LatLngBounds();
  // const markersArray = [];
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: markLatLng,
  });
  let infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: false,
  });
  const markers = locations.map((position) => {
    const marker = new google.maps.Marker({
      position,
      icon: "../src/assets/icons/marker25.png",
    });
    // https://developers.google.com/maps/documentation/javascript/marker-clustering
    marker.addListener("click", () => {
      infoWindow.setContent(`Miranda Hotel: ${position.com}`);
      infoWindow.open(map, marker);
    });
    return marker;
  });
  new markerClusterer.MarkerClusterer({ markers, map });
  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "📍";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("You are here");
        infoWindow.open(map);
        map.setCenter(pos);
        const request = {
          origins: [pos],
          destinations: locations,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        };
        // document.getElementById("request").innerText = JSON.stringify(request.origins, null, 2);
        // get distance matrix response
        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(request).then((response) => {
          // document.getElementById("response").innerText = JSON.stringify(response.rows, null, 2);
          document.getElementById("originAddress").innerText = JSON.stringify(response.originAddresses, null, 2);
          // document.getElementById("destinationList").innerText = JSON.stringify(response.destinationAddresses, null, 2);
          // deleteMarkers(markersArray);
          let origins = response.originAddresses;
          let destinations = response.destinationAddresses;
          let arrayResults = [];
          for (let i = 0; i < origins.length; i++) {
            let results = response.rows[i].elements;
            for (let j = 0; j < results.length; j++) {
              let element = results[j];
              let distance = element.distance.text;
              let distanceNumber = ("00000" + element.distance.value).slice(-9);
              let duration = element.duration.text;
              // let from = origins[i];
              let to = destinations[j];
              // let selector = document.getElementById("mapList");
              // let option = document.createElement("option")
              // option.value = "value"
              let option = `${distance} to ${to} (ETA: ${duration})`;
              arrayResults.push("" + distanceNumber + " - " + option);
              // selector.add(option)
            }
          }
          arrayResults.sort();
          // console.log(arrayResults)
          document.getElementById("destinationList").innerText = JSON.stringify(arrayResults, null, 1);
        });
      });
    }
    // else {
    //   // Browser doesn't support Geolocation
    //   handleLocationError(false, infoWindow, map.getCenter());
    // }
  });

  //*******************************************************************
  // const geocoder = new google.maps.Geocoder();
}
// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ? "Error: The Geolocation service failed." : "Error: Your browser doesn't support geolocation.");
//   infoWindow.open(map);
// }

window.initMap = initMap;

//------------------------------------------------------ NEW SCRIPT
