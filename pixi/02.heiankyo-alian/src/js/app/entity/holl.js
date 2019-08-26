'use strict';
import constants from "../common/constants"

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

    isCollision (sender, collisionType) {
        return sender.x <= this.x + this.width && sender.x + sender.width >= this.x
                && sender.y <= this.y + this.height && sender.y + sender.height >= this.y
    }
}