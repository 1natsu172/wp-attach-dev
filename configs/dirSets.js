//// DirectorySettings
// Preset directory base folder : RelativePATH from config-files.

const DIRBASE = {
  domain: 'wp-theme-devpack.dev', //Set Local Domain
  wordpressThemesFolder: './app/public/wp-content/themes/', //Set WordPress Themes folder directory
  developThemeName: 'twentyseventeen/', //Set your develop theme folder name
  buildFolder: 'build/', //for Before compiling directory
  srcAssets: 'customizingAssets', //for Before compiling directory
  destAssets: 'customizedAssets', //for Before compiling directory
}

//Do export "DIR lists"
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
