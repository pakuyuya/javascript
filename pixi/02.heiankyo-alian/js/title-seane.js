'use strict';

/**
 * シーンエンティティ
 */
class TitleSeane {
    
    /**
     * コンストラクタ
     */
    constructor(args) {
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
     */
    readyResourceEvent(ctx) {
        // TODO:
    }
}