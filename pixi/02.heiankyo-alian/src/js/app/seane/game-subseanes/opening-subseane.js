import common from '../../common/common'

/**
 * オープニングデモ用サブシーン
 */
export default class OpneningSubSeane {
    
    /**
     * コンストラクタ
     */
    constructor(args) {
        this.uniqueId = common.uniqueId()
        this.entityName = 'OpneningSubSeane'

        this.events = {
            'preUpdate'  : 50,
            'update'     : 50,
            'postUpdate' : 50,
            'draw'       : 50,
            'readyResource' : 50,
            'attach'     : 50,
            'detach'     : 50,
        }

        this.app = args.app
        this.parent = args.parent
        this.drawable = false
        
        this.eventFrameRemain = 100
        this.timeline = {
            100: () => { this.parent.player.setVisible(true) }
        }
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
        if (this.timeline[this.eventFrameRemain]) {
            this.timeline[this.eventFrameRemain]()
        }
        --this.eventFrameRemain
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

    attachEvent(ctx) {

    }

    detachEvent(ctx) {

    }
}