module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['mocha'],

    files: [
      '*.js'
    ],

    exclude: [],

    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Electron'],

    singleRun: true,

    plugins: [
      require('../../../'),
      'karma-mocha'
    ]
  })
}
