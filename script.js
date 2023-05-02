var button = document.getElementById("generate");
var lengthSelect = document.getElementById("length");
var lengthDisplay = document.getElementById("lengthDisplay");
var weakRadio = document.getElementById("weak");
var mediumRadio = document.getElementById("medium");
var strongRadio = document.getElementById("strong");

function generate() {
	var randomChar = [];
	for (var i = 0; i < lengthSelect.value; i++) {
		var charCode = Math.floor(Math.random() * 95) + 32;
		randomChar.push(String.fromCharCode(charCode));
	}
	var result = randomChar.join("");
	document.getElementById("result").value = result;
}

lengthSelect.addEventListener("input", function () {
	lengthDisplay.innerHTML = lengthSelect.value;
});

weakRadio.addEventListener("input", function () {
	lengthSelect.value = 8;
	lengthDisplay.innerHTML = lengthSelect.value;
});

mediumRadio.addEventListener("input", function () {
	lengthSelect.value = 14;
	lengthDisplay.innerHTML = lengthSelect.value;
});

strongRadio.addEventListener("input", function () {
	lengthSelect.value = 20;
	lengthDisplay.innerHTML = lengthSelect.value;
});
