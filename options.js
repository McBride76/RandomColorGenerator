function selectedNone () {
    interval = setInterval(genColor, 1000);
    colorDisplay.style.transition = 'background-color 0.5s ease-in-out';
    isGenerating = true;
}

function selected1 () {
    interval = setInterval(genColor, 1000);
    colorDisplay.style.transition = 'background-color 0s';
    isGenerating = true;
}

function selected12 () {
    stopBtn.textContent = "Generate";
    colorDisplay.style.transition = 'background-color 0s';
    genColor();
}

function selected13 () {
    interval = setInterval(genColor, intTimer);
    colorDisplay.style.transition = 'background-color 0s';
    isGenerating = true;
    console.log('test');
}

function selected3 () {
    interval = setInterval(genColor, intTimer);
    isGenerating = true;
}

function selected2 () {
    genColor();
}