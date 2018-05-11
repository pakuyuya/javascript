'use strict';

let worker;

if (window.Worker) {
    worker = new Worker("worker.js");    
}
worker.onmessage = (e) => {
    console.log(e);
    document.getElementById('messages').appendChild(document.createTextNode(e.data));
    document.getElementById('messages').appendChild(document.createElement('br'));
};

function getWorkerMessage() {
    if (!worker) {
        return;
    }
    worker.postMessage(null);
}