GameSeaneのメモ

* 配下のクラスは全部メタってる（GameSeaneの型を知っている前提で実装されている）。

## イベント

### イベント一覧

共通イベント

| イベント    | 内容 |
|------------|------|
| preUpdate  | 事前updateイベント。1フレームごとにupdateを呼び出す前に呼び出される。他のエンティティのUpdateに干渉する前に、自身をupdateするために使う想定。 |
| update     | 逐次updateイベント。1フレームごとにPlayer、Alianなどのエンティティごとに逐次updateが呼び出されている状態。 |
| postUpdate | 事後updateイベント。1フレームごとにupdateを呼び出した後に呼び出される。 |
| draw       | 描画イベント。 |

エンティティ固有イベント

| イベント    | 受態    | 内容 |
|-------------|--------|------|
| attack      | Player | 攻撃を受ける。 |
| dropHole    | Alian  | 穴に落ちる。 |
| closeHole   | Alian  | 穴が閉じられる。 |
| escapeEnemy | Holl   | 穴から脱出される。 | 
| digHoll     | Holl   | 穴を掘る。 |
| fillHoll    | Holl   | 穴を埋める。 |

### イベントのctx設定値一覧

| 設定値     | データ型   | 内容 |
|------------|-----------|-----|
| app        | App       | Appのインスタンス。    |
| parent     | GameSeane | GameSeaneのインスタンス。 |
| sender     | any       | イベントを発火したインスタンス。・・・とする規約。呼び出しAPIに指定したオブジェクトがそうなる。 |
| data       | any       | イベント発火する際に任意で渡されたデータ。 |
| input      | any       | (入力キー => キー入力状態ビット配列) の連想配列 |
