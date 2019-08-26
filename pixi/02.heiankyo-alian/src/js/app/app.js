import common from './common/common'
import EventEmitter from './common/EventEmitter'
import InputHandler from './common/InputHandler'
import ResourceResolver from './common/ResourceResolver'
import IntervalTimer from './common/IntervalTimer'

import TitleSeane from './seane/title-seane'

import * as PIXI from 'pixi.js'
import { isContext } from 'vm';
import constants from './common/constants';

/**
 * アプリケーション
 */

export default class {
    /**
     * コンストラクタ
     */
    constructor(args = { appendTo: document.body }) {
        this.uniqueId = common.uniqueId()

        let defaultOption = {
            width: constants.canvasWidth,
            height: constants.canvasHeight,
        }

        args = Object.assign(defaultOption, args)
        const self = this

        // fps.
        this.fps = args.fps || 30

        this.width = args.width
        this.height = args.height

        // キーボードのマッピング。
        this.keyboardMap = {
            'z' : 'a',
            'x' : 'b',
            'arrowup'    : 'up',
            'arrowdown'  : 'down',
            'arrowleft'  : 'left',
            'arrowright' : 'right',
        }

        // 確かデバッグ用のフィールド
        this.entityName = 'App'

        // 受け付けるイベントの種別。EventEmitter参照
        this.events = [
            'readyEntity',
        ]
        
        // PIXIアプリケーション
        this.pixiApp = new PIXI.Application({
            width: this.width,
            height: this.height
        })

        const initArgs = {
            app : this,
            baseurl : (window.location.origin + '/' + window.location.pathname.replace('/?index.html$', '')),
            pixiApp: this.pixiApp
        }
        
        // 各コア機能
        this.eventEmitter     = new EventEmitter(initArgs)
        this.inputHandler      = new InputHandler(initArgs)
        this.resourceResolver = new ResourceResolver(initArgs)

        // 現在の描画シーン
        this.seane = null

        args.appendTo.appendChild(this.pixiApp.view)

        // inputHandlerに追加
        this.attachEntity(this.inputHandler)

        // set events on window.
        if (!document.body[this.uniqueId]) {
            document.body.addEventListener('keydown', (ev) => {
                const key = ev.key.toLowerCase()
                if (self.keyboardMap[key]) {
                    self.pushKey(self.keyboardMap[key])
                }
            })
            document.body.addEventListener('keyup', (ev) => {
                const key = ev.key.toLowerCase()
                if (self.keyboardMap[key]) {
                    self.leftKey(self.keyboardMap[key])
                }
            })
            document.body[this.uniqueId] = true
        }

    }

    /**
     * アプリケーションを起動します
     * @param config
     */
    launch(config) {
        config = Object.assign(
            config,
            {
                defaultSeane : TitleSeane,
            }
        )

        // タイマー作動
        this.tick = new IntervalTimer(() => {
            this.fireEach('preUpdate')
            this.fireEach('update')
            this.fireEach('postUpdate')
            this.fireEach('draw')
            this.pixiApp.render()
        }, ~~(1000/this.fps))

        this.switchSeane(new config.defaultSeane({app: this}))
    }

    /**
     * エンティティを追加します。
     * @param entity エンティティ
     */
    attachEntity(entity) {
        this.eventEmitter.attachEntity(entity)
        this.eventEmitter.fire('attach', entity, this, {app: this})
    }

    /**
     * エンティティを取り除きます。
     * @param entity エンティティそのものかエンティティID
     */
    removeEntity(entity) {
        // イベント
        this.eventEmitter.fire('detach', entity, this, {app: this})
        this.eventEmitter.detachEntity(entity)
    }

    /**
     * 画像リソースを読み込みます。
     * @param urls URLの配列
     * @param owner  readyResourceEvent の発火の形でコールバックを受けるオブジェクト
     * @return Promise<Array<PIXI.texture>>
     */
    loadTextures(urls, owner) {
        let owners = Array.isArray(owner) ? owner : [owner]
        return this.resourceResolver
                    .resolveTextures(urls)
                    .then((result) => {
                        owners.forEach(owner => {
                            this.fire('readyResource', owner, { data: {datas: result.textures, type: 'texture' }})
                        })
                        return result
                    })
    }

    /**
     * 音声リソースを読み込みます。
     * @param urls URLの配列
     * @param owner  readyResourceEvent の発火の形でコールバックを受けるオブジェクト
     * @return Promise<Array<Hawl>>
     */
    loadSounds(urls, owner) {
        let owners = Array.isArray(owner) ? owner : [owner]
        return this.resourceResolver
                    .resolveSounds(urls)
                    .then((result) => {
                        owners.forEach(owner => {
                            this.fire('readyResource', owner, { data: {datas:result.sounds, type: 'sound' }})
                        })
                        return result
                    })
    }

    /**
     * stageの参照を取得します。
     */
    getStage() {
        return this.pixiApp.stage
    }

    /**
     * InputHandlerの参照を取得します。
     */
    getInput() {
        return this.inputHandler
    }

    /**
     * すべてのエンティティに対してイベントを発火します。
     * @param event
     * @param opt
     */
    fireEach(event, opts = {}) {
        let sender = opts.sender || this
        let data = opts.data || {}

        this.eventEmitter.fireEach(event, sender, data)
    }

    /**
     * イベントを発火します。
     * 
     * @param event
     * @param entity
     * @param data
     */
    fire(event, entity, opts = {}) {
        let sender = opts.sender || this
        let data = opts.data || {}
        this.eventEmitter.fire(event, entity, sender, data)
    }

    /**
     * キー入力
     * @param key
     */
    pushKey(key) {
        this.inputHandler.push(key)
    }

    /**
     * キーを離す
     * @param key
     */
    leftKey(key) {
        this.inputHandler.left(key)
    }

    /**
     * エンティティ準備完了イベント
     * @param ctx コンテキスト
     */
    readyEntityEvent(ctx) {
        // Do nothing for now.
    }

    /**
     * シーンを切り替えます。
     * 
     * @param newSeane 新しいシーン
     */
    switchSeane(newSeane) {
        const opts = {
            app : this,
        }

        if (this.seane) {
            this.fire('leaveSeane', this.seane, opts)
            this.removeEntity(this.seane)
        }

        this.seane = newSeane
        this.attachEntity(newSeane)
        this.fire('enterSeane', newSeane, opts)
    }
}

