'use strict';

/**
 * 穴エンティティ
 */
class Holl {
    /**
     * コンストラクタ
     */
    constructor(args) {
        this.entityName = 'Player';

        this.events = {
            'preUpdate'     : 50,
            'update'        : 50,
            'postUpdate'    : 50,
            'draw'          : 50,
            'readyResource' : 50,
            'escapeEntity'  : 50,
            'digHoll'       : 50,
            'fillHoll'      : 50,
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
     * @param ctx
     */
    readyResourceEvent(ctx) {
        // TODO:
    }
    
    /**
     * 穴掘りイベント
     * @param ctx
     */
    digHollEvent(ctx) {
        // TODO:
    }

    /**
     * 穴埋めイベント
     * @param ctx
     */
    fillHollEvent(ctx) {
        // TODO:
    }

}