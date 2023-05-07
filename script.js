var lengthSelect = document.getElementById("length");
var lengthDisplay = document.getElementById("lengthDisplay");
var lower = document.getElementById("lower");
var upper = document.getElementById("upper");
var numbers = document.getElementById("numbers");
var special = document.getElementById("special");
var output = document.getElementById("result");

var lowerRange = {
    checked: false,
    range: [97, 122],
};

var upperRange = {
    checked: false,
    range: [65, 90],
};

var numbersRange = {
    checked: false,
    range: [48, 57],
};

var specialRange = {
    checked: false,
    range: [
        [33, 47],
        [58, 64],
        [91, 96],
        [123, 126],
    ],
};

lengthSelect.addEventListener("input", function () {
    lengthDisplay.innerHTML = lengthSelect.value;
});

//RETURNS THE COUNT OF RANGES INCLUDED
function checkRange(number, count) {
    var rangeObjects = [lowerRange, upperRange, numbersRange];
    var counter = count;
    for (var i = 0; i < rangeObjects.length; i++) {
        var rangeObject = rangeObjects[i];

        if (
            rangeObject.checked === false &&
            number >= rangeObject.range[0] &&
            number <= rangeObject.range[1]
        ) {
            rangeObject.checked = true;
            counter++;
        }
    }

    if (special.checked && !specialRange.checked) {
        if (
            (number >= specialRange.range[0][0] &&
                number <= specialRange.range[0][1]) ||
            (number >= specialRange.range[1][0] &&
                number <= specialRange.range[1][1]) ||
            (number >= specialRange.range[2][0] &&
                number <= specialRange.range[2][1]) ||
            (number >= specialRange.range[3][0] &&
                number <= specialRange.range[3][1])
        ) {
            specialRange.checked = true;
            counter++;
        }
    }
    return counter;
}

function generate() {
    if (
        !lower.checked &&
        !upper.checked &&
        !numbers.checked &&
        !special.checked
    ) {
        alert("Please select atleast one option!");
        return;
    }

    var randomChar = [];
    var charCodes = [];
    var index = 0;
    var charCode = 0;
    var rangeUsedCounter = 0;
    var checkedBoxesCounter = 0;
    lowerRange.checked = false;
    upperRange.checked = false;
    numbersRange.checked = false;
    specialRange.checked = false;

    if (lower.checked) {
        for (var i = 97; i <= 122; i++) {
            charCodes.push(i);
        }
    }
    if (upper.checked) {
        for (var i = 65; i <= 90; i++) {
            charCodes.push(i);
        }
    }
    if (numbers.checked) {
        for (var i = 48; i <= 57; i++) {
            charCodes.push(i);
        }
    }
    if (special.checked) {
        for (var i = 33; i <= 47; i++) {
            charCodes.push(i);
        }
        for (var i = 58; i <= 64; i++) {
            charCodes.push(i);
        }
        for (var i = 91; i <= 96; i++) {
            charCodes.push(i);
        }
        for (var i = 123; i <= 126; i++) {
            charCodes.push(i);
        }
    }
    do {
        var count = 0;
        rangeUsedCounter = 0;
        randomChar = [];
        lowerRange.checked = false;
        upperRange.checked = false;
        numbersRange.checked = false;
        specialRange.checked = false;
        for (var i = 0; i < lengthSelect.value; i++) {
            index = Math.floor(Math.random() * charCodes.length);
            charCode = charCodes[index];
            rangeUsedCounter += checkRange(charCode, count);
            randomChar.push(String.fromCharCode(charCode));
        }
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        var checkedBoxesCounter = 0;
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkedBoxesCounter++;
            }
        }
    } while (rangeUsedCounter != checkedBoxesCounter);
    var result = randomChar.join("");
    output.value = result;
}

function clip() {
    output.select();
    navigator.clipboard.writeText(output.value);
    alert("Text copied!");
}
