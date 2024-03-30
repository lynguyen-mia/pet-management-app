"use strict";

let petArr = [];
let healthyPetArr = [];
let healthyCheck = false;

//#region SELECTION
const submitBtn = document.getElementById("submit-btn");
const showHealthyBtn = document.getElementById("healthy-btn");
const calculateBmiBtn = document.getElementById("bmi-btn");
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
const form = document.querySelector("form");
const tableBodyEl = document.querySelector("tbody");
const sideBar = document.getElementById("sidebar");
const sideBarTitle = document.getElementById("sidebar-title");
//#endregion

// FUNCTIONS -------------------------------------------------------------
//#region -- VALIDATE DATA
function validateData(data) {
  // Không có trường nào bị nhập thiếu dữ liệu
  if (!data.id) {
    alert("Please input for id");
    return false;
  }
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
  // Giá trị ID không được trùng với các thú cưng còn lại
  let idEl = document.querySelectorAll(".idnumber");
  for (let i = 0; i < idEl.length; i++) {
    if (data.id === idEl[i].textContent) {
      alert("ID must be unique!");
      return false;
    }
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
//#endregion

//#region -- RENDER PET TABLE
// prettier-ignore
function renderTableData(petArr) {
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
                    <td class="bmi">${petArr[i].showBMI === false ? "?" : petArr[i].bmi}</td>
                    <td><button type="button"
												class="btn btn-danger" onclick="deletePet('${petArr[i].id}')">Delete</button></td>`;
    tableBodyEl.appendChild(row);
    // healthyCheck = false;
    showHealthyBtn.textContent = "Show Healthy Pet";
  }
}
//#endregion

//#region -- CREATE HEALTHY PET ARRAY
function healthyPetGenerator(petArr) {
  healthyPetArr = petArr.filter(
    (object) => object.vaccinated && object.dewormed && object.sterilized
  );
}

// DELETE A PET
function deletePet(petId) {
  // Confirm before deleting
  if (confirm("Are you sure?")) {
    const index = petArr.findIndex((object) => {
      return object.id === petId;
    });
    petArr.splice(index, 1);
    healthyPetGenerator(petArr);
    renderTableData(petArr);
    saveToStorage("petStorage", petArr);
  }
}
//#endregion

//#region -- CLEAR FORM INPUT
// prettier-ignore
function clearInput() {
  idInput.value = nameInput.value = ageInput.value = weightInput.value = lengthInput.value = "";
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
  colorInput.value = "#111111";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}
//#endregion

//#region -- CALCULATE BMI
function calculateBmi(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].showBMI = true;
    document.querySelectorAll(".bmi")[i].textContent = arr[i].bmi;
    saveToStorage("petStorage", petArr);
  }
}
//#endregion

//#region -- DISPLAY BREED OPTIONS IN FORM
function displayBreed() {
  let breedTypeCat = getFromStorage("breedTypeCat", []);
  let breedTypeDog = getFromStorage("breedTypeDog", []);

  breedInput.innerHTML = `<option>Select Type</option>`;

  const appendCatAndDogBreed = function (breedType) {
    breedType.forEach((type) => {
      const option = document.createElement("option");
      option.innerHTML = `<option>${type}</option>`;
      breedInput.appendChild(option);
    });
  };

  if (typeInput.value === "Cat") {
    appendCatAndDogBreed(breedTypeCat);
  } else {
    appendCatAndDogBreed(breedTypeDog);
  }
}
//#endregion

// EVENT LISTENERS --------------------------------------------------------
//#region -- CLICKING SUBMIT BUTTON: SAVE NEW PET
submitBtn.addEventListener("click", function (e) {
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

  data.dateCal();
  data.bmiFunction();

  // Adding pets into array
  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
  }

  healthyPetGenerator(petArr);

  // Save data to local storage
  saveToStorage("petStorage", petArr);
});
//#endregion

//#region -- CLICKING 'SHOW HEALTHY PET' BUTTON
showHealthyBtn.addEventListener("click", function () {
  if (!healthyCheck) {
    renderTableData(healthyPetArr);
    showHealthyBtn.textContent = "Show All Pet";
    healthyCheck = true;
  } else {
    renderTableData(petArr);
    showHealthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = false;
  }
});
//#endregion

//#region -- CLICKING 'CALCULATE BMI' BUTTON
calculateBmiBtn.addEventListener("click", function () {
  if (!healthyCheck) {
    calculateBmi(petArr);
  } else {
    calculateBmi(healthyPetArr);
  }
});
//#endregion

//#region -- SIDEBAR ANIMATION
sideBarTitle.addEventListener("click", function (e) {
  sideBar.classList.toggle("active");
});
//#endregion

//#region -- RETRIEVE DATA FROM LOCAL STORAGE WHEN LOADING PAGE
window.addEventListener("load", function (e) {
  petArr = getFromStorage("petStorage", []);
  healthyPetGenerator(petArr);
  renderTableData(petArr);
});
//#endregion
