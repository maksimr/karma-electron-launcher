/* eslint-env mocha */

describe('ElectronLauncher', function () {
  it('should allow relative require from nested module', function () {
    return require('../foo')
  })
})
