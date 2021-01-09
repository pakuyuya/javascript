self.addEventListener('install', (ev) => {
    console.info('install', ev);
});
self.addEventListener('activate', (ev) => {
    console.info('activate', ev);
});
self.addEventListener('fetch', function(ev) {
    console.log('fetch', ev.request.url);
});
