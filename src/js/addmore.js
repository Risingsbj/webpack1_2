var $ = require('../lib/jquery-3.2.1.min.js')
AddMore = (function () {
    addMore = function ($btn) {
        this.init($btn);
        this.bind();
    }

    addMore.prototype = {
        init: function ($btn) {
            this.$btn = $btn;
            this.$newsCt = $('.news-ct');
            this.colsArr = [];
            this.newsWidth = 282;//设置新闻li的宽度//不设置没哟孤傲度
            this.pageIndex = 1;//不能等于0！！！等于0就重复了
            this.isrendered = true;//判断数据是否渲染完成
            this.num = 6;
            this.cols = parseInt(this.$newsCt.outerWidth(true) / this.newsWidth);
            for (var i = 0; i < this.cols; i++)
                this.colsArr[i] = 0;//初始化竖列高度
        },

        bind: function () {
            var _this = this;

            this.$btn.on('click', function () {//  ---->???
                if (_this.isrendered) {
                    _this.isrendered = false;
                    _this.checkNews();
                    _this.getNews();

                }
            })

        },

        checkNews: function () {
            var _this = this;
            if (_this.isVisible(_this.$btn) && _this.isrendered) {////
                return true;
            } else {
                return;
            };

        },

        getNews: function () {
            var _this = this;
            _this.isrendered = false;//开始获取数据
            $.ajax({
                //jsonp 接口参数： http://platform.sina.com.cn/slide/album_tech?jsoncallback=func&app_key=1271687855&num=3&page=4
                url: 'https://platform.sina.com.cn/slide/album_tech',
                type: 'get',
                dataType: 'jsonp',
                jsonp: 'jsoncallback',
                data: {
                    page: _this.pageIndex,
                    num: _this.num,
                    app_key: 1271687855
                }
                /*success: _this.func/*不行用这种:*/
            }).done(function (res) {
                _this.func(res)
            })
        },

        func: function (ret) {
            var _this = this;
            _this.htmls = ''//拼接
            for (var i = 0; i < ret.data.length; i++) {
                _this.htmls += '<li class="news"><a target="_blank" href=' + ret.data[i].cmnt_url;
                _this.htmls += '><img src=' + ret.data[i].img_url + '></a>';
                _this.htmls += '<h4>' + ret.data[i].short_name + '</h4>';
                _this.htmls += '<p>' + ret.data[i].short_intro + '</p></li>';
            }
            _this.render($(_this.htmls));//渲染到页面
            _this.pageIndex++;

        },

        render: function ($node) {
            var _this = this;
            $.each($node, function () {
                var that = $(this);
                that.find('img').on('load', function () {//等图片加载完再渲染元素，否则会导致元素重叠
                    _this.minValue = Math.min.apply(null, _this.colsArr);
                    _this.minIndex = _this.colsArr.indexOf(_this.minValue);
                    _this.$newsCt.append(that);
                    that.css({
                        left: _this.minIndex * that.outerWidth(true),
                        top: _this.minValue
                    })
                    _this.colsArr[_this.minIndex] += that.outerHeight(true);
                    _this.maxValue = Math.max.apply(null, _this.colsArr);//保存最长一列的高度，因为所有元素的都是absolute定位
                    _this.$newsCt.css('height', _this.maxValue);//把高度赋值给容器的高度
                    //容器内所有元素都绝对定位，不设置高度，btn元素始终在屏幕内，会一直触发getNews
                })
            })
            _this.isrendered = true;//渲染完成
        },

        isVisible: function (ele) {
            var _this = this;
            _this.windowHeight = $(window).height();
            _this.eleTop = ele.offset().top;
            _this.scrollTop = $(window).scrollTop();
            _this.eleHeight = ele.outerHeight(true);
            if (_this.scrollTop + _this.windowHeight > _this.eleTop) {
                return true;
            }
            return false;
        }

    }//prototype


    // new addMore($('.btn'))
    return {
        init: function ($btn) {
            new addMore($btn);
        }
    }
})();
// AddMore.init($('.btnMore'));
module.exports = AddMore;
