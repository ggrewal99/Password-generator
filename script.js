var button = document.getElementById("generate");
var lengthSelect = document.getElementById("length");
var lengthDisplay = document.getElementById("lengthDisplay");

function generate() {
    var randomChar = [];
    for (var i = 0; i < lengthSelect.value; i++) {
        var charCode = Math.floor(Math.random() * 95) + 32;
        randomChar.push(String.fromCharCode(charCode));
    }
    var result = randomChar.join("");
    document.getElementById("result").value = randomChar;
}

lengthSelect.addEventListener("input", function () {
    lengthDisplay.innerHTML = lengthSelect.value;
});
