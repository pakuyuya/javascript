'use strict';

/**
 * アプリケーション
 */
class App {

    /**
     * コンストラクタ
     */
    constructor(args) {
        this.entityName = 'App';

        this.events = [
            'readyEntity',
        ];
        
        const initArgs = { app : this };
        
        this.eventEmitter     = new EventEmitter(initArgs);
        this.inputHander      = new InputHandler(initArgs);
        this.resourceResolver = new ResourceResolver(initArgs);

        this.seane = null;
        this.entityInfos = {};
        this.entityCount = 0;
        this.notReadyEntityCount = 0;
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
        );

        this.switchSeane(new config.defaultSeane({app : this}));
    }

    /**
     * エンティティを追加します。
     * @param entity エンティティ
     */
    attachEntity(entity) {
        this.entityCount++;
        this.notReadyEntityCount++;
        this.entityInfos.push({
            entity : entity,
            ready : false,
            asking : false,
        });

        // register event
        this.eventEmitter.attacheEntity(entity);
    }

    /**
     * 全エンティティのリソースの読み込みを開始します。
     */
    loadAllAttachedEntity() {
        for (let entityInfo of this.entityInfos) {
            if (!entityInfo.ready) {
                this.loadEntityResources(entityInfo);
            }
        }
    }

    /**
     * 対象のEntityのリソースを読み込みます。
     * 読み込み後、EntityにresourceReadyイベント、AppにentityReadyイベントを通知します。
     * @param entity 対象のEntity
     * @param entityInfo 対象のエンティティ情報。
     * @return Promise
     */
    loadEntityResources(entityInfo) {
        const entity = entityInfo.entity;

        entityInfo.asking = true;

        let readyResourcesCtx = {};
        let promises = [];
        if (entity.images) {
            let promise = this.resourceResolver
                              .resolveImages(entity.images)
                              .success((images) => {
                                  onloadParams.data.images = images;
                              });
            promises.push(promise);
        }
        if (entity.sounds) {
            let promise = this.resourceResolver
                              .resolveSounds(entity.sounds)
                              .success((sounds) => {
                                  onloadParams.data.sounds = sounds;
                              });
            promises.push(promise);
        }

        return promises
            .join(promises)
            .success(() => {
                this.notReadyEntityCount--;
                entityInfo.asking = false;
                entityInfo.ready = true;
                self.fire('readyResource', entity, Object.assign(readyResourcesCtx, { app : app }));
                self.fire('readyEntity', self, {app : app, entity: entity})
            });
    }

    /**
     * エンティティを取り除きます。
     * @param entity エンティティそのものかエンティティID
     */
    removeEntity(entity) {
        for (let idx in this.entityInfos) {
            if (this.entityInfos[idx].entity === entity) {
                delete this.entityInfos[idx];
                break;
            }
        }
        this.eventEmitter.removeEntity(entity);
    }

    /**
     * すべてのエンティティに対してイベントを発火します。
     * @param event
     * @param opt
     */
    fireEach(event, opts = {}) {
        let sender = opts.sender || app;
        let data = opts.data || {};

        this.eventEmitter.fireEach('event', snder, data);
    }

    /**
     * イベントを発火します。
     * 
     * @param event
     * @param entity
     * @param data
     */
    fire(event, entity, opts = {}) {
        let sender = opts.sender || app;
        let data = opts.data || {};
        this.eventEmitter.fire(event, entity, sender, data);
    }

    /**
     * エンティティ準備完了イベント
     * 
     * @param ctx コンテキスト
     */
    readyEntityEvent(ctx) {
        if ()
    }

    /**
     * シーンを切り替えます。
     * 
     * @param newSeane 新しいシーン
     */
    switchSeane(newSeane) {
        this.removeEntity(this.seane);
        this.attachEntity(this.seane);
        this.seane = newSeane;
    }
}
