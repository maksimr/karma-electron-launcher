# karma-electron-launcher

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/maksimr/karma-electron-launcher)
[![npm version](https://img.shields.io/npm/v/@maksimr/karma-electron-launcher.svg?style=flat-square)](https://www.npmjs.com/package/@maksimr/karma-electron-launcher)
[![npm downloads](https://img.shields.io/npm/dm/@maksimr/karma-electron-launcher.svg?style=flat-square)](https://www.npmjs.com/package/@maksimr/karma-electron-launcher)

[![Build Status](https://img.shields.io/travis/maksimr/karma-electron-launcher/master.svg?style=flat-square)](https://travis-ci.org/maksimr/karma-electron-launcher) 
[![Dependency Status](https://img.shields.io/david/maksimr/karma-electron-launcher.svg?style=flat-square)](https://david-dm.org/maksimr/karma-electron-launcher)
[![devDependency Status](https://img.shields.io/david/dev/maksimr/karma-electron-launcher.svg?style=flat-square)](https://david-dm.org/maksimr/karma-electron-launcher)

> Launcher for Electron.

## Installation

The easiest way is to keep `karma-electron-launcher` as a devDependency in your `package.json`,
by running

```bash
$ npm install karma-electron-launcher --save-dev
```

## Configuration

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['Electron', 'Electron_without_security'],

    // you can define custom flags
    customLaunchers: {
      Electron_without_security: {
        base: 'Electron',
        flags: ['--disable-web-security']
      }
    }
  })
}
```

The `--user-data-dir` is set to a temporary directory but can be overridden on a custom launcher as shown below.
One reason to do this is to have a permanent Electron user data directory inside the project directory to be able to
install plugins there (e.g. JetBrains IDE Support plugin).

```js
customLaunchers: {
  Electron_with_debugging: {
    base: 'Electron',
    electronDataDir: path.resolve(__dirname, '.electron')
  }
}
```

You can pass list of browsers as a CLI argument too:

```bash
$ karma start --browsers Electron
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com