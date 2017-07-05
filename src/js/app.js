// define(['jquery','addmore','carousel','gotop'],//从哪调
// 	function($,AddMore,Carousel,GoTop){
// 		Carousel.init($('.carousel'))
// 		GoTop.init()
// 		AddMore.init($('.btnMore'))
//         // Fn.init();
// })

//运行逻辑
//第三步
//define语法
// define([
// 	'require',
// 	'dependency'
// ], function(require, factory) {

// });
//define:定义模块
//定义app.js对应的模块名应该传入哪个参数,这个参数也是html里的对应标签的class名字
//提前定义好配置的路径,供app.js里调用.


//webpack方式

//为什么有main.js这文件
var $ = require('../lib/jquery-3.2.1.min.js')
var Carousel = require('./carousel.js')
var GoTop = require('./gotop.js')
var AddMore = require('./addmore.js')


Carousel.init($('.carousel'))
GoTop.init()
AddMore.init($('.btnMore'))

