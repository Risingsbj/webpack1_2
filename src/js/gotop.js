var $ = require('../lib/jquery-3.2.1.min.js')
GoTopFunction = (function () {

            GoTop = function () {
                this.ct = $('Body');
                this.target = $('<div class="iconfont iconfontCss"></div>');
                this.bindEvent();
                this.createNode();
            }

            GoTop.prototype = {
                bindEvent: function () {
                    this.target.on('click', function () {
                        $(window).scrollTop(0);
                    })
                },
                createNode: function () {
                    this.ct.append(this.target);
                }
            }
            return {
                init: function () {
                    new GoTop();
                }
            }

        })();
        // GoTopFunction.init();
module.exports = GoTopFunction;