/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

var expect = require('chai').expect
var sinon = require('sinon').sandbox.create()
var ElectronLauncher = require('../../index')['launcher:Electron'][1]
var ElectronFramework = require('../../index')['framework:electron-nodeIntegration'][1]

describe('launcher', function () {
  var launcher
  var baseBrowserDecorator
  var args
  beforeEach(function () {
    baseBrowserDecorator = sinon.spy()
    args = {}
    launcher = new ElectronLauncher(baseBrowserDecorator, args, {})
  })

  afterEach(function () {
    sinon.reset()
  })

  it('should create launcher', function () {
    expect(launcher).to.be.ok
  })
})

describe('framework', function () {
  var framework
  beforeEach(function () {
    framework = new ElectronFramework({files: [], basePath: ''})
  })

  afterEach(function () {
    sinon.reset()
  })

  it('should create framework', function () {
    expect(framework).to.be.ok
  })
})
