var child_process = require("child_process");

let proc = child_process.spawn('ping', ['localhost']);
