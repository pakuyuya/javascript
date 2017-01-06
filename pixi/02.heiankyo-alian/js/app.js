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
        // TODO:
    }

    /**
     * エンティティを保持します。
     * @param entity エンティティ
     */
    attachEntity(entity) {
        // TODO:
    }

    /**
     * エンティティを取り除きます。
     * @param entity エンティティそのものかエンティティID
     */
    removeEntity(entity) {
        // TODO:
    }

    /**
     * すべてのエンティティに対してイベントを発火します。
     */
    fireEach(event, data) {
        // TODO:
    }

    /**
     * イベントを発火します。
     * 
     * @param event
     * @param entity
     * @param data
     */
    fire(event, entity, data) {
        // TODO:
    }

    /**
     * サブシーンやエンティティにサブリソースを問い合わせします。
     * 
     * @return リソースリクエストリスト
     */
    askResources() {
        // TODO:
    }

    /**
     * リソースのリクエストを開始します
     * 
     * @param resourceRequests リソースリクエストリスト
     * @param options オプション
     */
    startLoadResources(resourceRequests, options) {
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
