const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  style: glob.sync('./app/**/*.css')
};

const common = {

  entry: {
    app: PATHS.app,
    style: PATHS.style
  },

  output: {
    path: PATHS.build,
    filename: '[name].js',
  },

  devServer: {
    // HTML5 History API를 사용하여 routing하게 하기
    historyApiFallback: true,

    // hot loading 않될시에도 browser reload하지 않기
    // 만약 refresh를 원한다면 hot: true 로 setting
    hotOnly: true,  
    stats: 'errors-only', // error만 log하기
    host: process.env.HOST, // 기본값`localhost`
    port: process.env.PORT  // 기본값  8080
  },

  // module: {
  //   rules: [
  //     {
  //       test: /\.css$|\.sass$|\.scss$/,
  //       use: ['style-loader', 'css-loader', 'sass-loader']
  //     }
  //   ]
  // },

  module: {
    rules: [
      {
        test: /\.css$|\.sass$|\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader', 
            {
              loader: 'postcss-loader',
              options: {
                plugins: function(){
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            }, 
            'sass-loader'
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),

    new HtmlWebpackPlugin({
      title: 'Webpack demo',
    }),

    new webpack.HotModuleReplacementPlugin(),
    
    new webpack.NamedModulesPlugin(),
  ],

};

module.exports = function(env){
  return common;
}



