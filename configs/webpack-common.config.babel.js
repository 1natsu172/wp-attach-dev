'use strict';

import { DIR } from './dirSets.js'; // Directory config of project
import path from 'path';
import webpack from 'webpack';
const CURRENT_WORKING_DIR = process.cwd();// nodeのカレントワーキングディレクトリをとる

const commonConfig = {
  devtool: "source-map",
  //モジュール解決のための設定
  resolve: {
    modules: [
      path.resolve(CURRENT_WORKING_DIR, DIR.src.assets+'/js/modules'),// 自前のJSmodulesディレクトリの解決
      'node_modules'// node_modulesディレクトリの解決
    ],
    alias: { // なにかしらaliasを張って入り組みがちなパス問題を解決する
      modernizr$: path.resolve(__dirname, ".modernizrrc")
    }
  },
  // モジュール
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ["env", {
              "targets": {
                "browsers": ["last 3 versions","not ie < 11"]
              },
              "modules": false,// Use Tree Shaking
            }]
          ],
          plugins: ["transform-runtime"]// transform-runtime polyfill
        }
      },
      {
        test: /\.modernizrrc(\.json)?$/,
        loader: "modernizr-loader!json-loader"
      }
    ]
  },
  // プラグイン
  plugins: [
    // ファイルを細かく分析し、まとめられるところはできるだけまとめてコードを圧縮する
    new webpack.optimize.AggressiveMergingPlugin(),
    // jQueryをグローバルに出す
    new webpack.ProvidePlugin({
      // Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
      // fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    //環境変数扱えるように定義する
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ])
  ]
};

// 作成したconfig変数を使用する(複数configあるなら配列でmodule.exportsする)
module.exports = commonConfig;
