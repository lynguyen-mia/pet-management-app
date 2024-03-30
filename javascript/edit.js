"use strict";

let petArr;

const tableBodyEl = document.querySelector("tbody");
const main = document.getElementById("main");
const sideBar = document.getElementById("sidebar");
const sideBarTitle = document.getElementById("sidebar-title");
const formContainer = document.querySelector('form');
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const submitBtn = document.getElementById("submit-btn");

// FUNCTIONS -------------------------------------------------------------
// DISPLAY BREED TYPES IN FORM
function displayBreed() {
  const breedTypeCat = getFromStorage("breedTypeCat", []);
  const breedTypeDog = getFromStorage("breedTypeDog", []);

  document.getElementById(
    "input-breed"
  ).innerHTML = `<option>Select Breed</option>`;

  function appendCatAndDogBreed(arr) {
    arr.forEach((el) => {
      const option = document.createElement("option");
      option.innerHTML = `${el}`;
      document.getElementById("input-breed").appendChild(option);
    });
  }

  if (document.getElementById("input-type").value === "Dog") {
    appendCatAndDogBreed(breedTypeDog);
  } else {
    appendCatAndDogBreed(breedTypeCat);
  }
}

// RENDER PET TABLE
// prettier-ignore
function showPetTable() {
  petArr = getFromStorage("petStorage", []);
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<td class="idnumber">${petArr[i].id}</td>
                    <td>${petArr[i].name}</td>
                    <td>${petArr[i].age}</td>
                    <td>${petArr[i].type}</td>
                    <td>${petArr[i].weight}</td>
                    <td>${petArr[i].len}</td>
                    <td>${petArr[i].breed}</td>
                    <td><i class="bi bi-square-fill"
                        style="color: ${petArr[i].color}"></i></td>
                    <td>${petArr[i].vaccinated
                        ? '<i class="bi bi-check-circle-fill"></i>'
                        : '<i class="bi bi-x-circle-fill"></i>'}</td>
                    <td>${petArr[i].dewormed
                        ? '<i class="bi bi-check-circle-fill"></i>'
                        : '<i class="bi bi-x-circle-fill"></i>'}</td>
                    <td>${petArr[i].sterilized
                        ? '<i class="bi bi-check-circle-fill"></i>'
                        : '<i class="bi bi-x-circle-fill"></i>'}</td>
                    <td>${petArr[i].date}</td>
                    <td><button type="button"
												class="btn btn-warning" onclick="editPet('${petArr[i].id}')">Edit</button></td>`;
    tableBodyEl.appendChild(row);
  }
}

// VALIDATE DATA
function validateData(data) {
  // Không có trường nào bị nhập thiếu dữ liệu
  if (!data.name) {
    alert("Please input for name");
    return false;
  }

  if (!data.age) {
    alert("Please input for age");
    return false;
  }

  if (!data.weight) {
    alert("Please input for weight");
    return false;
  }

  if (!data.len) {
    alert("Please input for length");
    return false;
  }

  // Age chỉ được nhập giá trị trong khoảng 1 đến 15
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  }

  // Weight chỉ được nhập giá trị trong khoảng 1 đến 15
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  }

  // Length chỉ được nhập giá trị trong khoảng 1 đến 100
  if (data.len < 1 || data.len > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  }

  // Bắt buộc phải chọn giá trị cho trường Type
  if (data.type === "Select Type") {
    alert("Please select Type!");
    return false;
  }

  // Bắt buộc phải chọn giá trị cho trường Breed
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    return false;
  }
  return true;
}

// EDIT PET INFORMATION
function editPet(petId) {
  formContainer.classList.remove('hide');

  // Find pet ID and display information
  const index = petArr.findIndex((object) => object.id === petId);
  const petObj = petArr[index];
  idInput.value = petObj.id;
  nameInput.value = petObj.name;
  ageInput.value = petObj.age;
  typeInput.value = petObj.type;
  weightInput.value = petObj.weight;
  lengthInput.value = petObj.len;
  colorInput.value = petObj.color;
  vaccinatedInput.checked = petObj.vaccinated;
  dewormedInput.checked = petObj.dewormed;
  sterilizedInput.checked = petObj.sterilized;
  // Generate breed types in form so that breedInput can display saved breed
  displayBreed();
  breedInput.value = petObj.breed;
}

// EVENT LISTENERS --------------------------------------------------------
// SAVE DATA WHEN CLICKING SUBMIT
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: Number(ageInput.value),
    type: typeInput.value,
    weight: Number(weightInput.value),
    len: Number(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmiFunction() {
      const bmiNumber =
        this.type === "Dog"
          ? (this.weight * 703) / this.len ** 2
          : (this.weight * 886) / this.len ** 2;
      this.bmi = bmiNumber.toFixed(2);
      return this.bmi;
    },
    dateCal() {
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      this.date = `${day}/${month}/${year}`;
    },
    showBMI: false
  };

  data.bmiFunction();

  // Validate data
  const validate = validateData(data);
  if (validate) {
    // Clear form inputs
    // prettier-ignore
    idInput.value = nameInput.value = ageInput.value = weightInput.value = lengthInput.value = "";
    typeInput.value = "Select Type";
    breedInput.value = "Select Breed";
    colorInput.value = "#111111";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;

    // Replace data
    const objectToReplace = petArr.find((obj) => obj.id === data.id);
    Object.assign(objectToReplace, data);
    saveToStorage("petStorage", petArr);
    showPetTable();

    // Hide search form
    formContainer.classList.add('hide');
  }
});

// SHOW CURRENT PET TABLE WHEN LOADING BROWSER
window.addEventListener("load", function () {
  showPetTable();
});

// SIDEBAR ANIMATION
sideBarTitle.addEventListener("click", function (e) {
  sideBar.classList.toggle("active");
});