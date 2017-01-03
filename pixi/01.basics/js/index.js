"use strict";

// Hello pixi.js
console.log(PIXI);

// グローバル変数の初期化処理
let g = {}; // グローバル変数をまとめるやつだよ。プロパティはあとで生やすよ。
const appConfig = {
  imgRoot : './resources/',
};

/**
 * 初期化処理
 */
function initialize() {
  // レンダラを初期化する
  const width = 256;
  const height = 256;
  const options = {
    antialias : true,
    transparent : true,
    resolution : 1,
  };
  let renderer = PIXI.autoDetectRenderer(width, height, options);

  // レンダラがデフォルトで持ってるview要素とかいうやつをbodyの子要素にぶちこむ
  document.body.appendChild(renderer.view);

  // ステージを作る
  let stage = new PIXI.Container();

  PIXI.loader
      .add([appConfig.imgRoot + 'logo.png'])
      .load(() => {
        g.spriteLogo = new PIXI.Sprite(PIXI.loader.resources[appConfig.imgRoot + 'logo.png'].texture);
        stage.addChild(g.spriteLogo);
        renderer.render(stage);
      });

  // レンダリング
  renderer.render(stage);
}

// 初期化処理
// Note: このコードは、index.jsがdeferまたはasyncオプション指定で読み込まれること（HTMLのパース終了後の実行）
//       を期待している。
initialize();
