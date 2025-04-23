const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const upperCase = lowerCase.toUpperCase();
const num = "1234567890";
const symbols = "!@#$%^&*()";

const randomOne = document.querySelector(".randomOne");
const btn = document.querySelector(".btn-style");
const btnCopy = document.querySelector(".btn-copy");
const formInput = document.querySelector("#copy");
const errorMsg = document.querySelector(".error-message");

const passChar = [...lowerCase, ...upperCase, ...num, ...symbols];
let passwordLength = 0;

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.style.display = "block";
  setTimeout(() => {
    errorMsg.style.display = "none";
  }, 3000);
}

function copyPassword() {
  const password = randomOne.textContent;
  if (!password) {
    showError("Please generate a password first!");
    return;
  }
  navigator.clipboard
    .writeText(password)
    .then(() => {
      showError("Password copied to clipboard!");
      errorMsg.style.color = "#4CAF50";
    })
    .catch(() => showError("Failed to copy password"));
}

function inputLen(e) {
  const value = e.target.value;

  // Clear the input if non-numeric characters are entered
  if (!/^\d*$/.test(value)) {
    e.target.value = value.replace(/\D/g, "");
    showError("Only numbers are allowed");
    return false;
  }

  // Convert to number and validate range
  passwordLength = parseInt(value) || 0;

  if (passwordLength < 1 || passwordLength > 22) {
    showError("Password length must be between 1 and 22");
    return false;
  }

  errorMsg.style.display = "none";
  return true;
}

formInput.addEventListener("input", inputLen);
btn.addEventListener("click", randomPassword);
btnCopy.addEventListener("click", copyPassword);

function randomPassword() {
  if (!passwordLength || passwordLength < 1 || passwordLength > 22) {
    showError("Please enter a valid password length (1-22)");
    return;
  }

  let password1 = "";
  for (let i = 0; i < passwordLength; i++) {
    let randomIndex1 = Math.floor(Math.random() * passChar.length);
    password1 += passChar[randomIndex1];
  }
  randomOne.textContent = password1;
}
