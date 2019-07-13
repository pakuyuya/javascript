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

        this.resources = {
            images : [],
            sounds : [],
        }

        this.entityTemplates = {
            Map, Player, Alian, Holl
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
    }
}