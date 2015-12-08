var webpack = require('webpack');
var path = require("path")

module.exports = {
	entry:[
		// for hot loader: WebpackDevServer host and port
		"webpack-dev-server/client?http://localhost:8080",
		// for hot loader: "only" prevents reload on syntax errors
		"webpack/hot/only-dev-server",
		// our appʼs entry point
		"./src/client/index.js"
	],
	module:{
		loaders:[{
			test:/\.jsx?$/,
			include: path.join(__dirname,"src"),
			loaders: ["react-hot","babel"],
		}]
	},
	resolve:{
		extensions:["",".js",".jsx"]
	},
	output:{
		path: __dirname + "/public/build",
		filename:"boundle.js",
		publicPath:"http://localhost:8080/build",
	},
	devServer: {
		contentBase: "./public",
		hot: true,
		host:"localhost",
		proxy:{
			"*": "http://localhost:"+3000
		}
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin()
	]	
}
