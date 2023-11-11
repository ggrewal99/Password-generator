document.addEventListener("DOMContentLoaded", function () {
    const lengthSelect = document.getElementById("length");
    const lengthDisplay = document.getElementById("lengthDisplay");
    const lower = document.getElementById("lower");
    const upper = document.getElementById("upper");
    const numbers = document.getElementById("numbers");
    const special = document.getElementById("special");
    const output = document.getElementById("result");
    const copyButton = document.getElementById("copy");
    const generateButton = document.getElementById("generate");
    const alertBox = document.querySelector(".alert-box");
    const alertBoxClose = document.querySelector(".alert-box-close");

    const lowerRange = {
        checked: false,
        range: [97, 122],
    };

    const upperRange = {
        checked: false,
        range: [65, 90],
    };

    const numbersRange = {
        checked: false,
        range: [48, 57],
    };

    const specialRange = {
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

    function checkRange(number, count) {
        const rangeObjects = [lowerRange, upperRange, numbersRange];
        let counter = count;
        for (let i = 0; i < rangeObjects.length; i++) {
            const rangeObject = rangeObjects[i];

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
            alert("Please select at least one option!");
            return;
        }

        const randomChar = [];
        const charCodes = [];
        let rangeUsedCounter = 0;
        let checkedBoxesCounter = 0;
        lowerRange.checked = false;
        upperRange.checked = false;
        numbersRange.checked = false;
        specialRange.checked = false;

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
            randomChar.length = 0;
            lowerRange.checked = false;
            upperRange.checked = false;
            numbersRange.checked = false;
            specialRange.checked = false;
            for (let i = 0; i < lengthSelect.value; i++) {
                const index = Math.floor(Math.random() * charCodes.length);
                const charCode = charCodes[index];
                rangeUsedCounter += checkRange(charCode, count);
                randomChar.push(String.fromCharCode(charCode));
            }
            const checkboxes = document.querySelectorAll(
                'input[type="checkbox"]'
            );
            checkedBoxesCounter = 0;
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    checkedBoxesCounter++;
                }
            }
        } while (rangeUsedCounter !== checkedBoxesCounter);
        const result = randomChar.join("");
        output.value = result;
    }

    function clip() {
        navigator.clipboard.writeText(output.value);
        alertBox.style.display = "block";
        setTimeout(function () {
            alertBox.style.display = "none";
        }, 5000);
    }

    copyButton.addEventListener("click", clip);
    generateButton.addEventListener("click", generate);
    alertBoxClose.addEventListener("click", () => {
        alertBox.style.display = "none";
    });
});
