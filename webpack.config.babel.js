import path from 'path';
import webpack from 'webpack';
import NpmInstallPlugin from 'npm-install-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const ROOT_PATH = path.resolve(__dirname);
const NODE_ENV_PROD = process.env.NODE_ENV === 'production';

export default {
	entry: path.resolve(ROOT_PATH, 'app/src/index'),
	output: {
		path: NODE_ENV_PROD ? path.resolve(ROOT_PATH, 'app/dist') : path.resolve(ROOT_PATH, 'app/build'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	devtool: NODE_ENV_PROD ? '' : 'source-map',
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				loaders: NODE_ENV_PROD ? [] : ['eslint'],
				include: path.resolve(ROOT_PATH, './app')
			}
		],
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loaders: ['react-hot', 'babel'],
		},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			}]
	},
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
		})
	].concat(!NODE_ENV_PROD ? [
		new NpmInstallPlugin({ dev: true, peerDependencies: true }),
		new webpack.HotModuleReplacementPlugin()
	] : [
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, output: { comments: false } })
		])
};
