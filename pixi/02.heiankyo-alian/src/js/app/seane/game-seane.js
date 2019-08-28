'use strict'

import OpeningSubSeane from './game-subseanes/opening-subseane'
import Map from '../entity/map'
import Player from '../entity/player'
import Alian from '../entity/alian'
import Holl from '../entity/holl'

/**
 * ゲーム実行中シーン
 */
export default class GameSeane {

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
            'enterSeane' : 50,
            'leaveSeane' : 50,
            'watchAttached' : 50,
            'watchDetached' : 50,
        }

        this.app = args.app
        this.parent = args.parent

        this.drawable = false

        this.map = new Map({app: this.app, parent: this})
        this.player = new Player({app: this.app, parent: this})

        this.holls = {}
    }

    dependentEntities () {
        return { Map, Player, Alian, Holl }
    }

    resources () {
        return { images : [] }
    }

    /**
     * Holl を生成する
     * @param {{x: number, y:number}} position 生成位置
     * @returns {Holl} 生成したHollの参照
     */
    createHoll({x, y}) {
        const holl = new Holl({app: this.app, parent: this})
        holl.x = x
        holl.y = y

        this.holls[holl.uniqueId] = holl
        this.app.attachEntity(holl)

        return holl
    }

    /**
     * Hollを除去する
     * @param {Holl} holl 対象
     */
    removeHoll(holl) {
        delete this.holls[holl.uniqueId]
        this.app.detachEntity(holl)
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

    watchAttachedEvent(ctx) {
        this.map.addCollisionEntity(ctx.data.entity)
    }

    watchDetachedEvent(ctx) {
        this.map.removeCollisionEntity(ctx.data.entity)
    }

    /**
     * シーン開始イベント
     * @param ctx
     */
    enterSeaneEvent(ctx) {
        let newSeane = new OpeningSubSeane({app: this.app, parent: this})
        this.switchSubSeane(newSeane)

        if (!this.app[this.uniqueId]) {
            this.attachApp()
            this.app[this.uniqueId] = true
        }
        if (this.subSeane) {
            this.app.fire('enterSeane', this.subSeane)
        }
    }

    addCollisionTree(entity) {
        this.map.addCollisionEntity(entity)
    }
    
    attachApp() {
        this.map.initBlockTables()
        this.app.attachEntity(this.player)

        for (const key in this.holls) {
            this.app.attachEntity(this.holls[key])
        }
    }

    /**
     * シーン終了イベント
     * @param ctx
     */
    leaveSeaneEvent(ctx) {
        if (this.subSeane) {
            this.app.fire('leaveSeane', this.subSeane)
        }
        if (this.app[this.uniqueId]) {
            this.detachApp()
            this.app[this.uniqueId] = false
        }
    }

    detachApp() {
        this.app.detachEntity(this.player)

        for (const holl of this.holls) {
            this.app.detachEntity(holl)
        }
    }

    /**
     * サブシーンを切り替えます。
     * 
     * @param newSubSeane 新しいシーン
     */
    switchSubSeane(newSubSeane) {
        if (this.subSeane) {
            this.app.detachEntity(this.subSeane)
        }
        this.app.attachEntity(newSubSeane)
        this.subSeane = newSubSeane
        this.app.fire('enterSeane', this.subSeane)
    }
}