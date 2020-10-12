// Select All Elements of concern to get their corresponding values
const amount = document.querySelector("#amountField");
const interest = document.querySelector("#percentageField");
const duration = document.querySelector("#repayPeriodField");
const calMonthlyPayment = document.querySelector("#monthlyPaymentOutput");
const totalPayment = document.querySelector("#totalPaymentOutput");
const expectedInterest = document.querySelector("#interestOutput");
const alertMessage = document.querySelector("#alertBox");
const tabItems = document.querySelectorAll(".tab-item");
const formItems = document.querySelectorAll(".form");

// Binding elements to Event Listeners
const loanApplicationForm = document.querySelector("#loanAppForm");

loanApplicationForm.addEventListener("submit", processLoanApplication);

function processLoanApplication(e) {
  e.preventDefault();
  // Estimate monthly payment
  if ((amount.value == "") || (interest.value == "") || (duration.value == "")) {
    return showAlert("Empty fields not allowed", "danger")
  } else if (isNaN(amount.value) || isNaN(interest.value) || isNaN(duration.value)) {
    return showAlert("Only Numeric Values accepted", "danger");
  }

  // Estimate Monthly Payment
  const monthlyInterestRate = (interest.value / 100 / 12);
  const parameterOne = amount.value * monthlyInterestRate;
  const parameterTwo = (1 + monthlyInterestRate) ** duration.value;
  const monthlyPayment = (parameterOne * parameterTwo) / (parameterTwo - 1);
  const expectedPayment = monthlyPayment * duration.value;
  const totalInterestPayment = expectedPayment - amount.value;

  // Update the corresponding Input Field on the UI
  calMonthlyPayment.setAttribute("value", monthlyPayment.toFixed(2));
  totalPayment.setAttribute("value", expectedPayment.toFixed(2));

  expectedInterest.setAttribute("value", totalInterestPayment.toFixed(2))

  showAlert("Your loan calculation was successful", "success");
  loanApplicationForm.reset();
}

// The only way to do great work is to love the work you do.

function showAlert(message, type) {
  alertMessage.innerHTML = `<div class="alert alert-${type} alert-block text-center" role="alert">
  ${message}
  </div>
  `
  alertMessage.style.display = "block";

  setTimeout(function () {
    alertMessage.style.display = "none";
  }, 3000)
}

// Swapping display on Click
function selectTab(e) {
  removeBorder();
  removeShow();
  this.classList.add("tab-border");

  const formItem = document.querySelector(`.${this.id}-contain`);
  formItem.classList.add("show");
}

// Remove border from DOM
function removeBorder() {
  tabItems.forEach(item => item.classList.remove("tab-border"))
}

// Remove the class of show
function removeShow() {
  formItems.forEach(item => item.classList.remove("show"))
}

tabItems.forEach(item => item.addEventListener("click", selectTab))