import common from '../common/common'
import constants from '../common/constants'

import * as PIXI from 'pixi.js'

/**
 * プレイヤーエンティティ
 */
export default class Player {

    /**
     * コンストラクタ
     */
    constructor(args) {
        this.uniqueId = common.uniqueId()
        this.entityName = 'Player';

        this.events = {
            'preUpdate'  : 50,
            'update'     : 50,
            'postUpdate' : 50,
            'draw'       : 50,
            'damage'     : 50,
            'readyResource' : 50,
            'attach'     : 50,
            'detach'     : 50,
        };

        this.collisions = [
            'holl',
            'alian'
        ]

        this.app = args.app;
        this.drawable = false;
        this.x = constants.pixByBlock
        this.y = constants.pixByBlock

        this.width = constants.pixByBlock
        this.height = constants.pixByBlock

        this.pictIndex = 0
        this.visible = false

        this.direction = 'left'
    }

    resources () {
        return {
            images : [
                common.resolveImageResource('player1.png'),
                common.resolveImageResource('player2.png'),
            ],
            sounds : []
        }
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
        this.refreshPict()
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

    attachEvent(ctx) {
        let pict1 = PIXI.Texture.from(common.resolveImageResource('player1.png'))
        let pict2 = PIXI.Texture.from(common.resolveImageResource('player2.png'))

        this.picts = [new PIXI.Sprite(pict1), new PIXI.Sprite(pict2)]
        for (let pict of this.picts) {
            pict.x = this.x
            pict.y = this.y
            pict.anchor.set(0.0, 0.0)
            this.app.getStage().addChild(pict)
        }
        this.refreshPict()
    }

    detachEvent(ctx) {
        for (let pict of this.picts) {
            this.app.getStage().removeChild(pict)
        }
    }

    setVisible (flg) {
        this.visible = flg
        this.refreshPict()
    }

    refreshPict () {
        for (let i = 0; i < this.picts.length; i++) {
            this.picts[i].visible = i === this.pictIndex && this.visible
        }
    }
}