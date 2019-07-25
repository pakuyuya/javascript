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
            'attach' : 50,
            'detach' : 50,
        }

        this.collisions = [
            'move',
        ]

        this.app = args.app
        this.drawable = false
        this.x = 0
        this.y = 0

        this.width = constants.pixByBlock
        this.height = constants.pixByBlock
    }

    resources () {
        return {
            images : common.resolveImageResource(['wall.png']),
            sounds : []
        }
    }

    init () {
        
    }

    attachEvent(ctx) {
        let texture = PIXI.Texture.from(common.resolveImageResource('wall.png'))
        this.texture = texture
        let sprite = new PIXI.Sprite(texture)
        sprite.x = this.x
        sprite.y = this.y
        this.sprite = sprite

        this.app.getStage().addChild(this.sprite)
    }

    detachEvent(ctx) {
        this.app.getStage().removeChild(this.sprite)
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
        this.texture.x = this.x || 0
        this.texture.y = this.y || 0
    }

    /**
     * リソースロードイベント
     */
    readyResourceEvent(ctx) {
        if (ctx.data.type === 'texture') {
            this.texture = ctx.data.datas[common.resolveImageResource(['wall.png'])]
        }
    }
    
    /**
     * 攻撃受けたイベント
     */
    damageEvent(ctx) {
        // TODO:
    }
}