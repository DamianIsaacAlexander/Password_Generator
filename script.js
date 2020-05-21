// get all elements
const resultElement = document.querySelector(".result");
const lengthElement = document.querySelector("#length");
const lowerCaseElement = document.querySelector("#lowercase");
const upperCaseElement = document.querySelector("#uppercase");
const numericElement = document.querySelector("#numeric");
const symbolsElement = document.querySelector("#symbols");
const generateElement = document.querySelector("#generate");
const copyElement = document.querySelector("#copy");
const outPutElement = document.querySelector(".output-container");
//add a click event listener to the button element
generateElement.addEventListener('click', () => {
  //get all current values 
  const length = +lengthElement.value;
  const ifLower = lowerCaseElement.checked;
  const ifUpper = upperCaseElement.checked;
  const ifNumber = numericElement.checked;
  const ifSymbol = symbolsElement.checked;
  //set the result innerText to the return value of generatePass();
  resultElement.innerText = generatePass(length, ifLower, ifUpper, ifNumber, ifSymbol);
});
function generatePass(length, lower, upper, number, symbols) {
  //password we will return
  let passW = "";
  //get count of checked boxes
  const checkCount = lower + upper + number + symbols;
  //create an array of objects with their current value --- object: true
  const checkArr = [{ lower }, { upper }, { number }, { symbols }].filter
    (
      //return the value from the current key: true/false if false .filter removes it from the array
      item => (Object.values(item)[0])
    );
  //if count of checks is zero the string will be empty 
  if (checkCount === 0) {
    return "";
  }
  // if the length selected is not within bounds reset to 8
  else if (length < 8 || length > 128) {
    length = 8;
  }
  for (let i = 0; i < length; i++) {
    //call each function randomly while i is less than length
    const funcType = Object.keys(checkArr[Math.floor(Math.random() * checkArr.length)])[0];
    // concatenate the returned value
    passW += randomGenFunc[funcType]();
  }
  
  //return the password to the caller
  return passW;
}
//create and object containing functions
const randomGenFunc =
{
  lower: getRandomLowerCase,
  upper: getRandomUpperCase,
  number: getRandomNumber,
  symbols: getRandomSymbol
}
function getRandomLowerCase() {
  //26 letters in alphB char code for a begins at 97 so 97 + 26(letters) is z
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpperCase() {
  //26 letters in alphB char code for A begins at 65 so 65 + 26(letters) is Z
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  // char code for zero starts at 48 so 48+10 (zero through 9)
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  //set special symbols to be used
  const symbols = ["!", "@", "#", "$", "&"];

  return symbols[Math.floor(Math.random() * symbols.length)];
}

