'use strict';

/**
 * シーンエンティティ
 */
class TitleSeane {
    
    /**
     * コンストラクタ
     */
    constructor(args) {
        this.synonym = Symbol()

        this.entityName = 'TitleSeane';

        this.events = {
            'preUpdate'  : 50,
            'update'     : 50,
            'postUpdate' : 50,
            'draw'       : 50,
            'readyResource' : 50,
        };


        this.resources = {
            images : [],
            sounds : [],
        }

        this.app = args.app;
        this.drawable = false;

        this.entities = {};
    }

    /**
     * エンティティをAttachする
     */
    attachEntity(entity) {
        const key = Symbol();
        entity['$$hk' + this.entityName] = key;
        this.entities[key] = entity;

        this.app.attachEntity(entity);
    }

    removeEntity(entity) {
        const key = entity['$$hk' + this.entityName];
        if (key) {
            delete this.entities[key];
        }
        this.app.detachEntity(entity);
    }

    removeAllEntities() {
        for (const entity of this.entities) {
            removeEntity(entity);
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
        // TODO:
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
        preInitGraphics()

        if (!this.app[this.synonym]) {
            attachApp()
            this.app[this.synonym] = true
        }
    }

    /**
     * appに接続しリソースを初期化する
     */
    attachApp() {
        this.stage.addChild(this.loadingBG)
    }

    preInitGraphics() {
        if (!this.loadingBG) {
            let loadingBG = new PIXI.Graphics();
            loadingBG.beginFill(0x555555)
            loadingBG.drawRect(0, 0, this.app.width, this.app.height)
            loadingBG.endFill()
            this.loadingBG = loadingBG
        }
    }


    /**
     * シーン終了イベント
     * @param ctx
     */
    leaveSeaneEvent(ctx) {
        if (this.app[this.synonym]) {
            detachApp()
            this.app[this.synonym] = false
        }
    }

    /**
     * appから接続解除する際リソースを取り除く
     */
    detachApp() {
        this.stage.removeChild(this.loadingBG)
        this.removeAllEntities()
    }
}