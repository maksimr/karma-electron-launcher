module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'electron-nodeIntegration'],

    files: [
      '**/*.spec.js'
    ],

    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },

    exclude: [],

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Electron'],

    singleRun: true,

    plugins: [
      require('../../../'),
      'karma-mocha'
    ]
  })
}
