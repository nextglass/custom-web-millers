module.exports = {
  plugins: [
    require('lost')(),
    require('precss')(),
    require('autoprefixer')({
      browsers: ['last 2 versions']
    }),
    require('postcss-color-function'),
    require('postcss-import'),
    require('postcss-class-prefix')('u__')
  ]
}
