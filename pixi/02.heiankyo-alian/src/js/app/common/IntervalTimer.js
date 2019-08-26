
export default class IntervalTimer {
    constructor (handler, interval) {
        let self = this
        self.canceled = false

        let loopFunc = () => {
            if (!self.canceled) {
                handler()
                self.timerid = setTimeout(loopFunc, interval)
            }
        }
        loopFunc()
    }
    
    stop () {
        this.canceled = true
    }
}