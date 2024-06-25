module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss/nesting', // ここでCSSネスティングプラグインを追加
    'tailwindcss',
    'autoprefixer',
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'nesting-rules': true
      }
    })
  ],
};