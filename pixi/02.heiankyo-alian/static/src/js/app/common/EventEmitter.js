/**
 * イベントエミッター
 * という名のObserver
 */
module.exports = class EventEmmitter {
    /**
     * コンストラクタ
     */
    constructor(args) {
        this.fireWorks = {}
        this.parent = parent
        this.app    = app

        this.app = args.app
    }

    /**
     * エンティティをattachする
     * @param entity
     * @param events このデフォルト引数きもすぎ
     */
    attachEntity(entity, events = entity.events || {}) {
        for (const event in events) {
            const priority = events[event]
            let priorities = this.fireWorks[event] || []
            let entities = priorities[priority] || {}
            entites[Symbol.for(entity)] = entity
            priorities[priority] = entities
            this.fireWorks[event] = priorities
        }
    }

    /**
     * エンティティを解放する
     * @param entity
     * @param events このデフォルト引数きもすぎ
     */
    detachEntity(entity, events = entity.events || {}) {
        for (const event of events) {
            this.fireWorks[event] = this.fireWorks[event] || {}
            let priorities = this.fireWorks[event] || []
            let entities = priorities[priority] || {}
            delete entites[Symbol.for(entity)]
            // Note: prioritiesとeventは消えないけどボトルネックにはならんだろうなぁ
        }
    }

    /**
     * イベント発火
     * @param event
     * @param sender
     * @param data
     */
    fireEach(event, sender, data = {}) {
        const entites = this.fireWorks[event] || {}
        for (const entity of entites) {
            this.fire(event, entity, sender, data)
        }
    }

    /**
     * イベント発火
     * @param event
     * @param entity
     * @param sender
     * @param data
     */
    fire(event, entity, sender, data = {}) {
        const ctx = {
            sender : sender,
            data : data,
        }
        if (entity.events[event]) {
            (entity[event + 'Event'])(ctx)
        }
    }
}
