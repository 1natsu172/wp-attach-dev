'use strict';

import { DIR } from './dirSets.js'; // Directory config of project
import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import commonConfig from './webpack-common.config.babel.js';


// js処理config(commonConfigとマージする)
let jsConfig = webpackMerge(commonConfig, {
    entry: {
      scripts: DIR.src.assets+"/js/scripts.js"
    },
    output: {
      filename: "[name].js"
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({sourceMap: true})
    ]
  });

// 作成したconfig変数を使用する(複数configあるなら配列でmodule.exportsする)
module.exports = jsConfig;

// console.log(JSON.stringify(jsConfig, null, 2));
// console.log(jsConfig);
