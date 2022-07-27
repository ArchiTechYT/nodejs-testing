// const forecast = require("../../src/utils/forecast");
// Q : is the client app supposed to call backend js??

// import * as THREE from "three";

console.log("Client side javascript is loaded!");

function myFetch(url) {
  fetch(url).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        // messageOne.textContent = data.location.country;
        messageTwo.textContent = data.location.region;
        // messageThree.textContent = data.current.observation_time;
        // messageFour.textContent = data.current.temperature;
      }
    });
  });
}

// if you are fetching your own website : fetch(http://localhost/subpage) -> fetch(/subpage)

const weatherForm = document.querySelector("#weather-form");
const latElem = document.querySelector("#lat");
const longElem = document.querySelector("#long");

// const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");
// const messageThree = document.querySelector("#messageThree");
// const messageFour = document.querySelector("#messageFour");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let lat = latElem.value;
  let long = longElem.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  let url =
    "http://api.weatherstack.com/current?access_key=3aa813ef531327f2b1b35a20fe18d82c&query=" +
    lat +
    "," +
    long;

  myFetch(url);
});
