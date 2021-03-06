const Config = require('webpack-chain');
const webpack = require('webpack');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const { getThemeVariables } = require('antd/dist/theme');

const cfg = new Config();
const smp = new SpeedMeasurePlugin();
const html = new HtmlPlugin({ template: './public/index.html' });

cfg
  .entry('index')
  .add(`${__dirname}/src/index.tsx`)
  .end()
  .output.path(`${__dirname}/dist`)
  .filename('[name].bundle.js')
  .end()
  .mode('development')
  .resolve.extensions.add('.tsx')
  .add('.ts')
  .add('.js')
  .add('.jsx')
  .add('.json')
  .end();

cfg.module
  .rule('babel')
  .test(/\.(ts|js)x?$/)
  .use('babel-loader')
  .loader('babel-loader')
  .options({
    presets: [
      ['@babel/preset-env'],
      ['@babel/preset-react'],
      ['@babel/preset-typescript'],
    ],
    plugins: [
      ['@babel/plugin-transform-runtime'],
      '@babel/plugin-transform-modules-commonjs',
      [
        'import',
        {
          libraryName: 'antd',
          style: true, // or 'css'
        },
      ],
    ],
  })
  .end()
  .exclude.add(/node_modules|lib/)
  .end();

cfg.module
  .rule('source-map')
  .test(/\.js$/)
  .enforce('pre')
  .use('source-map-loader')
  .loader('source-map-loader')
  .end();

cfg.module
  .rule('less')
  .test(/\.less$/i)
  .use('style-loader')
  .loader('style-loader')
  .end()
  .use('css-loader')
  .loader('css-loader')
  .end()
  .use('less-loader')
  .loader('less-loader')
  .options({
    lessOptions: {
      javascriptEnabled: true,
    },
  })
  .end();

cfg.plugin('webpackbar').use(require('webpackbar')).end();
cfg.plugin('html').use(html).end();

cfg.devServer.open(true).hot(true).end();
console.log(JSON.stringify(cfg.toConfig()));

const compiler = webpack(smp.wrap(cfg.toConfig()));

// console.log(__dirname);
// compiler.watch
const server = new WebpackDevServer(compiler);

server.listen(3030, '0.0.0.0', () => {
  console.log('app started');
});
// compiler.run((err, stats) => {
//   console.log(err, stats.toString({ colors: true }));
// });
