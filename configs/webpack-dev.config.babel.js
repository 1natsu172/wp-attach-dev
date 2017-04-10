'use strict';

import { DIR } from './dirSets.js'; // Directory config of project
import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import minimist from 'minimist';
import commonConfig from './webpack-common.config.babel.js';

const argv = minimist(process.argv.slice(2)); // parse arguments from CLI

// develop時のjs処理config(commonConfigとマージ)
let jsConfig = webpackMerge(commonConfig, {
    entry: {
      scripts: DIR.src.assets+"/js/scripts.js"
    },
    output: {
      filename: "[name].js",
    }
  });

// When in the lint mode, push the config object for lint
if (argv.SETMODE === 'lint') {
  jsConfig = webpackMerge(jsConfig, {
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
        }
      ]
    }
  })
}

// 作成したconfig変数を使用する(複数configあるなら配列でmodule.exportsする)
module.exports = jsConfig;

// console.log(JSON.stringify(jsConfig, null, 2));
console.log(jsConfig);
