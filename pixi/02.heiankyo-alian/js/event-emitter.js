'use strict';

/**
 * イベントエミッター
 */
class EventEmitter {

    /**
     * コンストラクタ
     */
    constructor(args) {
        this.fireWorks = {};
        this.parent = parent;
        this.app    = app;

        this.app = args.app;
    }

    /**
     * エンティティをattachする
     * @param entity
     * @param events このデフォルト引数きもすぎ
     */
    attachEntity(entity, events = entity.events || {}) {
        for (const event in events) {
            const priority = events[event];
            const priorities = this.fireWorks[event] || [];
            const entities = priorities[priority] || {};
            entites[Symbol.for(entity)] = entity;
            priorities[priority] = entities;
            this.fireWorks[event] = priorities;
        }
    }

    /**
     * エンティティを解放する
     * @param entity
     * @param events このデフォルト引数きもすぎ
     */
    detachEntity(entity, events = entity.events || {}) {
        for (const event of events) {
            this.fireWorks[event] = this.fireWorks[event] || {};
            const priorities = this.fireWorks[event] || [];
            const entities = priorities[priority] || {};
            delete entites[Symbol.for(entity)];
            // Note: prioritiesとeventは消えないけどボトルネックにはならんだろうなぁ
        }
    }

    /**
     * イベント発火
     */
    fireEach(event, sender, data = {}) {
        const entites = this.fireWorks[event] || {};
        for (const eneity of entites) {
            const ctx = {
                sender : sender,
                data : data,
            }
        }
    }
}