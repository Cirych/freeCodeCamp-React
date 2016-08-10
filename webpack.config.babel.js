import path from 'path';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import NpmInstallPlugin from 'npm-install-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const ROOT_PATH = path.resolve(__dirname);
//const NODE_ENV_PROD = process.env.NODE_ENV === 'production';

export default {
	entry: path.resolve(ROOT_PATH, 'app/src/index'),
	output: {
		path: path.resolve(ROOT_PATH, 'app/build'),
		//publicPath: '/',
		filename: 'bundle.js'
	},
	devtool: 'source-map',  // 'eval',
	resolve: {
		extensions: ['', '.js', '.jsx', '.json']
	},
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
				loaders: ['react-hot', 'babel'],
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loaders: [
					'style',
					'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
					'postcss'
				]
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loaders: [
					'style',
					'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
					'postcss?pack=postScss',
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
	devServer: {
		contentBase: path.resolve(ROOT_PATH, 'app/build'),
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'React Projects'
		}),
		new NpmInstallPlugin({ dev: true, peerDependencies: true }),
		new webpack.HotModuleReplacementPlugin()
	]
};
