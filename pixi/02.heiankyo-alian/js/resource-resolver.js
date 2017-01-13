'use strict';

/**
 * リソースリゾルバ
 */
class ResourceResolver {
    
    /**
     * コンストラクタ
     */
    constructor(args) {
        this.baseurl = args.baseurl;
        this.cacheSnd = {};
    }

    /**
     * 画像のリソースを解決します。
     * @param resource リソースのURL
     * @param opt オプション
     * @return Promise(PIXI.Texture)
     */
    resolveImages(resources, opt) {
//        opt = Object.assign({}, opt);
        return new Promise((resolve, reject)=> {
            PIXI.loader
                .add(resources)
                .setup(() => {
                    const images = resources.map((resource, index, ary) => {
                        ary[resource] = PIXI.loader.resources[urlPath(this.baseurl, resource)].texture
                    });
                    resolve(images);
                });
        });
    }

    /**
     * 音声のリソースを解決します。
     * @param resources リソースURLの配列
     * @param opt オプション
     * @return Promise(Array<Howl>)
     */
    resolveSounds(resources, opt) {
        let promises = resorces.map((resource, index, ary) => {
            ary[resource] = new Promise((resolve, reject) => {
                const param = Object.assign({}, opt);
                ret.src = [urlPath(args.baseurl, resource)];
                resolve(new Howl(param));
            });
        });
        
        return Promise.join(promises);
    }
}