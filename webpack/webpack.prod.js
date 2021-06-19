const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'production';
const sass = require('sass');

const CONTEXT_PATH = '/homeangular/';
module.exports = webpackMerge(commonConfig({ env: ENV }), {
  // Enable source maps. Please note that this will slow down the build.
  // You have to enable it in Terser config below and in tsconfig.json as well
  // devtool: 'source-map',
  entry: {
    global: './src/main/webapp/content/scss/global.scss',
    main: './src/main/webapp/app/app.main',
  },
  output: {
    path: utils.root('build/resources/main/static/'),
    filename: 'app/[name].[hash].bundle.js',
    chunkFilename: 'app/[id].[hash].chunk.js',
    publicPath: CONTEXT_PATH,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'to-string-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: { implementation: sass },
          },
        ],
        exclude: /(vendor\.scss|global\.scss)/,
      },
      {
        test: /(vendor\.scss|global\.scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: { implementation: sass },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['to-string-loader', 'style-loader', 'css-loader'],
        exclude: /(vendor\.css|global\.css)/,
      },
      {
        test: /(vendor\.css|global\.css)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: false,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        // sourceMap: true, // Enable source maps. Please note that this will slow down the build
        terserOptions: {
          ecma: 5,
          ie8: false,
          toplevel: true,
          module: true,
          compress: {
            dead_code: true,
            warnings: false,
            properties: true,
            drop_debugger: true,
            conditionals: true,
            booleans: true,
            loops: true,
            unused: true,
            toplevel: true,
            if_return: true,
            inline: true,
            join_vars: true,
            ecma: 5,
            module: true,
          },
          output: {
            comments: false,
            beautify: false,
            indent_level: 2,
            ecma: 5,
          },
          mangle: {
            module: true,
            toplevel: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      path: utils.root('build/resources/main/static/'),
      filename: '/content/[name].[contenthash].css',
      chunkFilename: '/content/[id].css',
    }),
    new MomentLocalesPlugin({
      localesToKeep: [
        'en',
        'fr',
        'de',
        // jhipster-needle-i18n-language-moment-webpack - JHipster will add/remove languages in this array
      ],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      // Webpack statistics in target folder
      reportFilename: '../stats.html',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/main/webapp/index.html',
      chunks: ['polyfills', 'main', 'global'],
      chunksSortMode: 'manual',
      inject: 'body',
      base: CONTEXT_PATH,
    }),
  ],
  mode: 'production',
});
