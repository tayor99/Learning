// Listen for sunbit
document.querySelector("#loan-form").addEventListener("submit", function (e) {
  // Hide loader
  document.getElementById("results").style.display = "none";

  // show loader
  document.getElementById("loading").style.display = "block";
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

// Calculate Results
function calculateResults() {
  // UI variables
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;

  //   compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = (monthly * calculatedPayment - principal).toFixed(2);
    document.getElementById("results").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your number");
  }
}

// Show error
function showError(error) {
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "none";
  const errorDiv = document.createElement("div");
  //   Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  //   add class
  errorDiv.className = `alert alert-danger`;
  //   append to div
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);

  //   clear error after 3 sec
  setTimeout(clearError, 2000);
}

// clear error
function clearError() {
  document.querySelector(".alert").remove();
}
