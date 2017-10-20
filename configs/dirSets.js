import path from 'path';

//// ディレクトリ構成定義しましょう
let DIRBASE = {
  domain: 'wp-testsite.dev', //サイトのドメインを適宜定義しましょう：'http://'はナシ
  wordpressThemesFolder: '../app/public/wp-content/themes', // WordPressの(wp-content内にある)'themes'フォルダまでのパスを定義しましょう：ルートディレクトリ(gulpfile.jsなどがあるディレクトリ)から相対パスで記述
  developThemeName: 'twentyseventeen', // 開発を行なっていきたいWordPressのテーマフォルダ名を指定しましょう：twentyseventeenなら'twentyseventeen'
  buildFolder: 'build', // 本開発キット同梱のビルドフォルダを指定しましょう。特別変更する必要なければデフォルトのままでOKです
  srcAssets: 'customizingAssets', // 本開発キット同梱のビルドフォルダ内にあるアセットフォルダの名前を指定します。特別変更する必要なければデフォルトのままでOKです。
  destAssets: 'customizedAssets', // テーマフォルダ内に吐き出されるコンパイル後のアセットフォルダの名前を指定しましょう。特別変更する必要なければデフォルトのままでOKです。
};

function deleteFulfillString(string, regex) {
  if (regex.test(string)) {
    return string.replace(regex, "");
  } else {
    return arguments[0];
  }
};

const regex_httpProtocol = /^(http.?:\/{2})/im;

function adjustToRelativePath() {
  return DIRBASE.buildFolder = path.isAbsolute(DIRBASE.buildFolder) ? '.' + DIRBASE.buildFolder : './' + DIRBASE.buildFolder;
};


// DIRBASEで設定したディレクトリ構成を元にディレクトリパスを定義します。
// そして色んな場所でフォルダ構成を使えるように、モジュールエクスポートするやつです。
export default function dirSets(pathString) {
  const period = pathString || ''; // webpackは'./'形式の相対pathでないといけなく、gulp(3.9.1)は'./'形式の相対pathはNGなので引数で'./'を受け取れるようにする

  adjustToRelativePath();
  DIRBASE.domain = deleteFulfillString(DIRBASE.domain, regex_httpProtocol);

  return {
    domain: path.normalize(DIRBASE.domain),
    wpThemes: path.join(DIRBASE.wordpressThemesFolder),
    devTheme: path.join(DIRBASE.wordpressThemesFolder, DIRBASE.developThemeName),
    src: {
      base: period + path.join(DIRBASE.buildFolder),
      assets: period + path.join(DIRBASE.buildFolder, DIRBASE.srcAssets)
    },
    dest: {
      base: path.join(DIRBASE.wordpressThemesFolder, DIRBASE.developThemeName),
      assets: path.join(DIRBASE.wordpressThemesFolder, DIRBASE.developThemeName , DIRBASE.destAssets)
    }
  };
};
