import Modernizr from 'modernizr';
import WebFont from "webfontloader";
import ImagesLoaded from "imagesloaded";
import { TweenLite, TweenMax, TimelineMax, Elastic } from "gsap";
import foo from 'foo';
import { sum } from 'math';



// ここに処理を書いていく👇
$(() => {

  // Check behavior//*
  console.log($.fn);//OK
  console.log(Modernizr);//OK
  console.log(ImagesLoaded);//OK
  console.log(WebFont.load);//OK
  console.log(process.env.NODE_ENV);
  sum(1,2);// sub(),mul()の分はTreeShakingされるはず！！！！


});
