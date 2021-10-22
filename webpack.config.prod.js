const path = require('path');

/** @type {import("webpack").Configuration} */
const config = {
	mode: "production",
	entry: {
		index: "./src/index.tsx"
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'react-router-dom': 'ReactRouterDOM',
		'react-markdown': 'ReactMarkdown'
	},
	output: {
		path: path.resolve(__dirname, "public", "dist"),
		publicPath: "./public/",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".sass", ".css"]
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-react']
					}
				}
			},
			{
				test: /\.tsx?$/i,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: [
					"style-loader", "css-loader"
				]
			},
		]
	}
};

module.exports = config;