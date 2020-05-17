const { src, dest, parallel, watch } = require("gulp");
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const connect = require("gulp-connect");
const minifyCSS = require("gulp-csso");

const lessFiles = "src/**/*.less";

function cssBuild() {
  return src(lessFiles)
    .pipe(less())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(minifyCSS())
    .pipe(dest("lib/"));
}

function dev() {
  watch([lessFiles], cssBuild);
  connect.server({
    root: "./",
    livereload: true,
    port: 2727
  });
}
exports.build = parallel(cssBuild);
exports.default = parallel(cssBuild, dev);
