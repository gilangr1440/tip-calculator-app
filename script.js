const bill = document.getElementById("bill");
const five = document.getElementById("five");
const ten = document.getElementById("ten");
const fifteen = document.getElementById("fifteen");
const twentyfive = document.getElementById("twentyfive");
const fifty = document.getElementById("fifty");
const custom = document.getElementById("custom");
const radioButtons = document.querySelectorAll(".input__radio-button");
const people = document.getElementById("people");
const billErrorText = document.getElementById("billErrorText");
const billErrorCont = document.getElementById("billErrorCont");
const peopleErrorText = document.getElementById("peopleErrorText");
const peopleErrorCont = document.getElementById("peopleErrorCont");
const tipAmount = document.getElementById("tipAmount");
const totalAmount = document.getElementById("totalAmount");
const reset = document.querySelector(".result__reset");
let billValueContainer = 0,
  peopleValueContainer = 0,
  tipValueContainer = 0;

bill.addEventListener("input", (e) => billValue(e));
bill.addEventListener("change", billValueErrorCheck);
five.addEventListener("click", (e) => tipValue(e));
ten.addEventListener("click", (e) => tipValue(e));
fifteen.addEventListener("click", (e) => tipValue(e));
twentyfive.addEventListener("click", (e) => tipValue(e));
fifty.addEventListener("click", (e) => tipValue(e));
custom.addEventListener("input", (e) => customTipValue(e));
people.addEventListener("input", (e) => peopleValue(e));
people.addEventListener("change", peopleValueErrorCheck);
reset.addEventListener("click", resetValue);

function billValue(e) {
  billValueContainer = e.target.value;

  peopleValueErrorCheck();
  result();
}

function billValueErrorCheck() {
  if (billValueContainer == 0 || billValueContainer == "") {
    if (tipValueContainer !== 0) {
      billErrorText.classList.add("error");
      billErrorCont.classList.add("error");
    } else {
      billErrorText.classList.remove("error");
      billErrorCont.classList.remove("error");
    }
  } else {
    billErrorText.classList.remove("error");
    billErrorCont.classList.remove("error");
  }

  peopleValueErrorCheck();
}

function tipValue(e) {
  custom.value = "";

  tipValueContainer = parseInt(e.target.value);

  billValueErrorCheck();
  result();
}

function customTipValue(e) {
  for (let radio of radioButtons) {
    radio.checked = false;
  }

  if (e.target.value == "") {
    tipValueContainer = 0;
  } else {
    tipValueContainer = parseInt(e.target.value);
  }

  billValueErrorCheck();
  result();
}

function peopleValue(e) {
  if (e.target.value == "" || e.target.value == 0) {
    peopleValueContainer = 0;
  } else {
    peopleValueContainer = e.target.value;
  }

  result();
}

function peopleValueErrorCheck() {
  if (peopleValueContainer == 0 || peopleValueContainer == "") {
    if (billValueContainer !== 0 || peopleValueContainer !== "") {
      peopleErrorText.classList.add("error");
      peopleErrorCont.classList.add("error");
    }

    if (billValueContainer == 0 || billValueContainer == "") {
      peopleErrorText.classList.remove("error");
      peopleErrorCont.classList.remove("error");
    }
  } else {
    peopleErrorText.classList.remove("error");
    peopleErrorCont.classList.remove("error");
  }
}

function result() {
  console.log("Bill: ", billValueContainer);
  console.log("Tip: ", tipValueContainer);
  console.log("People: ", peopleValueContainer);

  if (tipValueContainer !== 0 && billValueContainer == 0) {
    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";
  }

  if (billValueContainer !== 0 && peopleValueContainer == 0) {
    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";
  }

  if (billValueContainer !== 0 && peopleValueContainer !== 0) {
    let perPerson = billValueContainer / peopleValueContainer;
    let tip = (perPerson * tipValueContainer) / 100;
    let total = billValueContainer / peopleValueContainer + tip;

    console.log(tip);
    console.log(perPerson);

    if (tip == Infinity && total == Infinity) {
      tipAmount.textContent = "$0.00";
      totalAmount.textContent = "$0.00";
    } else {
      tipAmount.textContent = "$" + tip.toFixed(2);
      totalAmount.textContent = "$" + total.toFixed(2);
    }
  }
}

function resetValue() {
  console.log("reset");
  billValueContainer = 0;
  peopleValueContainer = 0;
  tipValueContainer = 0;

  bill.value = "";
  for (let button of radioButtons) {
    button.checked = false;
  }
  custom.value = "";
  people.value = "";
  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";

  peopleValueErrorCheck();
  billValueErrorCheck();
}
