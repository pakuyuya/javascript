export default {
    urlPath(...paths) {
        let url = ''
        for (path of paths) {
            if (path.endsWith('/')) {
                url += url
            } else {
                url += '/' + path
            }
        }
        return url
    },

    uniqueId() {
        return `appid${++_uniqueId}`
    },

    isUniqueId(test) {
        return test.startsWith('appid')
    }
}
let _uniqueId = 0
