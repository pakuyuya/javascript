export default class InputHandler {
    constructor() {
        this.prevKeys = {}
        this.keys = {}

        this.durations = {}

        this.envents = {
            'postUpdate' : 90
        }
    }

    /**
     * 指定したキーの入力フラグを立てます。
     * @param key
     */
    fire(key) {
        this.keys[key] = true
    }

    /**
     * 指定したキーの入力フラグを立てます。
     * @param key
     */
    push(key) {
        this.keys[key] = true
    }

    /**
     * 指定したキーの入力フラグを解除します。
     * @param key
     */
    left(key) {
        delete this.keys[key]
    }
    
    /**
     * 事前更新イベント
     * @param ctx コンテキスト
     */
    postUpdateEvent(ctx) {
        this.prevKeys = Object.assign({}, this.keys)
        this.updateDuration()
    }

    /**
     * 入力中のキーを返却する。
     * @return キーの連想配列。入力があったキーのみtrueの配列で取得。
     */
    getFiredKeys() {
        return Object.assign({}, this.keys)
    }

    /**
     * 該当フレーム中で入力されたキーの配列を取得する。
     * @return キーの連想配列。入力があったキーのみtrueの配列で取得。
     */
    getJustPushedKeys() {
        let keys = {}
        for (const key in this.keys) {
            if (!this.prevKeys[key]) {
                keys[key] = true
            }
        }
        return keys
    }

    /**
     * 該当フレーム中で離されたキーの配列を取得する。
     * @return キーの連想配列。入力があったキーのみtrueの配列で取得。
     */
    getJustLeftKeys() {
        let keys = {}
        for (const key in this.prevKeys) {
            if (!this.keys[key]) {
                keys[key] = true
            }
        }
        return keys
    }

    getDurations() {
        return Object.assign({}, this.durations)
    }

    /**
     * キー入力が続いている期間だけカウントアップする
     */
    updateDuration() {
        for (const key in this.keys) {
            if (!this.durations[key]) {
                this.durations[key] = 1
            } else {
                ++(this.durations[key])
            }
        }
        for (const key in this.durations) {
            if (!this.keys[key]) {
                delete this.durations[key]
            }
        }
    }
}
