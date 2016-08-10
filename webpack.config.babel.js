import path from 'path';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import NpmInstallPlugin from 'npm-install-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import paths from './app.config';

//const ROOT_PATH = path.resolve(__dirname);

export default {
	entry: paths.entry,
	output: {
		path: paths.build,
		//publicPath: '/',
		filename: 'bundle.js'
	},
	devtool: 'source-map',  // 'eval',
	resolve: {
		extensions: ['.js', '.json', '']
	},
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
	devServer: {
		contentBase: paths.build,
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: paths.appTitle,
			template: paths.template,
			favicon: paths.favicon
		}),
		new NpmInstallPlugin({ dev: true, peerDependencies: true }),
		new webpack.HotModuleReplacementPlugin(),
		new CopyWebpackPlugin(
			[
				{ from: './templates' }
			],
			{
				ignore: ['*.html', '*.ico']
			}
		),
		new ExtractTextPlugin("[name].css")
	]
};
