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
            'player',
        ]

        this.app = args.app
        this.parent = args.parent
    
        this.drawable = false
    
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
        let direction = this.detectPushedArrow()

        if (direction) {
            this.direction = direction

            let moveTo = {x: this.x, y: this.y}
            switch (direction) {
            case 'up':
                moveTo.y -= constants.pixByStep
                break
            case 'down':
                moveTo.y += constants.pixByStep
                break
            case 'left':
                moveTo.x -= constants.pixByStep
                break
            case 'right':
                moveTo.x += constants.pixByStep
                break
            }

            // TODO: movable check & adjust

            // 壁と衝突判定をとり、xyを補正する
            moveTo = (() => {
                let collisionTestObject = Object.assign({}, this)
                collisionTestObject.x = moveTo.x
                collisionTestObject.y = moveTo.y

                let collisions = this.parent.map.getCollisions(collisionTestObject, 'wall')

                if (!collisions || collisions.length === 0) {
                    return moveTo
                }
                if (collisions.length > 1) {
                    // あたった壁が2枚の場合は止まる
                    return {x: this.x, y: this.y}
                }
                // if (collisions.length === 1)
                if ((direction === 'left' || direction === 'right') && collisions[0].x === this.x
                    || (direction === 'up' || direction === 'down') && collisions[0].y === this.y) {
                        return {x: this.x, y: this.y}
                }

                // あたった壁が1枚の場合、進行方向コーナーであれば、近くの通路のほうに曲がる補正をつける。
                let adjustTo = {x: this.x, y: this.y}

                const wall = collisions[0]
                const xy = (direction === 'up' || direction === 'down') ? 'x' : 'y'

                const vect = (wall[xy] - this[xy]) <= 0 ? 1 : -1

                collisionTestObject = Object.assign({}, this)
                collisionTestObject[xy] = adjustTo[xy] = this[xy] + vect * constants.pixByStep

                // collisionをとり、ぶつかったら補正する
                collisions = this.parent.map.getCollisions(collisionTestObject, 'wall')
                if (collisions && collisions.length > 0) {
                    const col0 = collisions[0]
                    adjustTo[xy] = col0[xy] + (xy === 'x' ? col0.width : col0.height) * vect * -1
                }

                return adjustTo
            })()

            this.x = moveTo.x
            this.y = moveTo.y
        }
    }

    /**
     * 押下されているキーを取得する
     * @returns {string|undefined} 'up','left','right','down', 押下なしの場合 undefined
     */
    detectPushedArrow () {
        let checkKeys = [
            'up',
            'left',
            'right',
            'down'
        ]
        let idxCrtDirection = checkKeys.indexOf(this.direction)
        checkKeys.splice(idxCrtDirection, 1, this.direction)

        let keys = this.app.inputHandler.getFiredKeys()
        for (let key of checkKeys) {
            if (keys[key]) {
                return key
            }
        }
        return undefined
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

    isCollision (sender, collisionType) {
        return sender.x <= this.x + this.width && sender.x + sender.width >= this.x
                && sender.y <= this.y + this.height && sender.y + sender.height >= this.y
    }

    refreshPict () {
        for (let i = 0; i < this.picts.length; i++) {
            this.picts[i].x = this.x
            this.picts[i].y = this.y
            this.picts[i].visible = i === this.pictIndex && this.visible
        }
    }
    
}