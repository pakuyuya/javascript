'use strict'

/**
 * マップ
 */
export default class Map {

    /**
     * コンストラクタ
     */
    constructor(args) {
        this.entityName = 'Map'

        this.events = {
            'preUpdate'  : 50,
            'update'     : 50,
            'postUpdate' : 50,
            'draw'       : 50,
            'readyResource' : 50,
        }

        this.rowBlockSize = 18
        this.colBlockSize = 20
        this.pixPerBlock = 16
        this.pixByStep = 2

        this.randomWall = 8

        this.blockTable = undefined
        this.collisionSetMap = {}

        this.app = args.app
        this.drawable = false
    }

    initBlockTables () {
        let blockTable = Array(this.rowBlockSize)

        // fill default
        blockTable[0] = new Array(this.colBlockSize)
        for (let i = 0; i < this.colBlockSize; i++) {
            blockTable[0][i] = true
        }
        for (let i = 0; i < this.rowBlockSize; i++) {
            blockTable[i] = new Array(this.colBlockSize)
            for (let j = 0; j < this.colBlockSize; j++) {
                blockTable[i][j] = j % 3 !== 1
            }
        }
        blockTable[this.rowBlockSize - 1] = new Array(this.colBlockSize)
        for (let i = 0; i < this.colBlockSize; i++) {
            blockTable[this.rowBlockSize - 1][i] = true
        }

        // random wall
        
        let row_randwallnum = ~~(this.randomWall / 2) + this.randomWall % 2

        let wallNum = 0
        while (wallNum < row_randwallnum) {
            let rand_r = ~~(Math.random() * ~~((this.rowBlockSize - 6) / 3))
            let rand_c = ~~(Math.random() * ~~((this.colBlockSize - 3) / 3))

            // wall is already exists.
            if (blockTable[4 + rand_r * 3][2 + rand_c * 3]) {
                continue
            }

            // will make dead end
            let nearPassesL = [
                [4 + (rand_r) * 3, 2 + (rand_c-1) * 3],
                [2 + (rand_r) * 3, 4 + (rand_c-1) * 3],
                [2 + (rand_r+1) * 3, 4 + (rand_c-1) * 3],
            ]
            let nearPassesR = [
                [4 + (rand_r) * 3, 2 + (rand_c+1) * 3],
                [2 + (rand_r) * 3, 4 + (rand_c) * 3],
                [2 + (rand_r+1) * 3, 4 + (rand_c) * 3],
            ]

            let fnMakeDeadEnd = (passes) => {
                let blocked = 0
                for (let nearPass of nearPassesL) {
                    const r = nearPass[0]
                    const c = nearPass[1]
                    if (r < 2 || r > this.rowBlockSize - 3 || c < 2 || c > this.colBlockSize - 3) {
                        continue
                    }
                    if (!blockTable[r][c] && blocked > 0) {
                        return true
                    }
                    blocked++
                }
                return false
            }

            if (fnMakeDeadEnd(nearPassesL) || fnMakeDeadEnd(nearPassesR)) {
                continue
            }

            blockTable[4 + rand_r * 3][2 + rand_c * 3] = true
            wallNum++
        }
        
        let wallNum = 0
        while (wallNum < col_randwallnum) {
            let rand_r = ~~(Math.random() * ~~((this.rowBlockSize - 3) / 3))
            let rand_c = ~~(Math.random() * ~~((this.colBlockSize - 6) / 3))

            // wall is already exists.
            if (blockTable[2 + rand_r * 3][4 + rand_c * 3]) {
                continue
            }

            // will make dead end
            let nearPassesL = [
                [4 + (rand_r-1) * 3, 2 + (rand_c) * 3],
                [2 + (rand_r-1) * 3, 4 + (rand_c) * 3],
                [2 + (rand_r-1) * 3, 4 + (rand_c+1) * 3],
            ]
            let nearPassesR = [
                [4 + (rand_r+1) * 3, 2 + (rand_c) * 3],
                [2 + (rand_r) * 3, 4 + (rand_c) * 3],
                [2 + (rand_r) * 3, 4 + (rand_c+1) * 3],
            ]

            let fnMakeDeadEnd = (passes) => {
                let blocked = 0
                for (let nearPass of nearPassesL) {
                    const r = nearPass[0]
                    const c = nearPass[1]
                    if (r < 2 || r > this.rowBlockSize - 3 || c < 2 || c > this.colBlockSize - 3) {
                        continue
                    }
                    if (!blockTable[r][c] && blocked > 0) {
                        return true
                    }
                    blocked++
                }
                return false
            }

            if (fnMakeDeadEnd(nearPassesL) || fnMakeDeadEnd(nearPassesR)) {
                continue
            }

            blockTable[4 + rand_r * 3][2 + rand_c * 3] = true
            wallNum++
        }

        this.blockTable = blockTable
    }

    /**
     * 事前updateイベント
     * @param ctx
     */
    preUpdateEvent(ctx) {
        // TODO:
    }

    addCollisionEntity(entity) {
        if (!entity.collisions)
            return
        
        for (let key in entity.collisions) {
            let set = this.collisionSetMap[key] || []
            set.push(entity)
            this.collisionSetMap[key] = set
        }
    }

    clearCollisionEntities() {
        this.collisionSetMap = {}
    }

    getCollisions(entity, collisionType) {
        if (!this.collisionSetMap[collisionType])
            return
        
        let list = []

        for (let e of this.collisionSetMap[collisionType]) {
            if (e.isCollision(entity, collisionType)) {
                list.push(e)
            }
        }
        return list
    }

    clearCollisionEntities() {
        this.collisionSetMap = {}
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
    
    static resources = {
        images : [],
        sounds : [],
    }
}