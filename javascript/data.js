"use strict";

let petArr;
let readerContent;

const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const sideBar = document.getElementById("sidebar");
const sideBarTitle = document.getElementById("sidebar-title");


// EVENT LISTENERS --------------------------------------------------------
// SIDEBAR ANIMATION
sideBarTitle.addEventListener("click", function (e) {
  sideBar.classList.toggle("active");
});

// EXPORT FUNCTIONALITY
exportBtn.addEventListener("click", function () {
  petArr = getFromStorage("petStorage", []);
  const exportFile = JSON.stringify(petArr);

  const blob = new Blob([exportFile], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "export.json");
});

// IMPORT FUNCTIONALITY
importBtn.addEventListener("click", function () {
  const file = document.getElementById("input-file").files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (e) {
      readerContent = e.target.result;
      // Parse imported file to object array
      const readerContentParsed = JSON.parse(readerContent);

      // Imported file: pets with same ID => overwrite, pets with new ID => add
      // Find pets with different ID in current petArr => keep untouched
      petArr = getFromStorage("petStorage", []);
      const objectToBeKept = petArr.filter(
        (obj1) => !readerContentParsed.some((obj2) => obj2.id === obj1.id)
      );

      // Concat untouched pet array with imported array to form the final one
      const finalPetArr = objectToBeKept.concat(readerContentParsed);
      saveToStorage("petStorage", finalPetArr);
      alert("import succeeded!");
    };
    reader.onerror = function (e) {
      alert("error reading file");
    };
  }
});
