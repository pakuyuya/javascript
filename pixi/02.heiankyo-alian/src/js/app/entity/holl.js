'use strict';
import constants from "../common/constants"

import * as PIXI from 'pixi.js'

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
            'alian',
            'player',
            'digHoll'
        ]

        this.app = args.app;
        this.drawable = false;

        this.x = 0
        this.y = 0
        this.width = constants.pixByBlock
        this.height = constants.pixByBlock
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
    digEvent(ctx) {
        // TODO:
    }

    /**
     * 穴埋めイベント
     * @param ctx
     */
    fillEvent(ctx) {
        // TODO:
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
        
        let circle = new PIXI.Graphics()
        circle.lineStyle(1, 0xFF3300, 1);
        circle.drawCircle(this.x + this.width/2, this.y + this.width/2, this.width / 4)
        this.circle = circle
        this.app.getStage().addChild(circle)
    }

    /**
     * デタッチイベント
     * @param {any} ctx 
     */
    detachEvent(ctx) {
        if (this.circle) {
            this.app.getStage().removeChild(this.circle)
        }
    }

    isCollision (sender, collisionType) {
        const x = this.x + this.width / 2
        const y = this.y + this.height / 2
        const w = this.x + this.width / 2
        const h = this.y + this.height / 2

        return sender.x <= x + w && sender.x + sender.width >= x
                && sender.y <= y + h && sender.y + sender.height >= y
    }
}