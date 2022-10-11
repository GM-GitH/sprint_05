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

let map;
let marker;
let watchID;
let geoLoc;

const markLatLng = { lat: 40.416668, lng: -3.704064 };
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: markLatLng,
  });
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });
  const markers = locations.map((position) => {
    const marker = new google.maps.Marker({
      position,
      icon: "../src/assets/icons/marker25.png",
    });
    // https://developers.google.com/maps/documentation/javascript/marker-clustering
    marker.addListener("click", () => {
      infoWindow.setContent(label);
      infoWindow.open(map, marker);
    });
    return marker;
  });
  new markerClusterer.MarkerClusterer({ markers, map });
}




window.initMap = initMap;


//------------------------------------------------------ NEW SCRIPT