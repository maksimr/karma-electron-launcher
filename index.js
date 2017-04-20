function isJSFlags (flag) {
  return flag.indexOf('--js-flags=') === 0
}

function sanitizeJSFlags (flag) {
  var test = /--js-flags=(['"])/.exec(flag)
  if (!test) {
    return flag
  }
  var escapeChar = test[1]
  var endExp = new RegExp(escapeChar + '$')
  var startExp = new RegExp('--js-flags=' + escapeChar)
  return flag.replace(startExp, '--js-flags=').replace(endExp, '')
}

function ElectronBrowser (baseBrowserDecorator, args, config) {
  baseBrowserDecorator(this)

  var flags = args.flags || []
  var userDataDir = args.electronDataDir || this._tempDir
  var electronConfig = config.electron

  this._getOptions = function (url) {
    flags.forEach(function (flag, i) {
      if (isJSFlags(flag)) {
        flags[i] = sanitizeJSFlags(flag)
      }
    })

    return [
      '--user-data-dir=' + userDataDir,
      '--no-default-browser-check',
      '--no-first-run',
      '--disable-default-apps',
      '--disable-popup-blocking',
      '--disable-translate',
      '--disable-background-timer-throttling',
      '--disable-device-discovery-notifications'
    ]
      .concat(flags)
      .concat(electronConfig ? [
        '--load-url=' + url,
        '--browser-window-options=' + encodeURIComponent(JSON.stringify(
          electronConfig.browserWindow || {}
        )),
        require.resolve('./lib/main')
      ] : [url])
  }
}

ElectronBrowser.prototype = {
  name: 'Electron',

  DEFAULT_CMD: {
    linux: require('electron'),
    darwin: require('electron'),
    win32: require('electron')
  },
  ENV_CMD: 'ELECTRON_BIN'
}

module.exports = {
  'launcher:Electron': ['type', ElectronBrowser],
  'framework:electron-nodeIntegration': ['type', function (config) {
    var path = require('path')

    process.env.NODE_PATH = [
      path.join(config.basePath, 'node_modules'),
      process.env.NODE_PATH
    ].join(path.delimiter)

    process.env.ELECTRON_APP_DIR = path.resolve(config.basePath)

    config.files.unshift({
      pattern: require.resolve('./lib/electron-module-patch'),
      included: true,
      served: true,
      watched: false
    })
  }]
}
