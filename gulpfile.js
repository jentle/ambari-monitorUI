var gulp = require('gulp')
var webpack = require('gulp-webpack')
var named = require('vinyl-named')


var appList = ['main']


gulp.task('default', ['bundle'], function() {
  console.log('done')
})

gulp.task('bundle', function() {
  return gulp.src(mapFiles(appList, 'js'))
    .pipe(named())
    .pipe(webpack(getConfig()))
    .pipe(gulp.dest('./app/dist/'))
})

gulp.task('watch', function() {
  return gulp.src(mapFiles(appList, 'js'))
    .pipe(named())
    .pipe(webpack(getConfig({watch: true})))
    .pipe(gulp.dest('./app/dist/'))
})


/**
 * @private
 */
function getConfig(opt) {
  var config = {
    module: {
      loaders: [
        { test: /\.vue$/, loader: 'vue'},
		{
		  test: /\.js$/,
		  // excluding some local linked packages.
		  // for normal use cases only node_modules is needed.
		  exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-resource\/|vue-hot-reload-api\//,
		  loader: 'babel?optional[]=runtime&loose=all'
	    }
      ]
    },
    devtool: 'source-map'
  }
  if (!opt) {
    return config
  }
  for (var i in opt) {
    config[i] = opt[i]
  }
  return config
}

/**
 * @private
 */
function mapFiles(list, extname) {
  return list.map(function (app) {return './app/src/' + app + '.' + extname})
}
