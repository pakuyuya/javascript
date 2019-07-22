'use strict';

import common from "../common/common";
import * as PIXI from "pixi.js"

/**
 * 壁エンティティ
 */
export default class Wall {
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

        this.app = args.app
        this.drawable = false
        this.x = 0
        this.y = 0
    }

    resources () {
        return {
            images : common.resolveImageResource(['wall.png']),
            sounds : []
        }
    }

    init () {
        
    }

    attachEntityEvent(ctx) {
        let texture = PIXI.Texture.fromImage(common.resolveImageResource('wall.png'))
        texture.x = this.x
        texture.y = this.y
        this.texture = texture

        this.app.getStage().addChild(this.texture)
    }

    detachEntityEvent(ctx) {
        this.app.getStage().removeChild(this.texture)
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