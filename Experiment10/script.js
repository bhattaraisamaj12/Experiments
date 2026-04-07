const password = document.getElementById("Password");
const confirmPassword = document.getElementById("ConfirmPassword");
const togglePassword = document.getElementById("togglePassword");
const dateInput = document.getElementById("date");

const todayStr = new Date().toISOString().split("T")[0];

dateInput.max = todayStr;

togglePassword.addEventListener("change", function () {
  if (this.checked) {
    password.type = "text";
    confirmPassword.type = "text";
  } else {
    password.type = "password";
    confirmPassword.type = "password";
  }
});


document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("Username").value;
  const email = document.getElementById("Email").value;
  const country = document.getElementById("Country").value;
  const gender = document.querySelector(".gender:checked");
  const categories = document.querySelectorAll(".categories:checked");

  const birthDate = new Date(document.getElementById("date").value);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < 18) {
    alert("You must be at least 18 years old");
    return;
  }

  // Username validation
  if (username === "") {
    alert("Username cannot be empty");
    return;
  }

  // Email validation
  if (!email.includes("@") || !email.includes(".")) {
    alert("Enter a valid email address");
    return;
  }

  // Password strength validation
  if (password.value.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }

  if (!/[A-Z]/.test(password.value)) {
    alert("Password must contain at least one uppercase letter");
    return;
  }

  if (!/[0-9]/.test(password.value)) {
    alert("Password must contain at least one number");
    return;
  }

  // Confirm password
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  // Country selection
  if (country === "") {
    alert("Please select your country");
    return;
  }

  // Gender selection
  if (!gender) {
    alert("Please select your gender");
    return;
  }

  // category selection
  if (categories.length === 0) {
    alert("Select at least one category");
    return;
  }

  const selectedGender = gender.value;

  let selectedCategories = [];
  categories.forEach((category) => {
    selectedCategories.push(category.value);
  });

  fetch("register.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password.value,
      country: country,
      gender: selectedGender,
      age: age,
      categories: selectedCategories
    })
  })
    .then(res => res.text())
    .then(data => {

      document.getElementById("registerForm").reset();

      fetch("getUser.php")
        .then(res => res.json())
        .then(user => {

          document.getElementById("result").innerHTML = `
          <p class="success">${data}</p>
          <hr>
          <p><b>Username:</b> ${user.username}</p>
          <p><b>Email:</b> ${user.email}</p>
          <p><b>Country:</b> ${user.country}</p>
          <p><b>Age:</b> ${user.age}</p>
          <p><b>Gender:</b> ${user.gender}</p>
          <p><b>Categories:</b> ${user.categories.join(", ")}</p>
          `;

          document.getElementById("result").style.display = "block";
          document.getElementById("result").scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        });
    });
});
document.getElementById("copyBtn").addEventListener("click", function () {
  fetch("getUser.php")
    .then(res => res.json())
    .then(user => {
      let text = `Username: ${user.username}
      Email: ${user.email}
      Country: ${user.country}
      Age: ${user.age}
      Gender: ${user.gender}
      Categories: ${user.categories.join(", ")}`;

      navigator.clipboard.writeText(text);
      alert("User data copied!");
    });
});
