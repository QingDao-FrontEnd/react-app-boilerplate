import webpack from 'webpack';
import path from 'path';
import gutil, { colors } from 'gulp-util';

export const BUILD_DIR = path.resolve (__dirname, 'dist');
export const INPUT_DIR = path.resolve (__dirname, 'src');

export const webpackDistConfig = {
  entry: [
    path.resolve (INPUT_DIR, 'root.jsx'),
    path.resolve (INPUT_DIR, 'index.html')
  ],
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin ({
      'process.env.CORE_ENV': JSON.stringify (
        'development'
      )
    })
  ],
  module : {
    rules : [
      {
        test : /\.(js|jsx)?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['add-module-exports']
        }
      },
      {
        test: /\.(ico|html)$/,
        loader: "file-loader",
        query: {
          name: "[name].[ext]"
        }
      },
      {
        test: /\.(css|less)$/,
        loaders: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: "300000",
          name: "[name].[ext]",
          root: "."
        }
      }
    ]
  }
};

export function webpackDistCompiler (callback) {
  const compiler = webpack (webpackDistConfig);
  compiler.run ((error, stats) => {
    gutil.log (`Successfully bundled '${colors.cyan ('dist')}'`)
    console.log (stats.toString ({ chunks: false, colors: true }));
    if (callback) callback ();
  });
}

export function webpackDistWatcher () {
  const compiler = webpack (webpackDistConfig);
  return compiler.watch ({}, (error, stats) => {
    gutil.log (`Successfully bundled '${colors.cyan ('dist')}'`)
    console.log (stats.toString ({ chunks: false, colors: true }));
  });
}

export default webpackDistConfig;
