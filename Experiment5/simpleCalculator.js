let a = document.getElementById("First")
let b = document.getElementById("Second")
let Result = document.getElementById("Result")

document.getElementById("add").onclick = function () {
    const c = Number(a.value) + Number(b.value);
    Result.textContent = (`Result : ${c}`);

}
document.getElementById("subtract").onclick = function () {
    const c = Number(a.value) - Number(b.value);
    Result.textContent = (`Result : ${c}`);

}
document.getElementById("multiply").onclick = function () {
    const c = Number(a.value) * Number(b.value);
    Result.textContent = (`Result : ${c}`);

}
document.getElementById("divide").onclick = function () {
    const c = Number(a.value) / Number(b.value);
    Result.textContent = (`Result : ${c}`);

}