# wp-attach-dev

## これはなに？

WordPressのテーマ開発をすばやくやるためのボイラープレートです

### 方針

#### テーマファイルは同梱していない構成です

* テーマ開発スターターキット(_sのようなテーマ)や既存のテーマやDLしてきたテーマなどと組み合わせて使います
  - これらテーマを骨組み的な役割として扱います

#### アタッチメントの思想でアセット類は上書きベースで開発します

* phpファイル自体は上記の既存テーマやスターターキットテーマを利用
* 骨組みのテーマのスタイルなどはいじらず、アセット類(css/js/images)は本リポジトリのものを使用
  - 開発テーマフォルダ内にアセットが吐き出されるので、これらを使うようにします

#### 生成されるアセット類の使いかたに関して

* WPでなにかしらをして読めるようにする
  * テーマの<head>タグで愚直に読み込みするとか
  * functions.phpからwp_enque_scriptするとか

### 構成

#### devDependencies
  * gulp
  * browsersync
  * sass
  * babel
  * webpack
  * eslint


#### dependencies
  * bourbon
  * neat
  * gsap
  * imagesloaded
  * jquery
  * minireset.css
  * modernizr
  * webfontloader


### 動作環境

* node: "^7.4.0"

**Vagrant+[VCCW](http://vccw.cc/)や[Local by Flywheel](https://local.getflywheel.com/)のような仮想開発環境がおすすめです。**


## ディレクトリ構成

```
.
├── build // ⭐️このフォルダが実際に触っていくフォルダです
│   └── customizingAssets
│       ├── css ← 生のCSSを使いたい場合はここへ
│       ├── images ← 画像はここへ
│       ├── js ← JavaScriptのファイル群
│       ├── sass ← Sassのファイル群
│       └── simpleCopyFiles ← なにか単純にテーマフォルダ内にコピーしたいファイルがある場合はここへ
├── configs
│   ├── dirSets.js ← ⭐️フォルダ構成の設定ファイルです
│   ├── webpack-common.config.babel.js ← webpackの共通部分の設定ファイル
│   ├── webpack-dev.config.babel.js ← webpackの開発時用の設定ファイル
│   └── webpack-production.config.babel.js ← webpackのリリース時用の設定ファイル
├── gulpfile.babel.js ← gulpのタスク設定ファイル
├── package.json
├── readme.md ← 今読んでるこの文書のファイル
└── yarn.lock
```


## 開発前にやること

> ※例としてLocal by Flywheel想定の手順です

### 1.ローカル開発環境をプロビジョニングする
* WordPressの管理画面にログインできて、Twenty◯◯のテーマが表示できている状態

### 2.プロビジョニングしたローカルマシンのルートディレクトリへターミナルへ`cd`する
* Local by flywheelならディレクトリの感じ、だいたいこんな感じなはず
	* ~/Local Sites/ローカルサイト名

```
$ cd ~/Local Sites/ローカルサイト名
```

### 3.git cloneする

```
$ git clone https://github.com/1natsu172/wp-attach-dev.git
$ cd wp-attach-dev
```

### 4.node_modulesをインストール

```
$ yarn install
```
> yarn入ってないなら`npm install`でもOK

### 5. `/configs/dirSets.js`を開いてパスの変更

基本的に`let DIRBASE`オブジェクトの以下のみ変更でOKなはず

* DIRBASE.domain
* DIRBASE.wordpressThemesFolder
* DIRBASE.developThemeName

> コメント書いてあるので適宜変更してください

### 6.開発前段階はこれで終わり 👍🏻


## 開発していきましょう

### 開発時

```
$ npm run dev
```

### 開発時(ESLintモード:ESLintしながら開発するとき)

```
$ npm run dev:lint
```

### リリース時

```
$ npm run production
```
> 開発時のcustomizedAssetsをproductionの処理をかけたもので上書き出力する仕様になっています

#### うまくいけそうか確認しましょう

テーマファイルのなんらかの.phpファイルを編集して保存(`⌘+S`)すれば自動でリロードされてWPテーマ開発を進められるはずです！🌟

Finder(エクスプローラ)でテーマフォルダを見るとcustomizedAssetsフォルダができていると思います。各自読み込んで開発しましょう！🌟

***

# ちなみに

## wp-attach-devで生成したJSをfunctions.phpからdefer付与して読み込みたいときのコードスニペット

```
// script読むファンクション
function customized_scripts() {
  wp_enqueue_script( 'customized_script', get_stylesheet_directory_uri() . '/customizedAssets/js/scripts.js');
}
add_action( 'wp_enqueue_scripts', 'customized_scripts' );

// scriptタグにdeferつけるファンクション
function add_defer_attribute($tag, $handle) {
   // add script handles to the array below
   // 複数のwp_enqueにdeferしたいならarrayに該当の$handleを足す
   $scripts_to_defer = array('customized_script');

   foreach($scripts_to_defer as $defer_script) {
      if ($defer_script === $handle) {
         return str_replace(' src', ' defer src', $tag);
      }
   }
   return $tag;
}
add_filter('script_loader_tag', 'add_defer_attribute', 10, 2);
```

> deferがついた`<script>`タグが出力されて便利

## ちなみにプロジェクトまるごとgit管理するなら

ここのgitignoreを使いましょう

> (たいていの場合`git clone`したディレクトリに置くことになります)
> (Local by Flywheelなら`~/Local Sites/ローカルサイト名`直下に置く)
