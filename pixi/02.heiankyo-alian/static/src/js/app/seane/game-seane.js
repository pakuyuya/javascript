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
        }

        this.drawable = false

        this.app = args.app
        this.map = new Map({app: this.map, parent: this})
    }

    dependentEntities () {
        return { Map, Player, Alian, Holl }
    }

    resources () {
        return { images : [] }
    }

    init() {
        let newSeane = new OpeningSubSeane({app: this.app, parent: this})
        this.switchSubSeane(newSeane)
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
     * シーン開始イベント
     * @param ctx
     */
    enterSeaneEvent(ctx) {
        if (!this.app[this.uniqueId]) {
            this.attachApp()
            this.app[this.uniqueId] = true
        }
        if (this.subSeane) {
            this.app.fire('enterSeane', this.subSeane)
        }
    }

    
    attachApp() {
        this.map.initBlockTables()
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
        // TODO: 
    }

    /**
     * サブシーンを切り替えます。
     * 
     * @param newSeane 新しいシーン
     */
    switchSubSeane(newSeaneClass) {
        if (this.subSeane) {
            this.app.removeEntity(this.subSeane)
        }
        let newSubSeane = new newSeaneClass({
            app: this.app,
            parentSeane: this
        });

        this.app.attachEntity(newSubSeane)
        this.subSeane = newSubSeane
        this.app.fire('enterSeane', this.subSeane)
    }
}