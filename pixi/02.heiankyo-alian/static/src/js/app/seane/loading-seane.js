'use strict'

import * as PIXI from 'pixi.js'

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

        this.app = args.app
        this.perProgress = 0

        this.countRequired = 0
        this.countReady = 0

        let fnAppendLoadingRecursive = (target) => {
            if (!target)
                return
            
            this.appendLoading(target)
            if (this.nextSeane.prototype.dependentEntities) {
                let dependentEntities = this.nextSeane.prototype.dependentEntities
                for (let name in dependentEntities) {
                    let entityClass = dependentEntities[name]
                    fnAppendLoadingRecursive(entityClass)
                }
            }
        }
        fnAppendLoadingRecursive(this.nextSeane.prototype)
    }

    /**
     * 対象のEntityのリソースを読み込みます。
     * 読み込み後、EntityにresourceReadyイベント、AppにentityReadyイベントを通知します。
     * @param entity 対象のEntity
     * @return Promise
     */
    appendLoading(entityClass) {
        if (!entityClass || !entityClass.resources) {
            return
        }

        let resources = entityClass.resources()

        let readyResourcesCtx = {data : {} }
        let promises = []
        let owners = [entity, this]
        if (resources.images) {
            let promise = 
                this.app.loadImages(resources.images, owners)
                    .then((images) => {
                        readyResourcesCtx.data.images = images
                        this.countReady += images.length
                    })
            promises.push(promise)
        }

        if (resources.sounds) {
            let promise = 
                this.app.loadSounds(resources.sounds, owners)
                    .then((sounds) => {
                        readyResourcesCtx.data.sounds = sounds
                        this.countReady += sounds.length
                    })
            promises.push(promise)
        }

        this.countRequired += promises.length

        return Promise.all(promises)
                .then(() => {
                    this.app.fire('readyResource', entity, Object.assign(readyResourcesCtx, { app : this }))
                })
    }

    updateProgress() {
        if (!this.countRequired) {
            this.perProgress = 100
        } else {
            this.perProgress = ~~(this.countReady / this.countRequired * 100)
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

    enterSeaneEvent(ctx) {
        this.preInitGraphics()

        this.app.getStage().addChild(this.loadingText)
    }
    
    preInitGraphics() {
        if (!this.loadingText) {
            let loadingText = new PIXI.Text('Now Loading...',{fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'center'});
            loadingText.x = ~~(this.app.width - loadingText.width - 20)
            loadingText.y = ~~(this.app.height - loadingText.height  - 20)
            this.loadingText = loadingText
        }
    }

    leaveSeaneEvent(ctx) {
        this.app.getStage().removeChild(this.loadingText)
    }
}