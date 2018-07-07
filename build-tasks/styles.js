var anathema = require('./config')
var path = require('path')
var postcss = require('postcss')
var autoprefixer = require('autoprefixer')
var LessListPlugin = require('less-plugin-lists')
var less = require('less')

const {src} = anathema.config.paths

anathema.watcher(
  "styles",
  src + "/**/*.less",
  ["styles"],
  { runOnStart: true }
)
anathema.task("styles", function (task) {
  const {staticOut} = anathema.config.paths
  return task.src(src + "/Main.less")
    .transform(
      (file) => {
        // clear less cache
        less.environment.fileManagers.forEach((fm) => { fm.contents = {} })
        return less.render(
          file.data,
          {
            paths: path.dirname(file.originalPath),
            strictMath: true,
            filename: file.originalPath,
            sourcemap: true,
            useFileCache: false,
          }
        )
      },
      (file, out) => postcss([autoprefixer]).process(out.css, {from: undefined}),
      (file, out) => {
        file.data = out.css
        if (file.name == "Main.less") {
          file.name = "ExampleApp.css"
        } else {
          file.name = file.name.replace('.less', '.css')
        }
      }
    )
    .output(staticOut)
})
