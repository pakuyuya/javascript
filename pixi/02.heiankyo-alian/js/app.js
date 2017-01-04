'use strict';

/**
 * アプリケーション
 */
class App {

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
     */
    entityReadyEvent(ctx) {
        // TODO:
        // 例えばリソースロードが 90% いったら次いってみようみたいな
    }
}