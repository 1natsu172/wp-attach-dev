```
___       __    ________   _________   ___  ___   _______    _____ ______    _______    ________   ___  ___   ________   _________   ________   _____ ______    ___   ________   _______    ________   _______    ___      ___  ________   ________   ________   ___  __       
|\  \     |\  \ |\   __  \ |\___   ___\|\  \|\  \ |\  ___ \  |\   _ \  _   \ |\  ___ \  |\   ____\ |\  \|\  \ |\   ____\ |\___   ___\|\   __  \ |\   _ \  _   \ |\  \ |\_____  \ |\  ___ \  |\   ___ \ |\  ___ \  |\  \    /  /||\   __  \ |\   __  \ |\   ____\ |\  \|\  \     
\ \  \    \ \  \\ \  \|\  \\|___ \  \_|\ \  \\\  \\ \   __/| \ \  \\\__\ \  \\ \   __/| \ \  \___| \ \  \\\  \\ \  \___|_\|___ \  \_|\ \  \|\  \\ \  \\\__\ \  \\ \  \ \|___/  /|\ \   __/| \ \  \_|\ \\ \   __/| \ \  \  /  / /\ \  \|\  \\ \  \|\  \\ \  \___| \ \  \/  /|_   
\ \  \  __\ \  \\ \   ____\    \ \  \  \ \   __  \\ \  \_|/__\ \  \\|__| \  \\ \  \_|/__\ \  \     \ \  \\\  \\ \_____  \    \ \  \  \ \  \\\  \\ \  \\|__| \  \\ \  \    /  / / \ \  \_|/__\ \  \ \\ \\ \  \_|/__\ \  \/  / /  \ \   ____\\ \   __  \\ \  \     \ \   ___  \  
 \ \  \|\__\_\  \\ \  \___|     \ \  \  \ \  \ \  \\ \  \_|\ \\ \  \    \ \  \\ \  \_|\ \\ \  \____ \ \  \\\  \\|____|\  \    \ \  \  \ \  \\\  \\ \  \    \ \  \\ \  \  /  /_/__ \ \  \_|\ \\ \  \_\\ \\ \  \_|\ \\ \    / /    \ \  \___| \ \  \ \  \\ \  \____ \ \  \\ \  \
  \ \____________\\ \__\         \ \__\  \ \__\ \__\\ \_______\\ \__\    \ \__\\ \_______\\ \_______\\ \_______\ ____\_\  \    \ \__\  \ \_______\\ \__\    \ \__\\ \__\|\________\\ \_______\\ \_______\\ \_______\\ \__/ /      \ \__\     \ \__\ \__\\ \_______\\ \__\\ \__\
   \|____________| \|__|          \|__|   \|__|\|__| \|_______| \|__|     \|__| \|_______| \|_______| \|_______||\_________\    \|__|   \|_______| \|__|     \|__| \|__| \|_______| \|_______| \|_______| \|_______| \|__|/        \|__|      \|__|\|__| \|_______| \|__| \|__|
                                                                                                                \|_________|                                                                                                                                                   
```

# WP_THEME_CUSTOMIZE_DEVPACK

## これはなに？

これはWordPressのテーマ開発のボイラープレートです！！！！！！！！！！！！！！！！

##### 方針

* テーマファイルは同梱していない構成です
  * テーマ開発スターターキットや既存のテーマに組み合わせて使うことができます
  * ローカル開発時にすばやくモダンな開発を行うことができます

* 生成されるアセット類の使いかたに関して
  * WPでなにかしら読めるようにする
    * テーマの<head>タグで愚直に読み込みするとか
    * functions.phpからwp_enque_scriptするとか

##### 構成

* Main
  * gulp
  * browsersync
  * sass
  * babel
  * webpack
  * eslint

* Libraries
  * bourbon
  * neat
  * gsap
  * imagesloaded
  * jquery
  * minireset.css
  * modernizr
  * webfontloader


##### 動作環境

* node: "^7.4.0"

**Vagrant+[VCCW](http://vccw.cc/)や[Local by Flywheel](https://local.getflywheel.com/)のような仮想開発環境がおすすめです。**

## ディレクトリ構成

```
.
├── build // ☆このフォルダが開発するときに実際に触っていくフォルダです
│   └── customizingAssets
│       ├── css ← 生のCSSを使いたい場合
│       ├── images ← 画像はここへ
│       ├── js ← JavaScriptのファイル群
│       ├── sass ← sassのファイル群
│       └── simpleCopyFiles ← なにか単純にコピーしたいファイルがある場合はここへ
├── configs ← 開発に必要なファイルを格納しています
│   ├── dirSets.js ← ☆フォルダ構成の設定ファイルです
│   ├── webpack-common.config.babel.js ← webpackの共通部分の設定ファイル
│   ├── webpack-dev.config.babel.js ← webpackの開発時用の設定ファイル
│   └── webpack-production.config.babel.js ← webpackのリリース時用の設定ファイル
├── gulpfile.babel.js ← gulpのタスク設定ファイル
├── package.json ← このパッケージの仕様書的なファイル
├── readme.md ← 今読んでるこの文書のファイル
└── yarn.lock ← yarnの依存関係がまとまっているファイル
```


## 開発前にやること

> ※例としてLocal by Flywheel想定の手順です

1. ローカル開発環境のプロビジョニングをする
	* WordPressの管理画面に入れてTwenty◯◯のテーマが表示されている状態
2. プロビジョニングしたローカルマシンのルートディレクトリへターミナルへ`cd`する
	* Local by flywheelならディレクトリの感じ、だいたいこんな感じなはず
		* ~/Local Sites/ローカルサイト名

```
$ cd ~/Local Sites/ローカルサイト名
```

3. git cloneする

```
$ git clone https://taitan.backlog.jp/git/ENGINEER_MEMO/WP_THEME_CUSTOMIZE_DEVPACK.git wp_devpack
$ cd wp_devpack
```

4. node_modulesをインストール

```
$ yarn install
```
> yarn入ってないなら`npm install`でもOK

5. /configs/dirSets.jsを開いてパスの変更

基本的に`const DIRBASE`の以下のみ変更でOKなはず

* DIRBASE.domain
* DIRBASE.wordpressThemesFolder
* DIRBASE.developThemeName

> コメント書いてあるので適宜変更してください

6. 開発前段階はこれで終わり


## 開発していくぞ！！！！

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

#### 以降はよしなに

ごりごりテーマ開発していきましょう！！  
テーマファイルの.phpファイルを編集して`⌘+S`すれば勝手にリロードされてWP開発を進められるはずです！！

***

# おまけ

## 吐かれたJSをfunctions.phpからdefer付与して読みたいときのコードスニペット

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

> こんな感じでやるとdeferついた`<script>`タグが出力されてハッピ〜〜

## ちなみにプロジェクトまるごとgit管理するなら

[https://taitan.backlog.jp/git/ENGINEER_MEMO/GITIGNORE/tree/master](https://taitan.backlog.jp/git/ENGINEER_MEMO/GITIGNORE/tree/master)

> git集のなかに[WP_THEME_CUSTOMIZE_DEVPACK.gitignore]があるので使いましょう！！!
