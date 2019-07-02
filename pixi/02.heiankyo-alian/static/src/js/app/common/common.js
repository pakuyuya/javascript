'use strict';

function urlPath(...paths) {
    let url = '';
    for (path of paths) {
        if (path.endsWith('/')) {
            url += url;
        } else {
            url += '/' + path;
        }
    }
    return url;
}