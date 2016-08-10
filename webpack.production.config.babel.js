import path from 'path';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const ROOT_PATH = path.resolve(__dirname);

export default {
	bail: true,
	entry: path.resolve(ROOT_PATH, 'app/src/index'),
	output: {
		path: path.resolve(ROOT_PATH, 'app/dist'),
		//publicPath: '/',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.json']
	},
	devtool: "cheap-module-source-map",
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				loaders: ['eslint'],
				include: path.resolve(ROOT_PATH, './app')
			}
		],
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ['babel'],
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loaders: [
					'style',
					'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
					'postcss?pack=postReactCss'
				]
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loaders: [
					'style',
					'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
					'postcss?pack=postReactScss',
					'sass'
				]
			},
			{
				test: /\.json$/,
				include: path.resolve(ROOT_PATH, 'app'),
				loader: 'json'
			},
			{
				test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
				include: path.resolve(ROOT_PATH, 'app'),
				loader: 'file',
				query: {
					name: 'static/media/[name].[ext]'
				}
			},
			{
				test: /\.(mp4|webm)(\?.*)?$/,
				include: path.resolve(ROOT_PATH, 'app'),
				loader: 'url',
				query: {
					limit: 10000,
					name: 'static/media/[name].[ext]'
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
			//template: paths.appHtml,
			//favicon: paths.appFavicon,
			title: 'React Projects',
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
	]
};
