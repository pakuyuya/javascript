'use strict';

/**
 * エイリアンエンティティ
 */
class Alian {
    
    constructor(args) {
        this.entityName = 'Alian';

        this.events = {
            'preUpdate'     : 50,
            'update'        : 50,
            'postUpdate'    : 50,
            'draw'          : 50,
            'dropHoll'      : 50,
            'closeHoll'     : 50,
            'readyResource' : 50,
        };

        this.resources = {
            images : [],
            sounds : [],
        }

        this.app = args.app;
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
     * リソースロードイベント
     */
    readyResourceEvent(ctx) {
        // TODO:
    }

    /**
     * 攻撃受けたイベント
     */
    dropHollEvent(ctx) {
        // TODO:
    }

    /**
     * 攻撃受けたイベント
     */
    closeHollEvent(ctx) {
        // TODO:
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
}
