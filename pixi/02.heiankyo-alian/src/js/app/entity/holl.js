'use strict';
import constants from "../common/constants"

import * as PIXI from 'pixi.js'

const MAX_LEVEL = 4
const DIG_INTEVAL = 15

/**
 * 穴エンティティ
 */
export default class Holl {

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
            'attach'        : 50,
            'detach'        : 50,
        }

        this.collisions = [
            'holl',
        ]

        this.app = args.app
        this.parent = args.parent
        this.drawable = false;

        this.x = 0
        this.y = 0
        this.width = constants.pixByBlock
        this.height = constants.pixByBlock
        
        this.digLevel = 0
        this.digIterval = 0
    }

    resources () {
        return { images : [] }
    }

    init () {
        
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
        if (this.digIterval > 0) {
            --this.digIterval
        }
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
        for (let i = 0; i<this.circles.length; i++) {
            this.circles[i].visible = (i + 1) === this.digLevel
        }
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
        if (this.digIterval <= 0) {
            if (this.digLevel < MAX_LEVEL) {
                ++this.digLevel
                this.digIterval = DIG_INTEVAL
            }
        }
    }

    /**
     * 穴埋めイベント
     * @param ctx
     */
    fillHollEvent(ctx) {
        // TODO:
        if (this.digIterval <= 0) {
            if (--this.digLevel <= 0) {
                this.parent.removeHoll(this)
                return
            }
            this.digIterval = DIG_INTEVAL
        }
    }

    /**
     * 敵落ちイベント
     * @param {any} ctx 
     */
    fallEnemyEvent(ctx) {
        // TODO:
    }

    /**
     * 敵解放イベント
     * @param {any} ctx 
     */
    releaseEnemyEvent(ctx) {
        // TODO:
    }

    /**
     * アタッチイベント
     * @param {any} ctx 
     */
    attachEvent(ctx) {
        let circles = []

        const max_width = this.width * 1 / 4
        for (let i = 0; i<MAX_LEVEL; i++) {
            const circle = new PIXI.Graphics()
            circle.lineStyle(1, 0xFF3300, 1);
            circle.drawCircle(this.x + this.width/2, this.y + this.width/2, max_width * (i + 1) / MAX_LEVEL)
            circle.visible = false
            circles.push(circle)
            this.app.getStage().addChild(circle)
        }
        this.circles = circles
    }

    /**
     * デタッチイベント
     * @param {any} ctx 
     */
    detachEvent(ctx) {
        if (this.circles) {
            for (const circle of this.circles) {
                this.app.getStage().removeChild(circle)
            }
            this.circles = []
        }
    }

    isCollision (sender, collisionType) {
        const x = this.x + this.width / 2
        const y = this.y + this.height / 2
        const w = this.width / 2
        const h = this.height / 2

        return sender.x <= x + w && sender.x + sender.width >= x
                && sender.y <= y + h && sender.y + sender.height >= y
    }
}