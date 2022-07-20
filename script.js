let currentString = "";
let num1 = "";
let num2 = "";
let operator = "";
let ans = "";
const ErrorStr = "Syntax Error";

const regexNumbers = /[0-9]/g;
const regexOperators = /[%*+/-]/g;
const regexEquals = /[=]/g;


/* operator functions */
const mod = (a,b) => a % b;
const add = (a, b) => a + b;
const sub = (a,b) => a - b;
const mlt = (a,b) => a * b;
const div = function(a,b) {
  if (b !== 0) { return a / b;}
  return "lol";
}

/* Function to do operations of two given numbers. */
function operate(num1, num2, operator) { 
  let op1 = Number(num1);
  let op2 = Number(num2);
  let result = 1;
  if (operator === "+") { result = add(op1,op2); }
  if (operator === "-") { result = sub(op1,op2); }
  if (operator === "*") { result = mlt(op1,op2); }
  if (operator === "/") { result = div(op1,op2); }
  if (operator === "%") { result = mod(op1,op2); }
  return result.toFixed(2);
}

function checkOperation() {
  return num1 === "" && num2 === "" && operator === "";
}

/* Function to clear display and assigned variables. */
function clearDisplay() {
  let clearString = "";
  updateDisplay(clearString);
}

/* Resets variables to intial assignments. */
function clearAssignVars() {
  currentString = "";
  num1 = "";
  num2 = "";
  operator = "";
  ans = "";
}

/* Function to remove the last character of displayed String. */
function backSpace(value) {
  value = String (value);
  let updateString = value.substring(0, value.length-1); // remove last character.
  currentString = updateString;
  updateDisplay(currentString);
}

/* Function to update the display. */
function updateDisplay(val) {
  display.textContent = val;
  console.log(display.textContent);
}

/* Function to get the second number to operate. */
function getOperand2(val) {
  val = String (val);
  if (val.match(/[%*+/-](.*)/g)) {
    let unprocessed = val.match(/[%*+/-](.*)/g);
    let unprocessedStr = unprocessed[0];
    let temp = Number (unprocessedStr.slice(1));
    return temp;
  } else {
    return 0;
  }
}

/* Function to retrieve ans and others after pressing '=' */
function getAns() {
  /* num2 = getOperand2(currentString); */
  ans = operate(num1, num2, operator);
  console.log(num1 + " " + operator + " " + num2 + " = " + ans);
  num1 = ans;
  currentString = Number(ans);
  console.log("current String: " + currentString);
  clearDisplay();
  updateDisplay(currentString);
}

/* Function to assign the operator update String. */
function assignOperator(val) {
  operator = val;
  if (currentString !== "") { 
    num1 = Number(currentString); 
  } else { 
    num1 = ans;
  }
  console.log("op1", num1);
  console.log("operator", operator);
  currentString += val;
  updateDisplay(currentString);
}

function buttonPress(e) {
  console.log('clicked');
  let value = e.target.textContent;

  if (value.match(regexEquals)) {
    if (checkOperation() !== true) {
      num2 = getOperand2(currentString);
      getAns();
    } 
  } else if (value.match(regexOperators)) {
    assignOperator(value);
  } else if (value === "AC") {
    clearDisplay();
    clearAssignVars();
  } else if (value === "DEL") {
    backSpace(currentString);
  } else {
    currentString += value;
    updateDisplay(currentString);
  }

}

const btns = document.querySelectorAll('button');
const display = document.querySelector('.display');

btns.forEach(button => button.addEventListener('click', buttonPress));


