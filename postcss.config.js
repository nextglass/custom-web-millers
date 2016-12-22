/* eslint-disable global-require */

module.exports = {
  plugins: [
    require('lost')(), // grid
    require('precss')(), // Sass like markup
    require('autoprefixer')({
      browsers: ['last 2 versions']
    }),
    require('postcss-color-function'),
    require('postcss-import'),
    require('postcss-class-prefix')('u__'),
    require('postcss-autoreset')({
      reset: {
        margin: 0,
        padding: 0,
        borderRadius: 0,
        fontFamily: '"Titillium Web", sans-serif',
        fontWeight: 'normal',
        fontSize: '1em',
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale'
      }
    })
  ]
}
