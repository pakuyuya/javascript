'use strict';

let passedSeconds = 0;

function tick() {
    passedSeconds++;
    
    setTimeout(tick, 1000);
}
tick();

onmessage = () => {
    let message = `${passedSeconds} seconds passed.`;
    postMessage(message);
};