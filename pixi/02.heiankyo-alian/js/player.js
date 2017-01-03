'use strict';

/**
 * プレイヤーエンティティ
 */
class Player {
    
    constructor() {
        this.entityName = 'player';

        this.events = [
            'preUpdate',
            'update',
            'postUpdate',
            'draw',
            'attack',
        ];

        this.drawable = false;
    }

    /**
     * 事前updateイベント
     * @param ctx
     */
    preUpdate(ctx) {
        
    }

    /**
     * updateイベント
     * @param ctx
     */
    update(ctx) {
        
    }

    /**
     * 事後updateイベント
     * @param ctx
     */
    preUpdate(ctx) {
        
    }

    /**
     * 描画イベント
     * @param ctx
     */
    draw(ctx) {
        
    }

    /**
     * 攻撃受けたイベント
     */
    attack(ctx) {

    }
}