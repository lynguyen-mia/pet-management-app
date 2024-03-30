"use strict";

let breedArr = [];
// let allBreedTypes = [];
let breedTypeCat = [];
let breedTypeDog = [];

const breedTableBodyEl = document.querySelector("tbody");
const btnSubmit = document.querySelector(".btn-breed");
const form = document.querySelector("form");
const breedInput = document.getElementById("input-id");
const typeInput = document.getElementById("input-type");
const sideBar = document.getElementById("sidebar");
const sideBarTitle = document.getElementById("sidebar-title");


// FUNCTIONS -------------------------------------------------------------
// RENDER BREED TABLE
function renderBreedTable(breedArr) {
  breedTableBodyEl.innerHTML = "";
  breedArr.forEach((arr) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${breedArr.indexOf(arr) + 1}</td>
                     <td>${arr.breed}</td>
                     <td>${arr.type}</td>
                     <td><button type="button"
												class="btn btn-danger" onclick="deleteBreeds('${
                          arr.breed
                        }')">Delete</button></td>`;
    breedTableBodyEl.appendChild(row);
  });
}

// VALIDATE DATA
function breedValidate(data) {
  if (!data.breed) {
    alert("Please input for Breed");
    return false;
  }

  if (data.type === "Select Type") {
    alert("Please select Type!");
    return false;
  }

  return true;
}

// DELETE BREEDS
function deleteBreeds(breed) {
  // Confirm before deleting
  if (confirm("Are you sure?")) {
    const index = breedArr.findIndex((object) => {
      return object.breed === breed;
    });
    breedArr.splice(index, 1);
    renderBreed();
    saveToStorage("breed", breedArr);
    renderBreedTable(breedArr);
  }
}

// GENERATE BREED ARRAYS FOR CAT & DOGS AND SAVE TO LOCAL STORAGE
function renderBreed() {
  // allBreedTypes = breedArr.map((arr) => arr.breed);
  // Create cat breed types
  breedTypeCat = breedArr
    .filter((arr) => arr.type === "Cat")
    .map((arr) => arr.breed);
  saveToStorage("breedTypeCat", breedTypeCat);
  // Create dog breed types
  breedTypeDog = breedArr
    .filter((arr) => arr.type === "Dog")
    .map((arr) => arr.breed);
  saveToStorage("breedTypeDog", breedTypeDog);
}

// EVENT LISTENERS -------------------------------------------------------
// SIDEBAR ANIMATION
sideBarTitle.addEventListener("click", function (e) {
  sideBar.classList.toggle("active");
});

// GET BREED DATA FROM LOCAL STORAGE AND DISPLAY IN TABLE
window.addEventListener("load", function () {
  const savedBreed = getFromStorage("breed", []);
  if (!savedBreed) {
    // Get breed types from home
    const storedPetArr = getFromStorage("petStorage", []);
    breedArr = [];
    storedPetArr.forEach((arr) => {
      breedArr.push({ breed: arr.breed, type: arr.type });
    });
  } else {
    // Get breed types from local storage
    breedArr = savedBreed;

    renderBreed();
  }

  // Render breed table
  renderBreedTable(breedArr);
});

// ADD A NEW BREED WHEN CLICKING 'SUBMIT' BUTTON
btnSubmit.addEventListener("click", function (e) {
  const data = {
    breed: breedInput.value,
    type: typeInput.value
  };

  const validate = breedValidate(data);
  if (validate) {
    breedArr.push(data);
    renderBreed();
    form.reset();
    // Save breed in local storage
    saveToStorage("breed", breedArr);
    renderBreedTable(breedArr);
  }
});
