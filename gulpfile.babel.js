////import modules
import browserSync from 'browser-sync';
import del from 'del';
import runSequence from 'run-sequence';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import pleeease from 'gulp-pleeease';
import sourcemaps from 'gulp-sourcemaps';
import bourbon from 'node-bourbon';
import neat from 'node-neat';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackDevConfig from './configs/webpack-dev.config.babel.js'; // webpackDevelop設定ファイル
import webpackProductionConfig from './configs/webpack-production.config.babel.js'; // webpackProduction設定ファイル
import { DIR } from './configs/dirSets.js'; // Directory config of project


//// Tasks

// browserSync
gulp.task('browserSync', ()=> {
  browserSync.init({
    proxy: DIR.domain,
    ghostMode: {
    clicks: true,
    forms: true,
    // scroll: false
    }
  });
});


// reloading browsers
gulp.task('bS-reload', ()=> {
    browserSync.reload();
});


// simple copy task - if you want to copy, Add gulp.src & gulp.dest pipes as appropriate.
gulp.task('simpleCopy', ()=> {
  // WPビジュアルエディタの見た目用CSSををテーマフォルダ直下に配置する
  return gulp.src(DIR.src.assets+'/simpleCopyFiles/editor-style.css')
  .pipe(gulp.dest(DIR.dest.base))
  // WPテーマのプレビュー用スクショの配置
  // return gulp.src(DIR.src.assets+'/simpleCopyFiles/screenshot.png')
  // .pipe(gulp.dest(DIR.dest.base))
  .pipe(browserSync.stream())
});


// sass
gulp.task('sass', ()=> {
  return gulp.src(DIR.src.assets+'/sass/**/*.{sass,scss}')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sassGlob())
  .pipe(sass({
    includePaths: [
      bourbon.includePaths,
      neat.includePaths
    ],
    outputStyle: ':expanded'
  }).on('error', sass.logError))
  .pipe(pleeease({
    minifier: true,
    mqpacker: true,
    autoprefixer: {
      browsers: ["last 3 version", "last 4 ios_saf versions"]
    },
    rem: false
  }))
  .pipe(sourcemaps.write('./sourcemaps'))
  .pipe(gulp.dest(DIR.dest.assets+'/css'))
  .pipe(browserSync.stream())
});


// css - if you also want to use "CSS"(not SASS), please put it in the "css" folder in assets folder.
//     - So let's load the CSSfiles with the link tag, like the "<link rel="">".
gulp.task('css', ()=> {
  return gulp.src(DIR.src.assets+'/css/**/*.css')
  .pipe(gulp.dest(DIR.dest.assets+'/css'))
  .pipe(browserSync.stream())
});


// scripts Task -- develop
gulp.task('scripts', ()=> {
  return gulp.src(DIR.src.assets+'/js/*.js')
    .pipe(plumber())
    .pipe(webpackStream(webpackDevConfig, webpack)) // 第二引数は"webpack-stream"内包ではない任意のバージョンのwebpackを使う
    .pipe(gulp.dest(DIR.dest.assets+'/js'))
    .pipe(browserSync.stream())
});


// imageMin
gulp.task('imageMin', ()=> {
  return gulp.src(DIR.src.assets+'/images/**/*')
    .pipe(imagemin(
      [
      imagemin.gifsicle({
        optimizationLevel: 3,
        interlaced: true
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        removeViewBox: false
      })
      ],
      {
        verbose: true
      }
    ))
    .pipe(gulp.dest(DIR.dest.assets+'/images'))
    .pipe(browserSync.stream())
});


// watch
gulp.task('watch', ()=> {
  gulp.watch(DIR.dest.base+'/**/*.php', ()=> {
    gulp.start('bS-reload')
  });
  gulp.watch(DIR.src.assets+'/sass/**/*.{sass,scss}', ()=> {
    gulp.start('sass')
  });
  gulp.watch(DIR.src.assets+'/css/**/*.css', ()=> {
    gulp.start('css')
  });
  gulp.watch(DIR.src.assets+'/js/**/*.js', ()=> {
    gulp.start('scripts')
  });
  gulp.watch(DIR.src.assets+'/images/**/*', ()=> {
    gulp.start('imageMin')
  });
});


// default task
gulp.task('default', ()=> {
  runSequence(
    ['sass','scripts','imageMin','css','simpleCopy'],
    'browserSync',
    'watch'
  )
});



// Production Task - Do uglify etc…
gulp.task('prodClean', del.bind(null, [DIR.dest.assets+'/js'] ));
gulp.task('production', ['prodClean'], () => {
    // WebpackのProduction処理を行う
    gulp.src(DIR.src.assets+'/js/*.js')
      .pipe(plumber())
      .pipe(webpackStream(webpackProductionConfig, webpack)) // 第二引数は"webpack-stream"内包ではない任意のバージョンのwebpackを使う
      .pipe(gulp.dest(DIR.dest.assets+'/js'))
});
