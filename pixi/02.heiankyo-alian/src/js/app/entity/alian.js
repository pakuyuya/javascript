'use strict';
import constants from "../common/constants"

/**
 * エイリアンエンティティ
 */
export default class Alian {
    constructor(args) {
        this.entityName = 'Alian'

        this.events = {
            'preUpdate'     : 50,
            'update'        : 50,
            'postUpdate'    : 50,
            'draw'          : 50,
            'dropHoll'      : 50,
            'closeHoll'     : 50,
            'readyResource' : 50,
        }

        this.collisions = [
            'player',
            'holl',
        ]

        this.app = args.app
        this.parent = args.parent

        this.drawable = false
        
        this.x = 0
        this.y = 0
        this.width = constants.pixByBlock
        this.height = constants.pixByBlock
    }

    resources () {
        return {
            images : [],
            sounds : []
        }
    }

    init() {

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

    isCollision (sender, collisionType) {
        return sender.x <= this.x + this.width && sender.x + sender.width >= this.x
                && sender.y <= this.y + this.height && sender.y + sender.height >= this.y
    }
}
