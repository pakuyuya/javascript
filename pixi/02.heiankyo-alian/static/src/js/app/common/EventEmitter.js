import common from './common'

/**
 * イベントエミッター
 * という名のObserver
 */
export default class EventEmmitter {
    /**
     * コンストラクタ
     */
    constructor(args) {
        this.objid = common.uniqueId()
        this.fireWorks = {}
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
            if (!entity.uniqueId) {
                entity.uniqueId = common.uniqueId()
            }
            entities[entity.uniqueId] = entity
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
            delete entities[entity.uniqueId]
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
        const priorities = this.fireWorks[event] || []
        for (const priority of priorities) {
            for (const uniqueId in priority) {
                if (common.isUniqueId(uniqueId)) {
                    let entity = priority[uniqueId]
                    this.fire(event, entity, sender, data)
                }
            }
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
        if (!entity.events || entity.events[event]) {
            if (entity[`${event}Event`]) {
                (entity[`${event}Event`])(ctx)
            }
        }
    }
}
