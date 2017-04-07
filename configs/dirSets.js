//// ディレクトリ構成定義しましょう

const DIRBASE = {
  domain: 'wp-theme-devpack.dev', //サイトのドメインを適宜定義しましょう：http://ナシの接尾'/'ナシ
  wordpressThemesFolder: './app/public/wp-content/themes/', // WPのthemesフォルダまでのパスを定義しましょう：ルートディレクトリ(gulpfileなどがあるディレクトリ)から相対パス始まりの接尾'/'アリ
  developThemeName: 'twentyseventeen/', // 開発したいテーマのフォルダを指定しましょう：接尾'/'アリ
  buildFolder: 'build/', // テーマフォルダに配置する自前の開発用ソースのフォルダを指定しましょう。特別変更する必要なければデフォルトのままでOKです：接尾'/'アリ
  srcAssets: 'customizingAssets', // buildフォルダ内のアセットフォルダの名前を指定します。特別変更する必要なければデフォルトのままでOKです：接尾'/'ナシ
  destAssets: 'customizedAssets', // 吐き出されるコンパイル後のアセットフォルダの名前を指定します。特別変更する必要なければデフォルトのままでOKです：接尾'/'ナシ
}

// DIRBASEで設定したディレクトリ構成を元にディレクトリパスを定義します。
// そして色んな場所でフォルダ構成を使えるように、モジュールエクスポートするやつです。
export const DIR = {
  domain: DIRBASE.domain,
  wpThemes: DIRBASE.wordpressThemesFolder,
  devTheme: DIRBASE.wordpressThemesFolder + DIRBASE.developThemeName,
  src: {
    base: DIRBASE.wordpressThemesFolder + DIRBASE.developThemeName + DIRBASE.buildFolder,
    assets: DIRBASE.wordpressThemesFolder + DIRBASE.developThemeName + DIRBASE.buildFolder + DIRBASE.srcAssets
  },
  dest: {
    base: DIRBASE.wordpressThemesFolder + DIRBASE.developThemeName,
    assets: DIRBASE.wordpressThemesFolder + DIRBASE.developThemeName + DIRBASE.destAssets
  }
}
