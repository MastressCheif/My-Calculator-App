var newLine = true;

function appendToInput(char) {
    var inputBox = document.getElementById("inputBox");
    if (inputBox.value === "0" || newLine) {
        inputBox.value = char;
        newLine = false;
    } else {
        inputBox.value += char;
    }
}

function digitBtnPressed(button){
    appendToInput(button);
}

function operatorBtnPressed(operator){
    appendToInput(operator);
}

function btnACPressed(){
    document.getElementById("inputBox").value = 0;
    newLine = true;
}

function bracketBtnPressed() {
    var inputBox = document.getElementById("inputBox");
    var input = inputBox.value;
    let open = (input.match(/\(/g) || []).length;
    let close = (input.match(/\)/g) || []).length;
    let lastChar = input.trim().slice(-1);

    if (
        input === "0" ||
        newLine ||
        lastChar === "" ||
        lastChar === "(" ||
        "+-*/(".includes(lastChar)
    ) {
        if (input === "0" || newLine) inputBox.value = "(";
        else inputBox.value += "(";
        newLine = false;
    }
    else if (open > close && !"()+-*/".includes(lastChar)) {
        inputBox.value += ")";
        newLine = false;
    }
    else {
        inputBox.value += "(";
        newLine = false;
    }
}

function equalsBtnPressed(){
    var input = document.getElementById("inputBox").value;
    try {
        input = input.replace(/x/g, '*');
        input = handlePercentages(input);
        input = input.replace(/[\+\-\*\/\.]$/, "");
        var result = eval(input);
        document.getElementById("inputBox").value = result;
        newLine = true;
    } catch (e) {
        document.getElementById("inputBox").value = "Error";
        newLine = true;
    }
}

function eraseLast() {
    let inputBox = document.getElementById("inputBox");
    let currentValue = inputBox.value;
    if (currentValue.length === 1 || currentValue === "0" || newLine) {
        inputBox.value = "0";
        newLine = true;
    } else {
        inputBox.value = currentValue.slice(0, -1);
    }
}

function percentPressed() {
    var inputBox = document.getElementById("inputBox");
    var input = inputBox.value;
    let match = input.match(/(.+?)([\d\.]+)$/);
    if (match) {
        const before = match[1];
        const number = match[2];
        let opMatch = before.match(/([\+\-\*\/])\s*$/);
        if (opMatch && (opMatch[1] === "+" || opMatch[1] === "-")) {
            let baseMatch = before.match(/(.*?)([\d\.]+)\s*[\+\-\*\/]\s*$/);
            if (baseMatch) {
                let base = baseMatch[2];
                let op = opMatch[1];
                let percentValue = "(" + base + "*" + number + "/100)";
                let newInput = baseMatch[1] + base + op + percentValue;
                inputBox.value = newInput;
                newLine = false;
                return;
            }
        }
        inputBox.value = before + (parseFloat(number) / 100);
        newLine = false;
        return;
    }
    try {
        var result = eval(input) / 100;
        inputBox.value = result;
        newLine = true;
    } catch (e) {
        inputBox.value = "Error";
        newLine = true;
    }
}

function handlePercentages(expr) {
    expr = expr.replace(/(\d+(\.\d+)?)([\+\-])(\d+(\.\d+)?)%/g, function(match, base, _, op, percent){
        return base + op + "(" + base + "*" + percent + "/100)";
    });
    expr = expr.replace(/(\d+(\.\d+)?)%/g, function(match, p1){
        return "(" + p1 + "/100)";
    });
    return expr;
}

function toggleSign() {
    let inputBox = document.getElementById("inputBox");
    let input = inputBox.value;
    if (/^-?\d+(\.\d+)?$/.test(input)) {
        if (input.startsWith("-")) {
            inputBox.value = input.slice(1);
        } else if (input !== "0") {
            inputBox.value = "-" + input;
        }
    } else {
        let match = input.match(/(.*?)(-?\d+(\.\d+)?)([^\d.]*)$/);
        if (match) {
            let before = match[1];
            let number = match[2];
            let after = match[4];
            if (number.startsWith("-")) {
                number = number.slice(1);
            } else {
                number = "-" + number;
            }
            inputBox.value = before + number + after;
        }
    }
}
