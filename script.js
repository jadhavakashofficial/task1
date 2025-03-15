// Grabbing form elements
const form = document.getElementById('signupForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const dobInput = document.getElementById('dob');
const formFeedback = document.getElementById('formFeedback');

// ----------------------
// 1. Email Validation
// ----------------------
emailInput.addEventListener('input', () => {
  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value && !emailRegex.test(emailInput.value)) {
    emailInput.classList.add('error');
  } else {
    emailInput.classList.remove('error');
  }
});

// ----------------------
// 2. Password Validation
// ----------------------
function validatePasswords() {
  // Example: password must be at least 8 characters
  if (passwordInput.value.length < 8) {
    passwordInput.classList.add('error');
  } else {
    passwordInput.classList.remove('error');
  }

  // Check if passwords match
  if (
    confirmPasswordInput.value && 
    confirmPasswordInput.value !== passwordInput.value
  ) {
    confirmPasswordInput.classList.add('error');
  } else {
    confirmPasswordInput.classList.remove('error');
  }
}

passwordInput.addEventListener('input', validatePasswords);
confirmPasswordInput.addEventListener('input', validatePasswords);

// ----------------------
// 3. Feedback Display & Form Submission
// ----------------------
form.addEventListener('submit', (event) => {
  // Clear previous feedback
  formFeedback.textContent = '';

  // Force a final check on password validity
  validatePasswords();

  // Check if any fields have the 'error' class or are empty
  const hasError = document.querySelector('.error');
  const requiredInputs = form.querySelectorAll('[required]');
  let emptyField = false;

  requiredInputs.forEach((input) => {
    if (!input.value.trim()) {
      emptyField = true;
      input.classList.add('error');
    }
  });

  if (hasError || emptyField) {
    // Prevent form submission
    event.preventDefault();
    formFeedback.style.color = '#ff4d4d';
    formFeedback.textContent = 
      'Please correct the errors and fill all required fields.';
  } else {
    // Optional: Provide success feedback
    // If you want to prevent an actual submission for testing, uncomment below:
    // event.preventDefault();
    formFeedback.style.color = '#4CAF50';
    formFeedback.textContent = 'Form submitted successfully!';
  }
});
