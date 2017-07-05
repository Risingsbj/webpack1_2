
const webpack = require('webpack')
module.exports = {
    entry: './src/js/app.js',
    output: {//输出resolve
        path: __dirname+'/src/dist', //输出路径,绝对路径

        // path: path.resolve(__dirname,'src'),
        filename: 'bundle.js'//输出到dist的文件名称:bundle.js
    },
    module: {//模块
        rules: [{
            test: /\.js?$/,//以.js结尾就交给loader处理
            exclude: /node_modules/,//排除这个目录的文件,我们排除node_modules这里，因为否则所有外部lib也将通过babel，减慢编译速度。


            loader: 'babel-loader',//什么作用:转成浏览器目前可识别的代码,jsonloader转成浏览器识别的json,合种xxxloader作用都是转浏览器识别的格式
            //Loader 可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。这样，我们就可以通过 require 来加载任何类型的模块或文件，比如 CoffeeScript、 JSX、 LESS 或图片
        }]




    },
    plugins: [//插件  optimize:优化
        new webpack.optimize.UglifyJsPlugin({//您需要在工作流程中对捆绑包进行一些额外的处理。一个例子是将您的文件缩小，以便客户端可以更快地加载它。这可以用插件完成。我们将添加uglify插件到我们的配置： 
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ]
}

//这里每一个配置意思是什么,怎么写?
//真个运行逻辑是什么?