import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const ROOT_PATH = path.resolve(__dirname);

export default {
	entry: path.resolve(ROOT_PATH, 'app/src/index'),
	output: {
		path: path.resolve(ROOT_PATH, 'app/dist'),
		//publicPath: '/',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	devtool: "cheap-module-source-map",
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loaders: ['babel'],
		},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			}]
	},
	devServer: {
		contentBase: path.resolve(ROOT_PATH, 'app/dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'React Projects'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	]
};
