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

        this.app = args.app
        this.perProgress = 0

        this.countRequired = 0
        this.countReady = 0

        this.loadEntityResources(this.nextSeane)

        if (this.nextSeane.entities) {
            for (let entity of this.nextSeane.entities) {
                this.loadEntityResources(entity)
            }
        }
    }

    /**
     * 対象のEntityのリソースを読み込みます。
     * 読み込み後、EntityにresourceReadyイベント、AppにentityReadyイベントを通知します。
     * @param entity 対象のEntity
     * @return Promise
     */
    loadEntityResources(entity) {
        if (!entity || !entity.resources) {
            return
        }

        let readyResourcesCtx = {data : {} }
        let promises = []
        let owners = [entity, this]
        if (entity.images) {
            let promise = 
                this.app.loadImages(entity.images, owners)
                    .then((images) => {
                        readyResourcesCtx.data.images = images
                        this.countReady += images.length
                    })
            promises.push(promise)
        }

        if (entity.sounds) {
            let promise = 
                this.app.loadSounds(entity.sounds, owners)
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
}