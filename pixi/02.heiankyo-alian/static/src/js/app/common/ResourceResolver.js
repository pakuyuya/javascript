import common from './common'
import * as PIXI from 'pixi.js'

/**
 * リソースリゾルバ
 */
export default class ResourceResolver {
    
    /**
     * コンストラクタ
     */
    constructor(args) {
        this.baseurl = args.baseurl
        this.cacheSnd = {}
        this.pixiApp = args.pixiApp
    }

    /**
     * 画像のリソースを解決します。
     * @param urllist リソースのURL
     * @param opt オプション
     * @return Promise(PIXI.Texture)
     */
    resolveTextures(urllist, opt) {
        return new Promise((resolve, reject)=> {
            this.pixiApp.loader
                .add(urllist)
                .load((loader, resources) => {
                    let textures = urllist.map(url => new PIXI.TilingSprite(resources[url].texture))
                    resolve(textures)
                })
        })
    }

    /**
     * 音声のリソースを解決します。
     * @param urllist リソースURLの配列
     * @param opt オプション
     * @return Promise(Array<Howl>)
     */
    resolveSounds(urllist, opt) {
        let promises = urllist.map((url, index, ary) => {
            ary[url] = new Promise((resolve, reject) => {
                const param = Object.assign({}, opt)
                param.src = [common.resolveSoundResource(url)]
                resolve(new Howl(param))
            })
        })
        
        return Promise.all(promises)
    }
}