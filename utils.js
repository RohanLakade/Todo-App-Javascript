"use strict";

function sanitizeInput(input) {
  return input.replace(/[<>]/g, ""); // Removes `<` & `>` to prevent XSS
}

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}
