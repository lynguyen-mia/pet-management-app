"use strict";

let petArr;
let breedArr;

const tableBodyEl = document.querySelector("tbody");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn");
const sideBar = document.getElementById("sidebar");
const sideBarTitle = document.getElementById("sidebar-title");


// FUNCTION --------------------------------------------------------------
// RENDER PET TABLES
// prettier-ignore
function showPetTable(arr) {
  if (arr.length === 0) {
    tableBodyEl.innerHTML = '<div class="my-2">No results to be found.</div>';
  } else {
    tableBodyEl.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
      const row = document.createElement("tr");
      row.innerHTML = `<td class="idnumber">${arr[i].id}</td>
                    <td>${arr[i].name}</td>
                    <td>${arr[i].age}</td>
                    <td>${arr[i].type}</td>
                    <td>${arr[i].weight}</td>
                    <td>${arr[i].len}</td>
                    <td>${arr[i].breed}</td>
                    <td><i class="bi bi-square-fill"
                        style="color: ${arr[i].color}"></i></td>
                    <td>${arr[i].vaccinated
                        ? '<i class="bi bi-check-circle-fill"></i>'
                        : '<i class="bi bi-x-circle-fill"></i>'}</td>
                    <td>${arr[i].dewormed
                        ? '<i class="bi bi-check-circle-fill"></i>'
                        : '<i class="bi bi-x-circle-fill"></i>'}</td>
                    <td>${arr[i].sterilized
                        ? '<i class="bi bi-check-circle-fill"></i>'
                        : '<i class="bi bi-x-circle-fill"></i>'}</td>
                    <td>${arr[i].date}</td>`;
      tableBodyEl.appendChild(row);
    }
  }
}

// DISPLAY ALL BREED TYPES IN FORM
function displayBreed() {
  breedArr = getFromStorage("breed", []);
  const allBreedTypes = breedArr.map((arr) => arr.breed);

  breedInput.innerHTML = `<option>Select Breed</option>`;

  allBreedTypes.forEach((el) => {
    const option = document.createElement("option");
    option.innerHTML = `${el}`;
    breedInput.appendChild(option);
  });
}

// EVENT LISTENERS --------------------------------------------------------
// SHOW CURRENT PETS WHEN LOADING BROWSER
window.addEventListener("load", function () {
  petArr = getFromStorage("petStorage", []);
  showPetTable(petArr);
});

// SIDEBAR ANIMATION
sideBarTitle.addEventListener("click", function (e) {
  sideBar.classList.toggle("active");
});

// DISPLAY BREED TYPES IN FORM
breedInput.addEventListener("click", function () {
  displayBreed();
});

// CLICKING FIND BUTTON
findBtn.addEventListener("click", function () {
  const findID = idInput.value;
  const findName = nameInput.value;
  const findType = typeInput.value;
  const findBreed = breedInput.value;
  const findVaccinated = vaccinatedInput.checked || "";
  const findDewormed = dewormedInput.checked || "";
  const findSterilized = sterilizedInput.checked || "";

  const qualifiedPets = petArr.filter(
    (obj) =>
      obj.id.includes(findID) &&
      obj.name.includes(findName) &&
      (obj.vaccinated === findVaccinated || findVaccinated === "") &&
      (obj.dewormed === findDewormed || findDewormed === "") &&
      (obj.sterilized === findSterilized || findSterilized === "") &&
      (obj.type === findType || findType === "Select Type") &&
      (obj.breed === findBreed || findBreed === "Select Breed")
  );

  showPetTable(qualifiedPets);

  // clear form inputs
  idInput.value = nameInput.value = "";
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
});