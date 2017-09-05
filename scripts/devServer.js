const url = require('url');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

const devServerOptions = {
    contentBase: [
    	'dist',
        'mock'
    ],
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true,
    },
    
    // use proxy for POST request
    proxy: {
        "/api": {
            target: "http://localhost:3000",
            pathRewrite(path, option) {
                option.method = 'GET';
                return path.substr(4);
            }
        }
    }
};

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, devServerOptions);

compiler.plugin('done', () => {
    server.listen(3000, '127.0.0.1', function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Listening at localhost:3000');
        }
    });
});


