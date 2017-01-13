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
        const self = this;
        this.eventEmitter.attacheEntity(entity);

        let onloadParams = { app : this };
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

        promises
            .join(promises)
            .success((resolve, reject) => {
                self.fire('readyResource', entity, opt);
            });
    }

    /**
     * エンティティを取り除きます。
     * @param entity エンティティそのものかエンティティID
     */
    removeEntity(entity) {
        this.eventEmitter.removeEntity(entity);
    }

    /**
     * すべてのエンティティに対してイベントを発火します。
     */
    fireEach(event, opt = {}) {
        let sender = opt.sender || app;
        let data = opt.data || {};

        this.eventEmitter.fireEach('event', snder, data);
    }

    /**
     * イベントを発火します。
     * 
     * @param event
     * @param entity
     * @param data
     */
    fire(event, entity, opt = {}) {
        let sender = opt.sender || app;
        let data = opt.data || {};
        this.eventEmitter.fire(event, entity, sender, data);
    }

    /**
     * サブシーンやエンティティにサブリソースを問い合わせします。
     * 
     * @param opts オプション
     * @return リソースリクエストリスト
     */
    askResources(enitity, opts = {}) {
    }

    /**
     * リソースのリクエストを開始します
     * 
     * @param resourceRequests リソースリクエストリスト
     * @param opts オプション
     */
    startLoadResources(resourceRequests, opts = {}) {
        // TODO: 
    }

    /**
     * エンティティ準備完了イベント
     * 
     * @param ctx コンテキスト
     */
    readyEntityEvent(ctx) {
        // TODO:
        // 例えばリソースロードが 90% いったら次いってみようみたいな
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
