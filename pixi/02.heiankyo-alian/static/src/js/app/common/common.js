import path from 'path'
import constants from './constants'

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
    },

    resolveImageResource(paths) {
        return Array.isArray(paths)
            ? paths.map(p => path.join(constants.imageResourceRoot, p)) : path.join(constants.imageResourceRoot, paths)
    },

    resolveSoundResource(paths) {
        return Array.isArray(paths)
            ? paths.map(p => path.join(constants.soundResourceRoot, p)) : path.join(constants.soundResourceRoot, paths)
    }
}
let _uniqueId = 0
