const hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

const colorDisplay = document.querySelector('#colorBox');
const hexDisplay = document.querySelector('h1');
const stopBtn = document.querySelector('#startStop');
const optionsMenu = document.querySelector('.options-container');

const setIntervalMenu = document.querySelector('.interval-input');
const intervalMenuBtn = setIntervalMenu.querySelector('button');
const intervalMenuInput = setIntervalMenu.querySelector('input');

const options = optionsMenu.children;


let hexCount = 6;
let isGenerating = false;
let menuOpened = false;

let byInstant = false;
let bySingle = false;
let byInterval = false;

let intTimer;
let interval;

function genColor() {
    let newColor = '';
    for (let i = 0; i < hexCount; i++) {
        let randNum = Math.round(Math.random() * 15);
        newColor += hex[randNum];
    };
    color = `#${newColor}`;
    hexDisplay.textContent = color;
    colorDisplay.style.backgroundColor = color;
};

function genOptions(e) {
    stopBtn.textContent = "Start / Stop";
    switch (e.target.id) {
        case 'options':
            if (!menuOpened) {
                showOptions();
            } else {
                hideOptions();
            }
            break;
        case 'instantColor':
            e.target.classList.toggle('active');
            if (e.target.classList.contains('active')) {
                if (bySingle) {
                    stopBtn.textContent = "Generate";
                }
                byInstant = true;
            } else {
                byInstant = false;
            }
            break;
        case 'singleColor':
            if (optionsMenu.querySelector('#setInterval').classList.contains('active')) {
                optionsMenu.querySelector('#setInterval').classList.remove('active');
                setIntervalMenu.classList.add('hidden');
                setIntervalMenu.classList.remove('show');
                byInterval = false;
                e.target.classList.toggle('active');
                if (e.target.classList.contains('active')) {
                    stopBtn.textContent = "Generate";
                    bySingle = true;
                } else {
                    bySingle = false;
                }
            } else {
                e.target.classList.toggle('active');
                if (e.target.classList.contains('active')) {
                    stopBtn.textContent = "Generate";
                    bySingle = true;
                } else {
                    stopBtn.textContent = "Start / Stop";
                    bySingle = false;
                }
            }
            break;
        case 'setInterval':
            if (optionsMenu.querySelector('#singleColor').classList.contains('active')) {
                optionsMenu.querySelector('#singleColor').classList.remove('active');
                bySingle = false;
                e.target.classList.toggle('active');
                if (e.target.classList.contains('active')) {
                    setIntervalMenu.classList.remove('hidden');
                    setIntervalMenu.classList.add('show');
                    byInterval = true;
                } else {
                    setIntervalMenu.classList.add('hidden');
                    setIntervalMenu.classList.remove('show');
                    byInterval = false;
                }
            } else {
                e.target.classList.toggle('active');
                if (e.target.classList.contains('active')) {
                    setIntervalMenu.classList.remove('hidden');
                    setIntervalMenu.classList.add('show');
                    byInterval = true;
                } else {
                    setIntervalMenu.classList.add('hidden');
                    setIntervalMenu.classList.remove('show');
                    byInterval = false;
                }
            }
            break;
    }
}

function showOptions() {
    optionsMenu.querySelector('#options').style.paddingBottom = "0";
    optionsMenu.style.paddingBottom = "1em";
    Array.from(options).forEach(option => {
        option.classList.remove('hidden');
        option.classList.add('show');
    });
    menuOpened = true;
}

function hideOptions() {
    optionsMenu.querySelector('#options').style.paddingBottom = "0.5em";
    optionsMenu.style.paddingBottom = "0";
    Array.from(options).forEach(option => {
        option.classList.remove('show');
        option.classList.add('hidden');
    });
    menuOpened = false;
}

stopBtn.addEventListener('click', () => {
    if (isGenerating) {
        clearInterval(interval);
        isGenerating = false;
    } else {
        console.log(byInstant, bySingle, byInterval);
        if (!byInstant && !bySingle && !byInterval) {
            selectedNone();
        } else if (byInstant && !bySingle && !byInterval) {
            console.log('only by instant');
            selected1();
        } else if (byInstant && !bySingle && byInterval) {
            if (intervalMenuInput.value.trim() === "") {
                alert('Please enter the amount of seconds to interval by');
            } else {
                console.log('instant and interval');
                selected13();
            }
        } else if (byInstant && bySingle && !byInterval) {
            selected12();
        } else if (!byInstant && !bySingle && byInterval) {
            if (intervalMenuInput.value.trim() === "") {
                alert('Please enter the amount of seconds to interval by');
            } else {
                colorDisplay.style.transition = `background-color ${intervalMenuInput.value} ease-in-out`;
                selected3();
            }
        } else if (!byInstant && bySingle && !byInterval) {
            selected2();
        }
    }
})

optionsMenu.addEventListener('click', genOptions);

intervalMenuInput.addEventListener('keyup', () => {
    if (isNaN(intervalMenuInput.value)) {
        intervalMenuInput.classList.add('nan');
    } else {
        intervalMenuInput.classList.remove('nan');
    }
})

intervalMenuBtn.addEventListener('click', () => {
    if (isNaN(intervalMenuInput.value) || intervalMenuInput.value.trim() === "") {
        alert('Please enter a valid number');
    } else {
        intTimer = Number(intervalMenuInput.value) * 1000;
        colorDisplay.style.transition = `background-color ${intTimer / 1000}s ease-in-out`;
        console.log(intTimer);
        console.log(colorDisplay.style);
    }
})