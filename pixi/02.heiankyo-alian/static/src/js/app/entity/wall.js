'use strict';

/**
 * 壁エンティティ
 */
export default class Wall {
    static resources () {
        return {
            images : [],
            sounds : []
        }
    }

    /**
     * コンストラクタ
     */
    constructor(args) {
        this.entityName = 'Player'

        this.events = {
            'preUpdate'  : 50,
            'update'     : 50,
            'postUpdate' : 50,
            'draw'       : 50,
            'damage'     : 50,
            'readyResource' : 50,
        }

        this.collisions = [
            'move',
        ]

        this.resources = {
            images : [],
            sounds : [],
        }

        this.app = args.app
        this.drawable = false
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
    damageEvent(ctx) {
        // TODO:
    }
}