
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
document.getElementById("Submit").onclick = function () {

    const username = document.getElementById("Username").value;
    const email = document.getElementById("Email").value;
    const country = document.getElementById("Country").value;
    const gender = document.querySelector('.gender:checked');
    const hobbies = document.querySelectorAll('.Hobbies:checked');
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

    // At least one uppercase letter
    if (!/[A-Z]/.test(password.value)) {
        alert("Password must contain at least one uppercase letter");
        return;
    }

    // At least one number
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

    // Hobby selection
    if (hobbies.length === 0) {
        alert("Select at least one hobby");
        return;
    }

    alert("Registration Successful!");
};