let button = document.getElementById("generate");
let lengthSelect = document.getElementById("length");
let lengthDisplay = document.getElementById("lengthDisplay");
let lower = document.getElementById("lower");
let upper = document.getElementById("upper");
let numbers = document.getElementById("numbers");
let special = document.getElementById("special");

let lowerRange = {
    checked: false,
    range: [97, 122],
};

let upperRange = {
    checked: false,
    range: [65, 90],
};

let numbersRange = {
    checked: false,
    range: [48, 57],
};

let specialRange = {
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
    let rangeObjects = [lowerRange, upperRange, numbersRange];
    let counter = count;
    for (let i = 0; i < rangeObjects.length; i++) {
        let rangeObject = rangeObjects[i];

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

    let randomChar = [];
    let charCodes = [];
    let index = 0;
    let charCode = 0;
    let rangeUsedCounter = 0;
    let checkedBoxesCounter = 0;

    if (lower.checked) {
        for (let i = 97; i <= 122; i++) {
            charCodes.push(i);
        }
    }
    if (upper.checked) {
        for (let i = 65; i <= 90; i++) {
            charCodes.push(i);
        }
    }
    if (numbers.checked) {
        for (let i = 48; i <= 57; i++) {
            charCodes.push(i);
        }
    }
    if (special.checked) {
        for (let i = 33; i <= 47; i++) {
            charCodes.push(i);
        }
        for (let i = 58; i <= 64; i++) {
            charCodes.push(i);
        }
        for (let i = 91; i <= 96; i++) {
            charCodes.push(i);
        }
        for (let i = 123; i <= 126; i++) {
            charCodes.push(i);
        }
    }

    do {
        let count = 0;
        rangeUsedCounter = 0;
        randomChar = [];
        lowerRange.checked = false;
        upperRange.checked = false;
        numbersRange.checked = false;
        specialRange.checked = false;
        for (let i = 0; i < lengthSelect.value; i++) {
            index = Math.floor(Math.random() * charCodes.length);
            charCode = charCodes[index];
            rangeUsedCounter += checkRange(charCode, count);
            randomChar.push(String.fromCharCode(charCode));
        }

        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let checkedBoxesCounter = 0;
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkedBoxesCounter++;
            }
        }
    } while (rangeUsedCounter != checkedBoxesCounter);
    console.log(charCodes);
    let result = randomChar.join("");
    document.getElementById("result").value = result;
}
