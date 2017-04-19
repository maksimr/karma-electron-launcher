function ElectronBrowser (baseBrowserDecorator, args) {
  baseBrowserDecorator(this)

  var flags = args.flags || []
  var userDataDir = args.electronDataDir || this._tempDir

  this._getOptions = function (url) {
    return [
      '--user-data-dir=' + userDataDir,
      '--no-default-browser-check',
      '--no-first-run',
      '--disable-default-apps',
      '--disable-popup-blocking',
      '--disable-translate',
      '--disable-background-timer-throttling',
      '--disable-device-discovery-notifications'
    ].concat(flags, [url])
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
  'framework:electron-module-patch': ['type', function (config) {
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
