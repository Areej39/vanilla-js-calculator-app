// script.js - calculator-app
const previousOperand = document.querySelector(".previous-operand");
const currentOperand = document.querySelector(".current-operand");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const deleteBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");
const equalsBtn = document.querySelector(".equals");

let currentValue = '';
let previousValue = '';
let resetScreen = false;
let operation = null;

function updateDisplay() {
    if (currentValue === '') {
        currentOperand.textContent = '0';
    } else {
        currentOperand.textContent = currentValue;
    }

    if(previousValue !== '' && operation !== null) {
        previousOperand.textContent = `${previousValue} ${operation}`;
    } else {
        previousOperand.textContent = '';
    }
}

function input(number) {
    if(resetScreen) {
        currentValue = '';
        resetScreen = false;
    }

    if(number === '.' && currentValue.includes('.')) return;

    if(number === '0' && currentValue === '') {
        currentValue = '0';
    } else if (currentValue === '0' && number !== '.'){
        currentValue = number;
    } else {
        currentValue += number;
    }

    updateDisplay();
}

function handleOperator(op) {
    if(currentValue === '') return;

    if(previousValue !== '' && !resetScreen) {
        calculate();
    }

    previousValue = currentValue;
    operation = op;
    resetScreen = true;
    updateDisplay();
}

function calculate() {
    if(previousValue === '' || currentValue === '' || operation === null) return;

    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);
    let result;

    switch(operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            if( curr === 0) {
                alert('Cannot divide by zero');
                clearAll();
                return;
            }
            result = prev / curr;
            break;
        default:
            return;
    }

    currentValue = result.toString();
    operation = null;
    previousValue = '';
    resetScreen = true;
    updateDisplay();
}

function clearAll() {
    currentValue = '';
    previousValue = '';
    operation = null;
    resetScreen = false;
    updateDisplay();
}

function deleteLast() {
    if(currentValue === '') {
        clearAll();
        return;
    }
    if(resetScreen) {
        currentValue = currentValue.slice(0,-1);
        resetScreen = false;
        updateDisplay();
        return;
    }
    currentValue = currentValue.slice(0, -1);
    if(currentValue === '') {
        currentValue = '0';
    }
    updateDisplay();
}

function handleKey(e) {
    const key = e.key;

    if((/^[0-9.]$/).test(key)) {
        e.preventDefault();
        input(key);
    }

    if(['+', '-', '*', '/'].includes(key)) {
        e.preventDefault();
        handleOperator(key);
    }

    if(key === 'Enter' || key === '=') {
        e.preventDefault();
        calculate();    
    }

    if(key === 'Escape') {
        e.preventDefault();
        clearAll();
    }

    if(key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    }
}

numberBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        const number = e.target.textContent;
        input(number);
    });
});

operatorBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        const operator = e.target.textContent;
        handleOperator(operator);
    });
});

equalsBtn.addEventListener('click', calculate);

clearBtn.addEventListener('click', clearAll);

deleteBtn.addEventListener('click', deleteLast);

document.addEventListener('keydown', handleKey);

updateDisplay();
