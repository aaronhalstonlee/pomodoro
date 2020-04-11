//declare variables
const breakLength       = document.getElementById('breakLength');
const breakDecrement    = document.getElementById('breakDecrement');
const breakIncrement    = document.getElementById('breakIncrement');
const sessionLength     = document.getElementById('sessionLength');
const sessionDecrement  = document.getElementById('sessionDecrement');
const sessionIncrement  = document.getElementById('sessionIncrement');
const timerLabel        = document.getElementById('timerLabel');
const timerType         = document.getElementById('timerType');
const min               = document.getElementById('min');
const sec               = document.getElementById('sec');
const start             = document.getElementById('start');
const stopCount              = document.getElementById('stop');
const reset             = document.getElementById('reset');
const beep              = new Audio('./beep.mp3');
let timerRunning        = false;
let paused              = true;
let interval;

//function to increment break time
const incrementBreak = () => {
    
    if(!paused){
        return interupt();
    }
    if (breakLength.innerHTML<99){
        breakLength.innerHTML++;
        if(breakLength.innerHTML<10){
            breakLength.innerHTML = `0${breakLength.innerHTML}`;
        }
    } else {
        alert('max break time reached')
    }
}
//function to decrement break time
const decrementBreak = () => {
    if(!paused){
        return interupt();
    }
    if (breakLength.innerHTML>1){
        breakLength.innerHTML--;
        if(breakLength.innerHTML<10){
            breakLength.innerHTML = `0${breakLength.innerHTML}`;
        }
    } else {
        alert('min break time reached');
    }
}
//function to increment session time
const incrementSession = () => {
    if(!paused){
        return interupt();
    }
    if (sessionLength.innerHTML<99){
        sessionLength.innerHTML++;
        if(sessionLength.innerHTML<10){
            sessionLength.innerHTML = `0${sessionLength.innerHTML}`;
        }
        min.innerText = sessionLength.innerText;
        sec.innerText = '00';
    } else {
        alert('max session time reached')
    }
}
//function to decrement session time
const decrementSession = () => {
    if(!paused){
        return interupt();
    }
    if (sessionLength.innerHTML>1){
        sessionLength.innerHTML--;
        if(sessionLength.innerHTML<10){
            sessionLength.innerHTML = `0${sessionLength.innerHTML}`;
        }
        min.innerText = sessionLength.innerText;
        sec.innerText = '00';
    } else {
        alert('min session time reached')
    }
}
//function to count down timer
const countDown = () => {
    if (sec.innerHTML>0){
        sec.innerHTML--;
        if(sec.innerHTML<10){
            sec.innerHTML = `0${sec.innerHTML}`;
        }
    } else {
        min.innerHTML--;
        sec.innerHTML = 59
        if (min.innerHTML<10){
            min.innerHTML = `0${min.innerHTML}`;    
        } 
    }

    //need to add logic to flip this to change back to session also need to add labels for when in break and session
    if (min.innerHTML<1 && sec.innerHTML==0){
        beep.play();
        clearInterval(interval)
        timerRunning = false;
        timerLabel.innerText=='session timer running' ? min.innerHTML = breakLength.innerHTML : min.innerHTML = sessionLength.innerHTML;
        sec.innerHTML = "00";
        runTimer();
    }
}

const runTimer = () => {
    if (!timerRunning){
        interval = setInterval(countDown, 1000);
        if (!paused){
            timerLabel.innerText=='session timer running' ? timerLabel.innerText = 'break timer running' : timerLabel.innerText = 'session timer running';
        } else {
            timerLabel.innerText=='session timer paused' ? timerLabel.innerText = 'session timer running' : timerLabel.innerText = 'break timer running';
        }
        timerRunning = true;
        paused = false;
    } else {
        //do nothing!
    }
}

const stopTimer = () => {
    clearInterval(interval);
    timerLabel.innerText == 'session timer running' ? timerLabel.innerText = 'session timer paused' : timerLabel.innerText = 'break timer paused'
    timerRunning = false;
    paused = true
}

const resetTimer = () => {
    let cancel = window.confirm('would you like to cancel any changes made?')
    if (cancel){
        timerRunning = false;
        paused = true;
        clearInterval(interval);
        timerLabel.innerText = 'session timer paused'
        min.innerHTML = sessionLength.innerHTML;
        sec.innerHTML = "00";
    } else {
        //do nothing!;
    }
}

const resetTimerAlt = () => {
    timerRunning = false;
    paused = true;
    clearInterval(interval);
    timerLabel.innerText = 'session timer paused'
    min.innerHTML = sessionLength.innerHTML;
    sec.innerHTML = "00";
}

const interupt = () => {
    let cancel = window.confirm('would you like to cancel current timer?');
    if (cancel){
        clearInterval(interval);
        resetTimerAlt();
    } else {
        paused = false;
        return;
    }
}


//add event listeners to buttons
breakIncrement.addEventListener('click', incrementBreak);
breakDecrement.addEventListener('click', decrementBreak);
sessionIncrement.addEventListener('click', incrementSession);
sessionDecrement.addEventListener('click', decrementSession);
start.addEventListener('click', runTimer);
stopCount.addEventListener('click', stopTimer);
reset.addEventListener('click', resetTimer);