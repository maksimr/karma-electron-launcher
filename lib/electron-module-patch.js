// Search for module from app path when URL is not a file protocol
// https://github.com/electron/electron/pull/9095
(function () {
  // Export node api from top page to the iframe
  if (
    typeof window !== 'undefined' &&
    window.top &&
    window.top.require
  ) {
    ['require', 'module', 'process', '__dirname'].forEach(function (it) {
      window[it] = window.top[it]
    })
  }

  // Support require module from node_modules directory
  if (
    typeof module !== 'undefined' &&
    typeof require !== 'undefined' &&
    typeof process !== 'undefined' &&
    process.type === 'renderer' &&
    !module.XXX_ELECTRON_PATCHED
  ) {
    if (process.env.NODE_PATH) {
      module.paths = process.env.NODE_PATH
        .split(require('path').delimiter)
        .reduce(function (paths, path) {
          return paths.concat(
            require('module')._nodeModulePaths(path)
              .filter(function (p) {
                return paths.indexOf(p) === -1
              })
          )
        }, module.paths)
    }

    // Support relative module require
    module.filename = null

    var _path = require('path')
    var _resolveFilename = require('module')._resolveFilename
    var appDir = process.env.ELECTRON_APP_DIR
    require('module')._resolveFilename = function (request, parent, isMain) {
      if (
        request.length >= 2 &&
        request.charCodeAt(0) === 46 &&
        (!parent || !parent.filename)
      ) {
        var filename = _path.resolve(appDir, getModuleFilename())
        request = filename ? _path.resolve(filename, request) : request
      }
      return _resolveFilename(request, parent, isMain)
    }

    module.XXX_ELECTRON_PATCHED = true
  }

  if (
    typeof module === 'object' &&
    process.type !== 'renderer' &&
    module.exports
  ) {
    module.exports.findContextFrame = findContextFrame
    module.exports.extractPath = extractPath
  }

  function getModuleFilename () {
    var error = new Error()
    var filename = extractPath(findContextFrame(error.stack.trim()))
    return filename ? _path.dirname(filename) : ''
  }

  function findContextFrame (errorStack) {
    var lines = errorStack.split('\n')
    var isRequireCall = /^\s*at require \(internal/
    for (var i = 0, l = lines.length; i < l; i++) {
      if (isRequireCall.test(lines[i])) {
        return lines[i + 1]
      }
    }
  }

  function extractPath (contextFrame) {
    if (!contextFrame) {
      return ''
    }

    var urlRegExp = new RegExp(/\(.+\/(base|absolute)\/(.*):\d+:\d+\)/)
    var result = urlRegExp.exec(contextFrame)
    if (!result) {
      return ''
    }
    return (result[1] === 'absolute' ? '/' : '') + result[2]
  }
}())
