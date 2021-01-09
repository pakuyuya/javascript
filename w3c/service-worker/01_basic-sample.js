if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('01_basic-sample-worker.js', { scope: '/' })
        .then((reg) => {
            console.log('Succeed register!', reg);
        })
        .catch((err) => {
            console.log('Filed register', err);
        })
}