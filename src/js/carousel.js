var $ = require('../lib/jquery-3.2.1.min.js')
Carousel = (function(){
             carousel = function($ct) {
                this.$ct = $ct;
                this.init();
                this.bind();
            }
            carousel.prototype = {
                init: function () {
                    
                    var $imgCt = this.$imgCt = this.$ct.find(".img-ct");
                    this.$imgCt.width(($(window).width()) *4);
                    this.$ct.find(".img-ct>li").width($(window).width());
                    // console.log('liwid:'+this.$ct.find(".carousel>.img-ct>li").width($(window).width()))
                    var $btnPre = this.$btnPre = this.$ct.find(".btn-pre");
                    var $btnNext = this.$btnNext = this.$ct.find(".btn-next");
                    var $bullet = this.$bullet = this.$ct.find(".bullet");
                    this.isAnimal = true;
                    var $firstLi = $imgCt.children('li').first().clone();
                    var $lastLi = $imgCt.children('li').last().clone();
                    var imgWidth = this.imgWidth = $imgCt.children('li').width();//拿到300
                    //.css(width) 和 .width()之间的区别是后者返回一个没有单位的数值（例如，400），前者是返回带有完整单位的字符串（例如，400px
                    var imgCount = this.imgCount = $imgCt.children('li').length;//4
                    $imgCt.append($firstLi);//首部加最后一张
                    $imgCt.prepend($lastLi);//尾部加第一张//此时有6张图片
                    //重设$imgCt宽度//1800才对
                    $imgCt.width(imgWidth * (2 + imgCount));//1800px
                    //改变图片初始位置
                    $imgCt.css({ left: -imgWidth });//不写这句初始显示排在第一的第四张图片,写了显示第2张
                },
                bind: function () {
                    var _this = this;
                    //点击上一张事件
                    this.$btnPre.on('click', function (e) {
                        //判断锁
                        if (_this.isAnimal === false) { return };
                        _this.isAnimal = false;
                        _this.btnPre();
                    })
                    //点击显示下一张
                    this.$btnNext.on('click', function () {
                        //判断锁
                        if (_this.isAnimal === false) { return };
                        _this.isAnimal = false;
                        _this.btnNext();
                    })
                    //点击小圆点切换图片
                    this.$bullet.children('li').on('click', function () {
                        //取点击bullet的li索引
                        _this.idx = $(this).index();//0-3
                        // console.log('idx:'+idx);
                        _this.$imgCt.animate({ left: - _this.imgWidth * (_this.idx + 1) }, 500, function () {
                            _this.bullet(_this.idx);//0-3
                        })
                    })
                },
                //封装
                btnPre: function () {
                    var _this = this;
                    // 根据left值判断
                    _this.imgCtLeft = _this.$imgCt.css('left');
                    //imgCt右移一个单位
                    _this.$imgCt.animate({ left: '+=' + _this.imgWidth }, 500, function () {
                        _this.idx = Math.abs(parseInt(_this.imgCtLeft) / parseInt(_this.imgWidth));//
                        //  console.log('idx:'+(idx-2));
                        _this.idx = _this.idx - 2
                        _this.bullet(_this.idx);
                        //偏移完毕开锁
                        _this.isAnimal = true;
                        // console.log('点击第一次imgCtLeft'+imgCtLeft);//0
                        if (parseInt(_this.imgCtLeft) === -_this.imgWidth) {//初始位置点击上一张时
                            // console.log('满足条件');
                            //迅速切换到第四张图
                            _this.$imgCt.css({ left: -_this.imgWidth * _this.imgCount })
                            _this.idx = 3
                            _this.bullet(_this.idx);
                        }
                    })
                },
                //封装
                btnNext: function () {
                    var _this = this;
                    //imgCt的left
                    _this.imgCtLeft = _this.$imgCt.css('left');//带px
                    _this.$imgCt.animate({ left: '-=' + _this.imgWidth }, 500, function () {
                        //位移的绝对值,除以图宽,转为图片索引
                        _this.idx = Math.abs(parseInt(_this.imgCtLeft) / parseInt(_this.imgWidth));//
                        //  console.log('idx:'+idx);
                        _this.bullet(_this.idx);
                        _this.isAnimal = true;
                        if (parseInt(_this.imgCtLeft) === -_this.imgWidth * _this.imgCount) {//在第5张时点击显示第六张时
                            // 不加锁会出现left偏大而白屏
                            //迅速右移到第二张
                            _this.$imgCt.css({ left: -_this.imgWidth })
                            _this.idx = 0
                            _this.bullet(_this.idx);
                        }
                    })
                },
                //bullet随图片变灰
                bullet: function (idx) {
                    var _this = this;
                    _this.$bullet.children('li').siblings().removeClass('active');
                    _this.$bullet.children('li').eq(_this.idx).addClass('active');
                    // console.log('_this.idx:' + idx)
                }
            }//Carousel
            // new Carousel($('.carousel'))
            return {
                init: function ($ct) {
                    new carousel($ct);
                }
            }
       })();
    //    Carousel.init($('.carousel'));

module.exports = Carousel;