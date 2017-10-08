const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');
const debug = process.env.NODE_ENV == 'development' ? true : false
module.exports = {
  	entry: {
		  index: './src/index.js'
	},
  	output: {
    	filename: '[name].bundle.js',
    	path: path.resolve(__dirname)
	  },
	  module: {
		rules: [{
			test : /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['react', 'es2015','stage-3']
			}
		},{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use		: "css-loader",
			})
		},{
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			use: [
				'file-loader'
			]
		}]
	},
	plugins:(() => {
		if( debug ){
			return [
				new ExtractTextPlugin("[name].bundle.css"),
				new PurifyCSSPlugin({
					paths :	glob.sync(path.join(__dirname, 'src/**/*.js'))
				})
			];
		}
		return [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new webpack.optimize.OccurrenceOrderPlugin(),
			new webpack.optimize.UglifyJsPlugin({minimize: true,comments: false}),
			new ExtractTextPlugin("[name].bundle.css"),
			new PurifyCSSPlugin({
				paths :	glob.sync(path.join(__dirname, 'src/**/*.js')),
				minimize : true
			})
		];
	})(),
	devServer: {
		historyApiFallback: true,
		contentBase: './',
		hot: false,
        inline: false
	}
};



