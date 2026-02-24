let display = document.getElementById("Result");

let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let clear = document.querySelector(".clear");
let equals = document.querySelector(".equals");

numbers.forEach(function (button) {
    button.onclick = function () {
        display.value += button.textContent;
    }
});

operators.forEach(button => {
    button.onclick = function () {
        display.value += button.textContent;
    }
});

clear.onclick = function () {
    display.value = "";
};

equals.onclick = function () {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
};