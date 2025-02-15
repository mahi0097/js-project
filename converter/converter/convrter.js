// code.js
const Base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const amount = document.querySelector(".Amount");
const btn = document.querySelector("form button");
const fromType = document.querySelector("#from");
const toType = document.querySelector("#to");
const msg = document.querySelector(".msg");
const allContainer = document.querySelectorAll(".box select");

// Populate the dropdowns
for (let select of allContainer) {
  for (let courcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerHTML = courcode;
    newOption.value = courcode;

    // Set default selected options
    if (select.name === "from" && courcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && courcode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  // Update flags when the selection changes
  select.addEventListener("change", (evt) => {
    upDtaeFlag(evt.target);
  });
}

// Update the flag image
const upDtaeFlag = (element) => {
  let value = element.value;
  let countryCode = countryList[value];
  let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  if (img) {
    img.src = newsrc;
  }
};

// Fetch exchange rate and calculate
const UPdateRate = async () => {
  let TetInpt = document.querySelector(".Amount");
  let amountValue = TetInpt.value;

  if (amountValue === "" || amountValue < 1) {
    amountValue = "1"; // Default to 1 if input is empty or invalid
  }

  const URL = `${Base_URL}/${fromType.value.toLowerCase()}/${toType.value.toLowerCase()}.json`;

  try {
    let response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();
    let rate = data[toType.value.toLowerCase()];
    if (!rate) {
      throw new Error("Exchange rate not found.");
    }

    let finalAmount = amountValue * rate;
    msg.innerHTML = `${amountValue} ${fromType.value} = ${finalAmount.toFixed(2)} ${toType.value}`;
  } catch (error) {
    msg.innerHTML = `Error: ${error.message}`;
  }
};

// Add event listeners
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  UPdateRate();
});

window.addEventListener("load", () => {
  UPdateRate();
});
