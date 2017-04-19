/* eslint-env mocha */

describe('ElectronLauncher', function () {
  it('should support global modules', function () {
    return require('electron')
  })

  it('should support relative require', function () {
    return require('./foo')
  })
})
