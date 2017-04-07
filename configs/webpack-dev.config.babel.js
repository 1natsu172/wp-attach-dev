'use strict';

import { DIR } from './dirSets.js'; // Directory config of project
import path from 'path';
import webpack from 'webpack';
import minimist from 'minimist';
import commonConfig from './webpack-common.config.babel.js';

const argv = minimist(process.argv.slice(2)); // parse arguments from CLI

// develop時のjs処理config(commonConfigとマージ)
const jsConfig = Object.assign({}, commonConfig, {
    entry: {
      scripts: DIR.src.assets+"/js/scripts.js"
    },
    output: {
      filename: "[name].js",
    }
  });

// When in the lint mode, push the config object for lint
if (argv.SETMODE === 'lint') {
  jsConfig.module.rules.push(
    {
      enforce: "pre",
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "eslint-loader",
    }
  )
}

// 作成したconfig変数を使用する(複数configあるなら配列でmodule.exportsする)
module.exports = jsConfig;
