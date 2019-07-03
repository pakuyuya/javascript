import EventEmitter from './common/EventEmitter'
import InputHandler from './common/InputHandler'
import ResourceResolver from './common/ResourceResolver'
import Timer from './common/IntervalTimer'

/**
 * アプリケーション
 */

export default class {
    /**
     * コンストラクタ
     */
    constructor(args = {}) {
        const self = this

        // これなんだっけ
        this.synonym = Symbol()

        // fps.
        this.fps = args.fps || 30

        // キーボードのマッピング。
        this.keyboardMap = {
            'z' : 'a',
            'x' : 'b',
            'allowup'    : 'up',
            'allowdown'  : 'down',
            'allowleft'  : 'left',
            'allowright' : 'right',
        }

        // 確かデバッグ用のフィールド
        this.entityName = 'App'

        // 受け付けるイベントの種別。EventEmitter参照
        this.events = [
            'readyEntity',
        ]
        
        const initArgs = {
            app : this,
            baseurl : (window.location.origin + '/' + window.location.pathname.replace('/?index.html$', ''))
        }
        
        // 各コア機能
        this.eventEmitter     = new EventEmitter(initArgs)
        this.inputHander      = new InputHandler(initArgs)
        this.resourceResolver = new ResourceResolver(initArgs)

        // 現在の描画シーン
        this.seane = null

        // レンダラなど
        this.stage = null

        // inputHandlerに追加
        this.attachEntity(this.inputHandler)

        // set events on window.
        if (!document.body[this.synonym]) {
            document.body.addEventListener('keydown', (ev) => {
                const key = ev.key.toLowerCase
                if (self.keyboardMap[key]) {
                    self.pushKey(self.keyboardMap[key])
                }
            })
            document.body.addEventListener('keyup', (ev) => {
                const key = ev.key.toLowerCase
                if (self.keyboardMap[key]) {
                    self.leftKey(self.keyboardMap[key])
                }
            })
            document.body[this.synonym] = true
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
        }, ~~(1000/this.fps))

        this.switchSeane(new config.defaultSeane({app : this}))
    }

    /**
     * エンティティを追加します。
     * @param entity エンティティ
     */
    attachEntity(entity) {
        this.eventEmitter.attachEntity(entity)
        this.loadEntityResources(entityInfo)
    }

    /**
     * エンティティを取り除きます。
     * @param entity エンティティそのものかエンティティID
     */
    removeEntity(entity) {
        // イベント
        this.eventEmitter.removeEntity(entity)
    }

    /**
     * 対象のEntityのリソースを読み込みます。
     * 読み込み後、EntityにresourceReadyイベント、AppにentityReadyイベントを通知します。
     * @param entity 対象のEntity
     * @return Promise
     */
    loadEntityResources(entity) {
        let readyResourcesCtx = {data : {} }
        let promises = []
        if (entity.images) {
            let promise = 
                this.loadImages(entity.images)
                    .success((images) => {
                        readyResourcesCtx.data.images = images
                    })
            promises.push(promise)
        }

        if (entity.sounds) {
            let promise = 
                this.loadSounds(entity.sounds)
                    .success((sounds) => {
                        readyResourcesCtx.data.sounds = sounds
                    })
            promises.push(this.loadSounds(entity.sounds))
        }

        return Primise.join(promises)
                .success(() => {
                    self.fire('readyResource', entity, Object.assign(readyResourcesCtx, { app : app }))
                    self.fire('readyEntity', self, {app : app, entity: entity})
                })
    }

    /**
     * 画像リソースを読み込みます。
     * @param urls URLの配列
     * @param owner  readyResourceEvent の発火の形でコールバックを受けるオブジェクト
     * @return Promise<Array<PIXI.texture>>
     */
    loadTextures(urls, owner) {
        return this.resourceResolver
                    .resolveImages(urls)
                    .then((textures) => {
                        if (owner) {
                            let data = {
                                presented: 'loadTextures',
                                resourceType: 'texture',
                                resource: textures
                            }
                            this.fire('readyResource', owner, {sender: this, data: data})
                        }
                        return textures
                    })
    }

    /**
     * 音声リソースを読み込みます。
     * @param urls URLの配列
     * @param owner  readyResourceEvent の発火の形でコールバックを受けるオブジェクト
     * @return Promise<Array<Hawl>>
     */
    loadSounds(urls) {
        return this.resourceResolver
                    .resolveSounds(urls)
                    .then((sounds) => {
                        if (owner) {
                            let data = {
                                presented: 'loadSounds',
                                resourceType: 'sound',
                                resource: sounds
                            }
                            this.fire('readyResource', owner, {sender: this, data: data})
                        }
                        return sounds
                    })
    }

    /**
     * すべてのエンティティに対してイベントを発火します。
     * @param event
     * @param opt
     */
    fireEach(event, opts = {}) {
        let sender = opts.sender || this
        let data = opts.data || {}

        this.eventEmitter.fireEach('event', snder, data)
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

        this.fire('leaveSeane', this.sean, opts)
        this.removeEntity(this.seane)
        
        this.seane = newSeane
        this.attachEntity(newSeane)
        this.fire('enterSeane', newSeane, opts)
    }
}
