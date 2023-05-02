var button = document.getElementById("generate");
var lengthSelect = document.getElementById("length");
var lengthDisplay = document.getElementById("lengthDisplay");
var weakRadio = document.getElementById("weak");
var mediumRadio = document.getElementById("medium");
var strongRadio = document.getElementById("strong");
var weakRange = [];
var mediumRange = [];
var strongRange = [];

function init() {
    for (var i = 32; i <= 126; i++) {
        if ((i >= 65 && i <= 90) || (i >= 97 && i <= 122)) {
            weakRange.push(i);
            mediumRange.push(i);
        }
        if (i >= 48 && i <= 57) {
            mediumRange.push(i);
        }
        strongRange.push(i);
    }
    console.log(mediumRange);
}

window.addEventListener("load", init);

lengthSelect.addEventListener("input", function () {
    lengthDisplay.innerHTML = lengthSelect.value;
});

weakRadio.addEventListener("input", function () {
    lengthSelect.value = 8;
    lengthDisplay.innerHTML = lengthSelect.value;
});

mediumRadio.addEventListener("input", function () {
    lengthSelect.value = 12;
    lengthDisplay.innerHTML = lengthSelect.value;
});

strongRadio.addEventListener("input", function () {
    lengthSelect.value = 20;
    lengthDisplay.innerHTML = lengthSelect.value;
});

function generate() {
    var randomChar = [];
    var strengthRange = [];

    if (weakRadio.checked) {
        strengthRange = weakRange;
    } else if (mediumRadio.checked) {
        strengthRange = mediumRange;
    } else {
        strengthRange = strongRange;
    }

    for (var i = 0; i < lengthSelect.value; i++) {
        var index = Math.floor(Math.random() * strengthRange.length);
        var charCode = strengthRange[index];
        randomChar.push(String.fromCharCode(charCode));
    }
    var result = randomChar.join("");
    document.getElementById("result").value = result;
}
