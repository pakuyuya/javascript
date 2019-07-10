'use strict'

/**
 * ゲーム実行中シーン
 */
class GameSeane {
    
    /**
     * コンストラクタ
     * @param args 
     */
    constructor(args) {
        this.entityName = 'GameSeane'

        this.events = {
            'preUpdate'  : 50,
            'update'     : 50,
            'postUpdate' : 50,
            'draw'       : 50,
            'readyResource' : 50,
        }

        this.resources = {
            images : [],
            sounds : [],
        }

        this.drawable = false

        this.app = args.app
        this.switchSubSeane(OpeningSubSeane)
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
     * サブシーンを切り替えます。
     * 
     * @param newSeane 新しいシーン
     */
    switchSubSeane(newSeane) {
        this.app.removeEntity(this.seane)
        this.app.ttachEntity(this.seane)
        this.subSeane = newSeane
    }
}