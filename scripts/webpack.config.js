const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.resolve(__dirname, '..');

const NODE_ENV = process.env.NODE_ENV || 'production';


let webpackConfig = require('./webpack.config.common');

if(NODE_ENV === 'production') {
	webpackConfig.devtool = 'source-map';

} else {
  	webpackConfig.devtool = 'eval';
}

module.exports = webpackConfig;
