"use strict";

// SAVE TO LOCAL STORAGE
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// RETRIEVE DATA FROM LOCAL STORAGE
function getFromStorage(key, defaultValue) {
  return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
}
