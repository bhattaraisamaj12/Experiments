let display = document.getElementById("Result");

window.onload = function () {
    fetch("api.php?reset=1")
        .then(() => {
            document.getElementById("history").innerHTML = "";
        });
};

// INPUT
document.querySelectorAll(".number").forEach(btn => {
    btn.onclick = () => display.value += btn.textContent;
});

document.querySelectorAll(".operator").forEach(btn => {
    btn.onclick = () => display.value += btn.textContent;
});

// CLEAR DISPLAY
document.querySelector(".clear").onclick = () => display.value = "";

// CALCULATE
document.querySelector(".equals").onclick = function () {

    fetch("api.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `expression=${encodeURIComponent(display.value)}`
    })
        .then(res => res.json())
        .then(data => {
            display.value = data.result;
            updateHistory(data.history);
        });
};

// UPDATE HISTORY
function updateHistory(history) {
    let historyDiv = document.getElementById("history");
    historyDiv.innerHTML = "";

    history.slice().reverse().forEach(item => {
        let [expr, result] = item.split("=");

        let p = document.createElement("p");
        p.innerHTML = `
            <span class="expr">${expr.trim()}</span>
            <span class="result">= ${result.trim()}</span>
        `;
        historyDiv.appendChild(p);
    });
}

// CLEAR HISTORY
document.getElementById("clearHistoryBtn").onclick = function () {
    fetch("api.php?clear=1")
        .then(() => {
            document.getElementById("history").innerHTML = "";
        });
};