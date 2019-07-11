'use strict'

export default class LoadingSubSeane {
    
    /**
     * コンストラクタ
     */
    constructor(args) {
        this.nextSeane = args.seane
        this.entityName = 'LoadingSeane'

        this.events = {
            'preUpdate'  : 50,
            'update'     : 50,
            'postUpdate' : 50,
            'draw'       : 50,
            'readyResource' : 50,
            'enterSeane' : 50,
            'leaveSeane' : 50,
        }

        this.resources = {
            images : [],
            sounds : [],
        }

        this.app = args.app
        this.perProgress = 0
        // TODO: impliment loading
    }

    updateProgress() {
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
        this.updateProgress()

        if (this.perProgress >= 100) {
            this.app.switchSeane(this.nextSeane)
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
        // TODO:
    }

    /**
     * リソースロードイベント
     */
    readyResourceEvent(ctx) {
        // TODO:
    }
}