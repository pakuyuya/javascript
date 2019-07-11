import common from '../common/common'
import LoadingSeane from './loading-seane'
import GameSeane from './game-seane'

import * as PIXI from 'pixi.js'

/**
 * シーンエンティティ
 */
export default class TitleSeane {
    
    /**
     * コンストラクタ
     */
    constructor(args) {
        this.uniqueId = common.uniqueId()

        this.entityName = 'TitleSeane'

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
        this.drawable = true

        this.entities = {}
    }

    /**
     * エンティティをAttachする
     */
    attachEntity(entity) {
        const key = Symbol()
        entity['$$hk' + this.entityName] = key
        this.entities[key] = entity

        this.app.attachEntity(entity)
    }

    removeEntity(entity) {
        const key = entity['$$hk' + this.entityName]
        if (key) {
            delete this.entities[key]
        }
        this.app.detachEntity(entity)
    }

    removeAllEntities() {
        for (const key in this.entities) {
            removeEntity(this.entities[key])
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
        if (this.app.getInput().isJustPushed('a')) {
            this.app.switchSeane(new LoadingSeane({
                app: this.app,
                seane: new GameSeane({app: this.app})
            }))
        }
    }

    /**
     * 事後updateイベント
     * @param ctx
     */
    postUpdateEvent(ctx) {
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
     * シーン開始イベント
     * @param ctx
     */
    enterSeaneEvent(ctx) {
        this.preInitGraphics()

        if (!this.app[this.uniqueId]) {
            this.attachApp()
            this.app[this.uniqueId] = true
        }
    }

    /**
     * appに接続しリソースを初期化する
     */
    attachApp() {
        this.app.getStage().addChild(this.loadingBG)
        this.app.getStage().addChild(this.pushstart)
        this.app.getStage().addChild(this.titlelogo)
    }

    preInitGraphics() {
        if (!this.loadingBG) {
            let loadingBG = new PIXI.Graphics()
            loadingBG.beginFill(0x555555)
            loadingBG.drawRect(0, 0, this.app.width, this.app.height)
            loadingBG.endFill()
            this.loadingBG = loadingBG
        }
        if (!this.titlelogo) {
            let titlelogo = new PIXI.Text('平安京エイリアン',{fontFamily : 'Arial', fontSize: 48, fill : 0xffffff, align : 'center'});
            titlelogo.x = this.app.width / 2 - titlelogo.width / 2
            titlelogo.y = this.app.height / 3 - titlelogo.height / 2
            this.titlelogo = titlelogo
        }
        if (!this.pushstart) {
            let pushstart = new PIXI.Text('push Z to start',{fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'center'});
            pushstart.x = this.app.width / 2 - pushstart.width / 2
            pushstart.y = this.app.height * 2 / 3 - pushstart.height - 1
            this.pushstart = pushstart
        }
    }

    /**
     * シーン終了イベント
     * @param ctx
     */
    leaveSeaneEvent(ctx) {
        if (this.app[this.uniqueId]) {
            this.detachApp()
            this.app[this.uniqueId] = false
        }
    }

    /**
     * appから接続解除する際リソースを取り除く
     */
    detachApp() {
        this.app.getStage().removeChild(this.loadingBG)
        this.app.getStage().removeChild(this.pushstart)
        this.app.getStage().removeChild(this.titlelogo)
        this.removeAllEntities()
    }
}