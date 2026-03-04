const password = document.getElementById("Password");
const confirmPassword = document.getElementById("ConfirmPassword");
const togglePassword = document.getElementById("togglePassword");
const dateInput = document.getElementById("date");

const todayStr = new Date().toISOString().split("T")[0];
let user = [];

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

  const resultDiv = document.getElementById("result");
  const selectedGender = gender.value;

  let selectedCatagories = [];
  categories.forEach((category) => {
    selectedCatagories.push(category.value);
  });

  let userData = {
    Username: username,
    Email: email,
    Age: age,
    Country: country,
    Gender: selectedGender,
    categories: selectedCatagories,
  };

  user.push(userData);

  resultDiv.innerHTML = ""; 

  let table = document.createElement("table");
  table.style.border = "1px solid black";
  table.style.marginTop = "20px";

  // Table
  let headerRow = document.createElement("tr");

  let headers = [
    "Username",
    "Email",
    "Age",
    "Country",
    "Gender",
    "Intrested Categories",
  ];

  headers.forEach((text) => {
    let th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);

    th.style.border = "1px solid black";
    th.style.padding = "10px";
  });

  table.appendChild(headerRow);

  // Table Data
  user.forEach((u) => {
    let row = document.createElement("tr");

    let values = [
      u.Username,
      u.Email,
      u.Age,
      u.Country,
      u.Gender,
      u.categories.join(", "),
    ];

    values.forEach((value) => {
      let td = document.createElement("td");
      td.textContent = value;

      row.appendChild(td);

      td.style.border = "1px solid black";
      td.style.padding = "10px";
    });

    table.appendChild(row);
  });

  resultDiv.appendChild(table);

  resultDiv.style.display = "block";
  document.getElementById("actions").style.display = "flex";

  resultDiv.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

document.getElementById("copyBtn").addEventListener("click", function () {
  let text = "";

  user.forEach((u) => {
    text += `Username:${u.Username}, Email:${u.Email}, Age:${u.Age}, Country:${u.Country}, Gender:${u.Gender}, Catagories:${u.categories.join(
      " , "
    )}\n`;
  });

  navigator.clipboard.writeText(text);

  alert("Table copied to clipboard!");
});

document.getElementById("downloadBtn").addEventListener("click", function () {
  let csv = "";

  user.forEach((u) => {
    csv += `Username:${u.Username}, Email:${u.Email}, Age:${u.Age}, Country:${u.Country}, Gender:${u.Gender}, Catagories:${u.categories.join(
      " , "
    )}\n`;
  });

  const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csv);
  const link = document.createElement("a");
  link.href = encodedUri;
  link.download = "registered_users.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});