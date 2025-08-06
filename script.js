const form = document.getElementById("registrationForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const gender = document.getElementById("gender");
const eventType = document.getElementById("event");

const successMessage = document.getElementById("successMessage");

function showError(input, message) {
  const error = input.nextElementSibling;
  error.innerText = message;
  error.style.display = "block";
  input.style.borderColor = "red";
}

function clearError(input) {
  const error = input.nextElementSibling;
  error.innerText = "";
  error.style.display = "none";
  input.style.borderColor = "#ccc";
}

function validateField(input) {
  const value = input.value.trim();

  if (value === "") {
    showError(input, `${input.previousElementSibling.innerText} is required.`);
    return false;
  }

  // Custom validation rules
  if (input === fullName) {
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    if (!nameRegex.test(value)) {
      showError(input, "Full Name must have at least 3 letters and no numbers.");
      return false;
    }
  }

  if (input === phone && !/^\d{10}$/.test(value)) {
    showError(input, "Phone must be 10 digits.");
    return false;
  }

  if (input === email && !/^\S+@\S+\.\S+$/.test(value)) {
    showError(input, "Invalid email format.");
    return false;
  }

  clearError(input);
  return true;
}

// Attach input event listeners
[fullName, email, phone].forEach(input => {
  input.addEventListener("input", () => validateField(input));
});

[gender, eventType].forEach(select => {
  select.addEventListener("change", () => validateField(select));
});

// On form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isFormValid = true;
  [fullName, email, phone, gender, eventType].forEach(input => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });

  if (isFormValid) {
    successMessage.innerText = "Registration Successful!";
    form.reset();
    setTimeout(() => {
      successMessage.innerText = "";
    }, 4000);
  }
});
