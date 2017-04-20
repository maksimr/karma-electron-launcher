var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow

var mainWindow = null

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  var params = process.argv.slice(1).reduce(function (result, arg) {
    var index = arg.indexOf('=')
    var key = arg
    var value

    if (index > -1) {
      key = arg.slice(0, index)
      value = arg.slice(index + 1)
    }

    result[key] = value

    return result
  }, {})

  var url = params['--load-url']
  var options = JSON.parse(decodeURIComponent(params['--browser-window-options']))

  mainWindow = new BrowserWindow(options)
  mainWindow.loadURL(url)
  mainWindow.on('closed', function () {
    mainWindow = null
  })
})
