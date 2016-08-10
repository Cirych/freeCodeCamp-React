import path from 'path';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import paths from './app.config';

export default {
	bail: true,
	entry: paths.entry,
	output: {
		path: paths.dist,
		//publicPath: '/',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.json', '']
	},
	devtool: "cheap-module-source-map",
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loaders: ['eslint'],
				include: paths.app
			}
		],
		loaders: [
			/*{
				test: /\.html$/,
				exclude: /node_modules/,
				loader: 'html-loader'
			},*/
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['react-hot', 'babel'],
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract("style", "css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss")
				/*loaders: [
					'style',
					'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
					'postcss'
				]*/
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract("style", "css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss?pack=postScss!sass")
				/*loaders: [
					'style',
					'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
					'postcss?pack=postScss',
					'sass'
				]*/
			},
			{
				test: /\.json$/,
				include: paths.app,
				loader: 'json'
			},
			{
				test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
				include: paths.app,
				loader: 'file',
				query: {
					name: 'media/static/[name].[ext]'
				}
			},
			{
				test: /\.(mp4|webm)(\?.*)?$/,
				include: paths.app,
				loader: 'url',
				query: {
					limit: 10000,
					name: 'media/static/[name].[ext]'
				}
			}
		]
	},
	postcss: () => (
		{
			defaults: [precss, autoprefixer],
			postScss: [autoprefixer],
			postReactCss: [precss, autoprefixer({
				browsers: [
					'>1%',
					'last 4 versions',
					'Firefox ESR',
					'not ie < 9'
				]
			})],
			postReactScss: [autoprefixer({
				browsers: [
					'>1%',
					'last 4 versions',
					'Firefox ESR',
					'not ie < 9'
				]
			})]
		}
	),
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.template,
			favicon: paths.favicon,
			title: paths.appTitle,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			}
		})
		, new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
		,new webpack.optimize.OccurrenceOrderPlugin()
		,new webpack.optimize.DedupePlugin()
		,new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true
			},
			mangle: {
				screw_ie8: true
			},
			output: {
				comments: false,
				screw_ie8: true
			}
		})
		,new CopyWebpackPlugin(
			[
				{ from: './templates' }
			],
			{
				ignore: ['*.html', '*.ico']
			}
		)
		,new ExtractTextPlugin("[name].css")
		,new CompressionPlugin({
			asset: "[path].gz[query]",
            algorithm: "gzip",
            //test: /\.js$|\.html$|\.css$|\.svg$|\.json$|\.webapp$/,
            //threshold: 10240,
            minRatio: 0.8
		})
	]
};
