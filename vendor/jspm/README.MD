## jspmとは？

Nodejsで動くブラウザ向けJavaScript開発環境簡単構築ツールです。

以下を内包した、大富豪的な機能群を有しています。（ただし、使い方に誓約があります）

* 構成管理（NodeJSに似ている）
* Babel、TypeScriptといったトランスコンパイラ
* System.js（CommonJSに似た依存関係の解決機構。ES7で出るとか）の提供
* バンドラ（複数のjsファイルを１つのファイルに集約）

しかも、コマンド数個で実現できてしまう。果て無き夢の具現のようなツール。

## インストール

```
npm install -g jspm
```

## 使い方

```
jspm init
```

```
jspm install <module>
```

