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
            'alian',
            'alianEasy',
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
    fallHollEvent(ctx) {
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
        if (collisionType === 'alian') {
            const x = this.x + this.width / 4
            const y = this.y + this.height / 4
            const w = this.width / 2
            const h = this.height / 2

            return sender.x < x + w && sender.x + sender.width > x
                    && sender.y < y + h && sender.y + sender.height > y
        }
        if (collisionType === 'alianEasy') {
            const x = (this.x < sender.x) ? this.x - this.width / 2 : this.x + this.width / 2 
            const y = (this.y < sender.y) ? this.y - this.height / 2 : this.y + this.height / 2
            const w = this.width
            const h = this.height

            return sender.x < x + w && sender.x + sender.width > x
                    && sender.y < y + h && sender.y + sender.height > y
        }
        return false
    }
}
