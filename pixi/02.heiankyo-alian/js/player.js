'use strict';

/**
 * プレイヤーエンティティ
 */
class Player {
    
    constructor() {
        this.entityName = 'player';

        this.events = {
            'preUpdate'  : 50,
            'update'     : 50,
            'postUpdate' : 50,
            'draw'       : 50,
            'attack'     : 50,
        };

        this.resources = {
            images : [],
            sounds : [],
        }

        this.drawable = false;
    }

    /**
     * 事前updateイベント
     * @param ctx
     */
    preUpdateEvent(ctx) {
        // TODO:
    }

    /**
     * updateイベント
     * @param ctx
     */
    updateEvent(ctx) {
        // TODO:
    }

    /**
     * 事後updateイベント
     * @param ctx
     */
    preUpdateEvent(ctx) {
        // TODO:
    }

    /**
     * 描画イベント
     * @param ctx
     */
    drawEvent(ctx) {
        // TODO:
    }

    /**
     * 攻撃受けたイベント
     */
    attackEvent(ctx) {
        // TODO:
    }

    /**
     * リソースロードイベント
     */
    resourceLoadedEvent(ctx) {
        // TODO:
    }
}