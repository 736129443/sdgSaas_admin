// 由于 webpack 是基于Node进行构建的，所有，webpack的配置文件中，任何合法的Node代码都是支持的
var path = require('path')
// 在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注入到页面底部
// 如果要配置插件，需要在导出的对象中，挂载一个 plugins 节点
var htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');
// 当以命令行形式运行 webpack 或 webpack-dev-server 的时候，工具会发现，我们并没有提供 要打包 的文件的 入口 和 出口文件，此时，他会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个 配置对象，然后根据这个对象，进行打包构建
module.exports = {
    entry: path.join(__dirname, './src/main-dev.js'), // 入口文件
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'assets/js/[name]-[hash].js',
        chunkFilename:'assets/js/[name]-[hash].js',
        // publicPath: './'
    },
    devServer: {
        // contentBase: path.resolve(__dirname,'../dist'),
        compress: true,
        overlay:true,
        publicPath: '/',
    },
    mode:'development',
    plugins: [ // 所有webpack  插件的配置节点
        new CleanWebpackPlugin(["dist"],
            {
                root: path.resolve(__dirname, './'),       　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false      　　　　　　　　　　//启用删除文件
        }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), // 指定模板文件路径
            filename: 'index.html' // 设置生成的内存页面的名称
        }),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, './assetsFolder'),
                to: 'assets',
                ignore: ['.*']
            }
        ])
    ],
    module: { // 配置所有第三方loader 模块的
        rules: [ // 第三方模块的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 处理 CSS 文件的 loader
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 处理 less 文件的 loader
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理 scss 文件的 loader
            {
                // loader:'file-loader',
                test:/\.(jpg|png|gif|bmp|jpeg)$/,
                use:[{
                    loader:'url-loader',
                    options:{ // 这里的options选项参数可以定义多大的图片转换为base64
                        limit:10*1024, // 表示小于10kb的图片转为base64,大于10kb的是路径
                        outputPath:'assets/images/',//定义输出的图片文件夹
                        name:"[name]-[hash:16].[ext]",
                        useRelativePath:true
                    }
                }]
            },
            // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
            { test: /\.vue$/, use: 'vue-loader' }, // 处理 .vue 文件的 loader
            // {
            //     test:/\.html$/,
            //     use:"html-withimg-loader"
            // }
        ]
    },
    resolve: {
        alias: { // 修改 Vue 被导入时候的包的路径
            // "vue$": "vue/dist/vue.js"
        }
    },
    externals: {
        'AMap': 'AMap',
        'AMapUI': 'AMapUI'
    }
};
console.log(  path.resolve(__dirname,'dist'));